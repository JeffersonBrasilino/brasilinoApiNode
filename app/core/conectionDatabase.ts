import {Sequelize} from 'sequelize';
import * as dotenv from 'dotenv';
import * as t from 'local-storage';
import {databases} from '../config/databases';

class ConectionDataBase {
    public conection: any;

    conect = (): Sequelize => {
        dotenv.config();
        let schemaSelected = String(process.env.DB_HOST_DEV);
        console.log('schema selected ->', databases[schemaSelected]);
        try {
            this.conection = new Sequelize(Object(databases[schemaSelected]));
            this.conection.authenticate()
                .then(() => {
                    console.log('conexão com o banco bem sucedida.');
                }).catch((err) => {
                console.error('conexão falhou', err);
            });
        } catch (err) {
            console.log('erro ao conectar com o banco de dados');
        }

        return this.conection;
    };

    /*
    * função para mudar coneção do banco de dados em tempo real caso a opção seja liberada,
    * funcionamento: adiciona um hook(cabeçalho) que altera os dados da conexão via connectionManager antes da requisição
    * de conexão ser chamada.
    * */
    changeDatabase = async (database) => {
        //remove o cabeçalho de conexao, evitando ter fila de cabeçalhos de conexao;
        await this.conection.removeHook('beforeConnect','changeConnection');

        //adiciona o hoook e o executa fazendo a mudança de conexão;
        await this.conection.beforeConnect('changeConnection', (config) => {
            let dbConfig = databases[database];
            for (let conf in dbConfig) {
                config[conf] = dbConfig[conf];
            }
        });
    }
}

export default new ConectionDataBase();