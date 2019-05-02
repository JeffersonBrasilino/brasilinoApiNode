import { Sequelize } from 'sequelize';
import dbConfig from '../config/dbConfig';
class ConectionDataBase extends Sequelize {
    constructor() {
        super(dbConfig.development);
    }

}

export default new ConectionDataBase();
