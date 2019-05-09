import { writeFileSync } from 'fs';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
class GeneratorModel {
    private db: Sequelize;
    constructor(args) {
        dotenv.config();
        this.db = new Sequelize(String(process.env.DATABASE_URL));
        this.createModel(args[2]);
    }
    createModel = async (name) => {
        let informationTable = await this.getInformationTable(name);
        this.convertInformationTable(informationTable);
        let modelName = name.charAt(0).toUpperCase() + name.slice(1)
        let modelStr = "import { Model, DataTypes } from 'sequelize';\r\nimport Db from '../../core/conectionDatabase';\r\nimport{DataType} from 'sequelize-typescript';\r\n export class " + modelName + "Model{\r\n}";
        //let arq = writeFileSync('./src/models/'+modelName+'.ts',modelStr);
    }

    private getInformationTable = async (tableName) => {
        let retorno;
        try {
            await this.db.query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '" + tableName + "' ").then((result) => {
                retorno = result[0];
            });
        } catch (error) {
            console.log(error);
        }
        return retorno;
    }

    private convertInformationTable = (informationTableJson) => {
        let res = '';
        informationTableJson.forEach(element => {
            let type = String(element.data_type).toUpperCase();
            let typeColunm = this.getTypeColunm(element);
            console.log(typeColunm);
        });
    }

    private getTypeColunm(element) {
        let type = String(element.data_type).toUpperCase();
        console.log(element);
        if (type == 'TIMESTAMP WITHOUT TIME ZONE') type = 'DATE';
        if (type == 'CHAR' || type == 'CHARACTER') type = 'STRING';

        if(type == 'NUMERIC') type = 'FLOAT';
        if(type == 'MONEY') type = 'DECIMAL';
        
        if (element.character_maximum_length) type += '(' + element.character_maximum_length + ')';
        if(type != 'BIGINT' && type != 'REAL'){
            if (element.numeric_precision) {
                if (element.numeric_scale)
                    type += '(' + element.numeric_precision + ',' + element.numeric_scale + ')';
                else
                    type += '(' + element.numeric_precision + ')';
            }
        }
        return type;
    }
}

new GeneratorModel(process.argv);