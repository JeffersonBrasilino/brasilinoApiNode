import {Sequelize} from 'sequelize';
import * as dotenv from 'dotenv';
import {databases} from '../config/databases';

class ConectionDataBase {
    public conection: any;
    private databases: Object;

    constructor() {
        this.databases = databases;
    }

    conect = (): Sequelize => {
        dotenv.config();
        let schemaSelected = String(process.env.DB_HOST_DEV);
        try {
            this.conection = new Sequelize(Object(this.databases[schemaSelected]));
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
        try {
            if (this.databases[database]) {
                //remove o cabeçalho de conexao, evitando ter fila de cabeçalhos de conexao;
                await this.conection.removeHook('beforeConnect', 'changeConnection');

                //adiciona o hoook e o executa fazendo a mudança de conexão;
                await this.conection.beforeConnect('changeConnection', (config) => {
                    let dbConfig = databases[database];
                    for (let conf in dbConfig) {
                        config[conf] = dbConfig[conf];
                    }
                });
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log('ocorreu um erro ao mudar de conexao');
            return false;
        }
    }

    testConnection = () => {
        this.conection.authenticate()
            .then(() => {
                console.log('conexão com o banco bem sucedida.');
            }).catch((err) => {
            console.error('conexão falhou', err);
        });
    }
}

export default new ConectionDataBase();