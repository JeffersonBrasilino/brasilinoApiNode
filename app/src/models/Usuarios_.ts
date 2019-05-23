/*
  MODELO DE USUARIOS
  contendo:
    classe PRIVADA com o modelo da tabela, essa estende da classe Model do sequelize
    classe PUBLICA com as instancias da classe de modelo, com a conexao com o banco, associaoes e includes da tabela conforme o sequelize,
    a classe publica pode conter metodos personalizados como: consultas, validacoes especificas e etc...

    documentacao do SEQUELIZE: http://docs.sequelizejs.com
 */
import Db from '../../core/conectionDatabase';
import { Model, DataTypes } from "sequelize";
/*
  INICIO DA CLASSE DE MODELO
 */
class UsuariosModel extends Model<UsuariosModel> {
  
  teste = ()=>{
    return 'ok';
  }
}
/*
  INICIA O MODELO COM A FUNCAO ESTATICA DO MODEL: init(), CONTENDO OS CAMPOS E TIPOS DA TABELA NO BANCO DE DADOS 
 */
UsuariosModel.init({
  id: {
    type: new DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: new DataTypes.STRING()
  }
}, {
    /*parametro name na configuraçao do sequelize, ele e responsavel de nomear a chave do json de retorno de consulta/json de persistencia */
    name: { singular: 'UsuariosModel', plural: 'UsuariosModel' },
    /*undescored: muda o tipo de padrao de nomes de colunas no bando de CamelCase(default) para snake_case */
    underscored: true,
    /*Instancia de conexao com o banco de dados */
    sequelize: Db,
    /*Nome da table no banco de dados */
    tableName: 'usuarios'
  });

/* mapeamento de relacoes entre tabelas */
// UsuariosModel.hasMany(GrupoUsuariosUsuario, { foreignKey: 'usuarios_id' });
// GrupoUsuariosUsuario.belongsTo(UsuariosModel, { foreignKey: 'usuarios_id' });

export default UsuariosModel; 
