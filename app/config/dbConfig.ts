import * as dotenv from 'dotenv';
dotenv.config();
let dbConfig = {
  development: "postgres://brasilino:jeffdrummer@192.168.0.105:4000/teste_banco"
}

export default dbConfig;
