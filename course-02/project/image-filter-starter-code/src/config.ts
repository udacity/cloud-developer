const result = require('dotenv').config();

if (result.error) {
    throw result.error
} else {
    console.log(`Using config:`)
    console.log(result.parsed)
}

export const config = {
    "dev": {
        'port': process.env.PORT,
        // 'aws': {
        //     'aws_region': process.env.AWS_REGION,
        //     'aws_profile': process.env.AWS_PROFILE,
        // },
    },
}