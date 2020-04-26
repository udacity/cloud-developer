export const config = {
    server: {
        port: process.env.PORT || 8080, // default port to listen
        allow_origin: process.env.ALLOW_ORIGIN
    },
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    },
    aws: {
        region: process.env.AWS_REGION,
        profile: process.env.AWS_PROFILE,
        media_bucket: process.env.AWS_MEDIA_BUCKET
    },
    auth: {
        jwt_secret: process.env.JWT_SECRET || 'SET_ME_AS_ENV_VAR',
        salt_rounds: Number.parseInt(process.env.SALT_ROUNDS, 10) || 10
    }
};
