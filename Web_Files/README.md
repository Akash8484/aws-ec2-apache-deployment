# Akash Thakur — Cloud & DevOps Portfolio

A static, responsive portfolio site designed for AWS hosting. No build step or server runtime is required.

## Publish on AWS

1. Update `CONTACT_EMAIL` in `script.js` with your real email address.
2. Upload the contents of this folder (not the folder itself) to an S3 bucket.
3. Enable **Static website hosting** in the bucket properties and set `index.html` as the index document.
4. Use CloudFront in front of S3 for HTTPS, caching, and a custom domain. Keep the S3 bucket private and use CloudFront Origin Access Control for a production setup.

## Local preview

Open `index.html` in a browser. For clipboard features to work consistently, serve it locally, for example:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.
