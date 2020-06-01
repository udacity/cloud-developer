export const config = {
	dev: {
		username: process.env.POSTGRESS_USERNAME,
		password: process.env.POSTGRESS_PASSWORD,
		database: process.env.POSTGRESS_DATABASE,
		host: process.env.HOST,
		dialect: 'postgres',
		storage: ':memory:',
		aws_region: process.env.AWS_REGION,
		aws_profile: process.env.AWS_PROFILE,
		aws_media_bucket: process.env.AWS_BUCKET,
	},
	prod: {
		username: '',
		password: '',
		database: 'udagram_prod',
		host: '',
		dialect: 'postgres',
	},
};
