export const config = {
  "dev": {
    // "username": "turbobase",
    // "password": "turbobase",
    // "database": "postgres",
    // "host": "turbobase.cqfadondprmc.us-east-1.rds.amazonaws.com",
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASSWORD,
    "database": process.env.POSTGRESS_DATABASE,
    "host": process.env.POSTGRESS_HOST,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": "default",
    "aws_media_bucket": "meine-bucket-dev"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
