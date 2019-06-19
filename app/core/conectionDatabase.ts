import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
class ConectionDataBase extends Sequelize {
    constructor() {
        dotenv.config();
        try{
            super(String(process.env.DB_HOST_PROD));
        }catch(error){
            console.log('ERRO NA CONEXAO COM O BANCO DE DADOS, VERIFIQUE SE O DB_HOST[PRODUCTION|DEVELOPMENT] ESTA CORRETO.');
        }
       
    }

}

 export default new ConectionDataBase();
