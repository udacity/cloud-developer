"use strict";
// export const config = {
//   "dev": {
//     "username": "process.env.POSTGRESS_USERNAME",
//     "password": "process.env.POSTGRESS_PASSWORD",
//     "database": "process.env.POSTGRESS_DATABASE",
//     "host": "process.env.POSTGRESS_HOST",
//     "dialect": "postgres",
//     "aws_region": "process.env.AWS_REGION",
//     "aws_profile": "process.env.AWS_PROFILE",
//     "aws_media_bucket": "process.env.AWS_MEDIA_BUCKET"
//   },
//   "jwt": {
//     "secret": " "
//   },
//   "prod": {
//     "username": "",
//     "password": "",
//     "database": "udagram_prod",
//     "host": "",
//     "dialect": "postgres"
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    "dev": {
        "username": "rootefuraimujs",
        "password": "udagramdb1655121080",
        "database": "udagramdb1655121080",
        "host": "udagramdb1655121080.cocqdrux33zf.us-east-1.rds.amazonaws.com",
        "dialect": "postgres",
        "aws_region": "us-east-1",
        "aws_profile": "default",
        "aws_media_bucket": "udagrambucket1655121080"
    },
    "jwt": {
        "secret": " "
    },
    "prod": {
        "username": "",
        "password": "",
        "database": "udagram_prod",
        "host": "",
        "dialect": "postgres"
    }
};
//# sourceMappingURL=config.js.map