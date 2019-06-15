import { writeFileSync, existsSync, appendFileSync } from 'fs';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
class GeneratorModel {
    private db: Sequelize;
    constructor(args) {
        dotenv.config();
        this.db = new Sequelize(String(process.env.DB_HOST));
        this.createModel(args[2]);
    }
    createModel = async (nameTable) => {
        let modelName = this.convertSnakeToPascal(nameTable);
        if (!existsSync('./src/models/' + modelName + 'Model.ts')) {
            console.log('gerando model...');
            this.writeModelFile(nameTable);
        } else {
            console.log('o model ja existe.')
        }
        ;
    }

    private writeModelFile = async (tableName) => {
        let informationColunmsTable = await this.getInformationTable(tableName);
        let colunms = this.convertInformationTable(informationColunmsTable[0]);
        let nameCamel = this.convertSnakeToPascal(tableName);
        let foreignKeys = await this.getForeignKeysTable(tableName);
        let ClassName = nameCamel + 'Model';
        let modelStr = `import { Model, DataTypes } from 'sequelize';
                            import Db from '../../core/conectionDatabase';
                            `+ foreignKeys.fkImports + `
                             export class ` + ClassName + ` extends Model<` + ClassName + `>{
                                 //add especifcs methods here...
                                }
                                `+ ClassName + `.init(
                                    {` + colunms + `},
                                    {sequelize:Db,
                                        tableName:'` + tableName.toLowerCase() + `',
                                        underscored:true,
                                        name:{singular:'` + nameCamel + `',plural:'` + nameCamel + `'
                                    }
                                });\r\n`+ foreignKeys.fkInstance;
         writeFileSync('./src/models/' + ClassName + '.ts', modelStr);

        this.registerModel(nameCamel);
        console.log('concluido');
    }

    private getInformationTable = (tableName) => {
        return new Promise((resolve, reject) => {
            try {
                this.db.query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '" + tableName.toLowerCase() + "' ").then((result) => { resolve(result) });
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
        if (type == 'CHAR' || type == 'CHARACTER' || type == 'CHARACTER VARYING') type = 'STRING';

        if (type == 'NUMERIC') type = 'FLOAT';
        if (type == 'MONEY') type = 'DECIMAL';

        if (element.character_maximum_length) type += '(' + element.character_maximum_length + ')';
        if (type != 'BIGINT' && type != 'REAL' && type != 'SMALLINT' && type != 'INTEGER') {
            if (element.numeric_precision) {
                if (element.numeric_scale)
                    type += '(' + element.numeric_precision + ',' + element.numeric_scale + ')';
                else
                    type += '(' + element.numeric_precision + ')';
            }
        }
        return type;
    }

    private convertSnakeToPascal = (str) => {
        return str.replace(/(^[a-z])|([_-][a-z])/ig, (el) => {
            return el.toUpperCase().replace(/[_-]/, '');
        });
    }

    private getForeignKeysTable = async (tableName) => {
        let foreignKey = await this.db.query(`SELECT
        tc.table_name as table_destiny,
        kcu.column_name, 
        ccu.table_name AS foreign_table_name
    FROM 
        information_schema.table_constraints AS tc 
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name='` + tableName.toLowerCase() + "'");
        let retorno = { fkInstance: '', fkImports: '' }
        let fkImportsArr = <any>[];
        foreignKey[0].forEach(element => {
            let modelNameForeignKey = this.convertSnakeToPascal(element.foreign_table_name);
            let modelName = this.convertSnakeToPascal(tableName) + 'Model';
            if (existsSync('./src/models/' + modelNameForeignKey + 'Model.ts')) {
                fkImportsArr.push(modelNameForeignKey+'Model');
                retorno.fkInstance += modelNameForeignKey + `Model.hasMany(` + modelName + `,{foreignKey:'` + element.column_name + `'});\r\n` + modelName + `.belongsTo(` + modelNameForeignKey + `Model,{foreignKey:'` + element.column_name + `'});\r\n`;
            }else{
                console.log('existem chaves estrangeiras para a tabela '+element.foreign_table_name+', e nao ha model gerado para a tabela. gere o model da tabela '+element.foreign_table_name+' adicione o relacionamento manualmente no model '+modelName);
            }
        });
        retorno.fkImports = `import {`+fkImportsArr.join()+`} from ` + `'./ExportModels';\r\n`
        return retorno;
    }

    registerModel = (modelName)=>{
        console.log('registrando o model...');
        appendFileSync('./src/models/ExportModels.ts','\r\nexport {'+modelName+'Model} from "./'+modelName+'Model";');
    }
}

new GeneratorModel(process.argv);