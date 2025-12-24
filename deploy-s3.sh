#!/bin/bash

# Deployment script to build and upload Next.js static export to S3
# 
# Usage:
#   ./deploy-s3.sh [--bucket BUCKET_NAME] [--region REGION] [--profile PROFILE]
# 
# Environment variables:
#   AWS_S3_BUCKET - S3 bucket name (required if not provided via --bucket)
#   AWS_REGION - AWS region (default: us-east-1)
#   AWS_PROFILE - AWS profile name (optional)

set -e

# Parse command line arguments
BUCKET_NAME=""
REGION="${AWS_REGION:-us-east-1}"
PROFILE=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --bucket|-b)
      BUCKET_NAME="$2"
      shift 2
      ;;
    --region|-r)
      REGION="$2"
      shift 2
      ;;
    --profile|-p)
      PROFILE="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Use environment variable if bucket not provided
if [ -z "$BUCKET_NAME" ]; then
  BUCKET_NAME="$AWS_S3_BUCKET"
fi

if [ -z "$BUCKET_NAME" ]; then
  echo "❌ Error: S3 bucket name is required"
  echo "   Provide via --bucket flag or AWS_S3_BUCKET environment variable"
  exit 1
fi

echo "🚀 Starting deployment to S3..."
echo ""
echo "📦 Bucket: $BUCKET_NAME"
echo "🌍 Region: $REGION"
if [ -n "$PROFILE" ]; then
  echo "👤 Profile: $PROFILE"
fi
echo ""

# Step 1: Build the Next.js app
echo "📦 Step 1: Building Next.js application..."
npm run build

if [ ! -d "out" ]; then
  echo "❌ Error: Build output directory 'out' not found"
  echo "   Make sure next.config.js has output: \"export\""
  exit 1
fi

echo "✅ Build completed successfully"
echo ""

# Step 2: Upload to S3
echo "☁️  Step 2: Uploading files to S3..."

AWS_PROFILE_ARG=""
if [ -n "$PROFILE" ]; then
  AWS_PROFILE_ARG="--profile $PROFILE"
fi

aws s3 sync ./out s3://$BUCKET_NAME --region $REGION --delete $AWS_PROFILE_ARG

echo ""
echo "✅ Upload completed successfully"
echo ""

# Step 3: Set cache headers
echo "⚙️  Step 3: Setting cache headers..."

# HTML files - no cache
aws s3 cp s3://$BUCKET_NAME s3://$BUCKET_NAME --recursive \
  --exclude "*" --include "*.html" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --metadata-directive REPLACE \
  $AWS_PROFILE_ARG || echo "⚠️  Warning: Could not set HTML cache headers"

# Static assets - long cache
aws s3 cp s3://$BUCKET_NAME s3://$BUCKET_NAME --recursive \
  --exclude "*.html" \
  --cache-control "public, max-age=31536000, immutable" \
  --metadata-directive REPLACE \
  $AWS_PROFILE_ARG || echo "⚠️  Warning: Could not set static asset cache headers"

echo "✅ Cache headers set successfully"
echo ""

echo "🎉 Deployment completed successfully!"
echo ""
echo "🌐 Your site should be available at:"
echo "   http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo "   or your custom domain if configured"
echo ""

