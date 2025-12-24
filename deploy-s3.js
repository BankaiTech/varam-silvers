#!/usr/bin/env node

/**
 * Deployment script to build and upload Next.js static export to S3
 * 
 * Usage:
 *   node deploy-s3.js [--bucket BUCKET_NAME] [--region REGION] [--profile PROFILE]
 * 
 * Environment variables:
 *   AWS_S3_BUCKET - S3 bucket name (required if not provided via --bucket)
 *   AWS_REGION - AWS region (default: us-east-1)
 *   AWS_PROFILE - AWS profile name (optional)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name, short) => {
  const fullIndex = args.indexOf(`--${name}`);
  const shortIndex = short ? args.indexOf(`-${short}`) : -1;
  const index = fullIndex !== -1 ? fullIndex : shortIndex;
  return index !== -1 && args[index + 1] ? args[index + 1] : null;
};

const bucketName = getArg('bucket', 'b') || process.env.AWS_S3_BUCKET;
const region = getArg('region', 'r') || process.env.AWS_REGION || 'us-east-1';
const profile = getArg('profile', 'p') || process.env.AWS_PROFILE;

if (!bucketName) {
  console.error('❌ Error: S3 bucket name is required');
  console.error('   Provide via --bucket flag or AWS_S3_BUCKET environment variable');
  process.exit(1);
}

const outDir = path.join(process.cwd(), 'out');

console.log('🚀 Starting deployment to S3...\n');
console.log(`📦 Bucket: ${bucketName}`);
console.log(`🌍 Region: ${region}`);
if (profile) console.log(`👤 Profile: ${profile}`);
console.log('');

// Step 1: Build the Next.js app
console.log('📦 Step 1: Building Next.js application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Check if out directory exists
if (!fs.existsSync(outDir)) {
  console.error(`❌ Error: Build output directory 'out' not found`);
  console.error('   Make sure next.config.js has output: "export"');
  process.exit(1);
}

// Step 3: Upload to S3
console.log('☁️  Step 2: Uploading files to S3...');
const awsProfile = profile ? `--profile ${profile}` : '';
const syncCommand = `aws s3 sync "${outDir}" s3://${bucketName} --region ${region} --delete ${awsProfile}`;

try {
  execSync(syncCommand, { stdio: 'inherit' });
  console.log('\n✅ Upload completed successfully\n');
} catch (error) {
  console.error('\n❌ Upload failed:', error.message);
  console.error('\n💡 Make sure:');
  console.error('   1. AWS CLI is installed (https://aws.amazon.com/cli/)');
  console.error('   2. AWS credentials are configured (aws configure)');
  console.error('   3. You have write permissions to the S3 bucket');
  process.exit(1);
}

// Step 4: Set cache headers for static assets
console.log('⚙️  Step 3: Setting cache headers...');
const cacheCommand = `aws s3 cp s3://${bucketName} s3://${bucketName} --recursive --exclude "*" --include "*.html" --cache-control "no-cache, no-store, must-revalidate" --metadata-directive REPLACE ${awsProfile}`;
const staticCacheCommand = `aws s3 cp s3://${bucketName} s3://${bucketName} --recursive --exclude "*.html" --cache-control "public, max-age=31536000, immutable" --metadata-directive REPLACE ${awsProfile}`;

try {
  execSync(cacheCommand, { stdio: 'inherit' });
  execSync(staticCacheCommand, { stdio: 'inherit' });
  console.log('✅ Cache headers set successfully\n');
} catch (error) {
  console.warn('⚠️  Warning: Could not set cache headers:', error.message);
  console.warn('   This is optional, but recommended for better performance\n');
}

console.log('🎉 Deployment completed successfully!');
console.log(`\n🌐 Your site should be available at:`);
console.log(`   http://${bucketName}.s3-website-${region}.amazonaws.com`);
console.log(`   or your custom domain if configured\n`);

