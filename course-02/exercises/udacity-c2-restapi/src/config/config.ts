export const config = {
	dev: {
		username: 'udagammacddev2',
		password: 'udagammacddev2',
		database: 'postgres',
		host: 'udagammacddev2.co6vfctjgigk.ca-central-1.rds.amazonaws.com',
		dialect: 'postgres',
		storage: ':memory:',
		aws_region: 'ca-central-1',
		aws_profile: 'default',
		aws_media_bucket: 'udagammacddev2',
	},
	prod: {
		username: '',
		password: '',
		database: 'udagram_prod',
		host: '',
		dialect: 'postgres',
	},
};
