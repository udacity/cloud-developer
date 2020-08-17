import * as Joi from '@hapi/joi';

const schema = Joi.object({
    image_url: Joi.string().uri(),
});

export default schema;
