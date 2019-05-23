import { writeFileSync,existsSync } from 'fs';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
class GeneratorModel {
    private db: Sequelize;
    constructor(args) {
        let modelName = args[2].charAt(0).toUpperCase() + args[2].slice(1) + "Model";
        dotenv.config();
        this.db = new Sequelize(String(process.env.DB_HOST));
        if(!existsSync('./src/models/'+modelName+'.ts')){
            this.createModel(modelName);
        }else{
            console.log('o model ja existe.')
        }
    }
    createModel = async (modelName) => {
        console.log('gerando model...');
        let name = modelName.replace(/Model/,'');
        await this.getInformationTable(name).then((resolve) => {
            let colunms = this.convertInformationTable(resolve[0]);

            let modelStr = "import { Model, DataTypes } from 'sequelize';\r\nimport Db from '../../core/conectionDatabase';\r\n class " + modelName + " extends Model<"+modelName+">{\r\n//add especifcs methods here...\r\n}\r\n";
            modelStr += modelName + ".init({" + colunms + "},\r\n{sequelize:Db,\r\ntableName:'"+name.toLowerCase()+"',\r\nunderscored:true,\r\nname:{singular:'"+name+"',plural:'"+name+"'}}\r\n)\r\n";
            modelStr+= "\r\n export default "+modelName+";"
            writeFileSync('./src/models/'+modelName+'.ts',modelStr);
            console.log('concluido');
        }).catch((reject) => console.log(reject));
    }

    private getInformationTable = (tableName) => {
        return new Promise((resolve, reject) => {
            try {
                this.db.query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '" + tableName + "' ").then((result) => { resolve(result) });
            } catch (error) {
                reject('nao foi possivel buscar os dados da tabela.')
            }
        });
    }

    private convertInformationTable = (informationTableJson) => {
        let res = "";
        informationTableJson.forEach(element => {
            let typeColunm = this.getTypeColunm(element);
            res += element.column_name + ":{type: new DataTypes." + typeColunm + ",";
            if (element.column_name == 'id')
                res += "autoIncrement:true,primaryKey:true"
            res += "},\r\n"
        });

        return res;
    }

    private getTypeColunm(element) {
        let type = String(element.data_type).toUpperCase();
        if (type == 'TIMESTAMP WITHOUT TIME ZONE') type = 'DATE';
        if (type == 'CHAR' || type == 'CHARACTER') type = 'STRING';

        if (type == 'NUMERIC') type = 'FLOAT';
        if (type == 'MONEY') type = 'DECIMAL';

        if (element.character_maximum_length) type += '(' + element.character_maximum_length + ')';
        if (type != 'BIGINT' && type != 'REAL') {
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