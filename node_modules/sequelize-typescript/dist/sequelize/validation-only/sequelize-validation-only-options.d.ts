import { BaseSequelizeOptions } from '../sequelize/sequelize-options';
export interface SequelizeValidationOnlyOptions extends BaseSequelizeOptions {
    /**
     * Makes it possible to use sequelize for validation only
     * (no db connection is needed)
     */
    validateOnly: true;
}
