/*
  MODELO DE GRUPO DE USUARIOS USUARIO
  contendo:
    classe PRIVADA com o modelo da tabela, essa estende da classe Model do sequelize
    classe PUBLICA com as instancias da classe de modelo, com a conexao com o banco, associaoes e includes da tabela conforme o sequelize,
    a classe publica pode conter metodos personalizados como: consultas, validacoes especificas e etc...

    documentacao do SEQUELIZE: http://docs.sequelizejs.com
 */
import { Model, DataTypes } from 'sequelize';
import conectionDatabase from '../../core/conectionDatabase';
class GrupoUsuariosUsuario extends Model{}
GrupoUsuariosUsuario.init({
    id: {
        type: new DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      usuarios_id: {
        type: new DataTypes.BIGINT
      },
      grupo_usuarios_id: {
        type: new DataTypes.BIGINT
      }

},{
   name:{singular: 'GrupoUsuarios',plural: 'GrupoUsuarios'},
    underscored:true,
    sequelize: conectionDatabase,
    tableName:'grupo_usuarios_usuario'
});
export default GrupoUsuariosUsuario;