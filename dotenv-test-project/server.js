require('dotenv').config()

const s3Bucket = process.env.S3_BUCKET;
console.log(`S3 Bucket name is ${s3Bucket}`); // remove this after you've confirmed it working