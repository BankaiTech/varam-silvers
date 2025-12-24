# S3 Deployment Guide

This guide explains how to deploy your Next.js application to AWS S3 for static hosting.

## Prerequisites

1. **AWS CLI installed**: Download and install from [AWS CLI Installation Guide](https://aws.amazon.com/cli/)
2. **AWS credentials configured**: Run `aws configure` and provide your:
   - AWS Access Key ID
   - AWS Secret Access Key
   - Default region (e.g., `us-east-1`)
   - Default output format (can be `json`)

3. **S3 bucket created**: You mentioned you already have an S3 bucket set up with domain mapping

## Configuration

The project is configured for static export:
- `next.config.js` has `output: 'export'` for static site generation
- Images are set to `unoptimized: true` for static hosting compatibility

## Deployment Methods

### Method 1: Using npm script (Recommended)

#### Windows:
```bash
npm run deploy:s3 -- --bucket your-bucket-name --region us-east-1
```

#### Linux/Mac:
```bash
npm run deploy:s3:unix -- --bucket your-bucket-name --region us-east-1
```

### Method 2: Using Node.js script directly

```bash
node deploy-s3.js --bucket your-bucket-name --region us-east-1
```

### Method 3: Using bash script (Linux/Mac)

```bash
chmod +x deploy-s3.sh
./deploy-s3.sh --bucket your-bucket-name --region us-east-1
```

### Method 4: Using environment variables

Set environment variables and run:

```bash
# Windows PowerShell
$env:AWS_S3_BUCKET="your-bucket-name"
$env:AWS_REGION="us-east-1"
npm run deploy:s3

# Linux/Mac
export AWS_S3_BUCKET="your-bucket-name"
export AWS_REGION="us-east-1"
npm run deploy:s3
```

## Command Line Options

- `--bucket` or `-b`: S3 bucket name (required)
- `--region` or `-r`: AWS region (default: `us-east-1`)
- `--profile` or `-p`: AWS profile name (optional, if using multiple AWS accounts)

## What the Deployment Script Does

1. **Builds the application**: Runs `npm run build` to create static files in the `out` directory
2. **Uploads to S3**: Syncs all files from `out` directory to your S3 bucket
3. **Sets cache headers**: 
   - HTML files: `no-cache` (always fetch fresh content)
   - Static assets (JS, CSS, images): `max-age=31536000` (1 year cache)

## S3 Bucket Configuration

Make sure your S3 bucket has:

1. **Static website hosting enabled**:
   - Go to S3 bucket → Properties → Static website hosting
   - Enable it and set index document to `index.html`
   - Set error document to `index.html` (for Next.js routing)

2. **Bucket policy** (for public access):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

3. **Block public access settings**: 
   - Uncheck "Block all public access" (or configure as needed)

4. **CORS configuration** (if needed):
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

## Domain Configuration

Since you mentioned your domain is already mapped:

1. **CloudFront Distribution** (recommended):
   - Create a CloudFront distribution pointing to your S3 bucket
   - Use your custom domain as an alternate domain name (CNAME)
   - Set up SSL certificate via AWS Certificate Manager

2. **Direct S3 Website Endpoint**:
   - Your site will be available at: `http://your-bucket-name.s3-website-region.amazonaws.com`
   - For custom domain, use Route 53 or your DNS provider to point to S3

## Troubleshooting

### Build fails
- Make sure all dependencies are installed: `npm install`
- Check for any server-side code that needs to be converted to client-side

### Upload fails
- Verify AWS credentials: `aws sts get-caller-identity`
- Check bucket permissions: Ensure your IAM user/role has `s3:PutObject`, `s3:DeleteObject`, and `s3:ListBucket` permissions
- Verify bucket name and region are correct

### Site not loading
- Check S3 bucket static website hosting is enabled
- Verify bucket policy allows public read access
- Check CloudFront distribution status (if using)
- Clear browser cache

### Images not loading
- Ensure images in `public` folder are included in the build
- Check image paths are correct (should be relative paths)

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. Build the app:
   ```bash
   npm run build
   ```

2. Upload using AWS CLI:
   ```bash
   aws s3 sync ./out s3://your-bucket-name --delete
   ```

3. Set cache headers:
   ```bash
   # HTML files
   aws s3 cp s3://your-bucket-name s3://your-bucket-name --recursive --exclude "*" --include "*.html" --cache-control "no-cache, no-store, must-revalidate" --metadata-directive REPLACE
   
   # Static assets
   aws s3 cp s3://your-bucket-name s3://your-bucket-name --recursive --exclude "*.html" --cache-control "public, max-age=31536000, immutable" --metadata-directive REPLACE
   ```

## Continuous Deployment

For automated deployments, you can:

1. **GitHub Actions**: Create `.github/workflows/deploy.yml`
2. **GitLab CI/CD**: Add deployment job to `.gitlab-ci.yml`
3. **AWS CodePipeline**: Set up pipeline with S3 deployment stage

## Notes

- The `out` directory contains your static site and should be gitignored (already in `.gitignore`)
- After deployment, changes may take a few minutes to propagate
- If using CloudFront, invalidate the cache after deployment for immediate updates

