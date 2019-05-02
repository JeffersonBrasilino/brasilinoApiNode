/*
  MODELO DE GRUPO DE USUARIOS
  contendo:
    classe PRIVADA com o modelo da tabela, essa estende da classe Model do sequelize
    classe PUBLICA com as instancias da classe de modelo, com a conexao com o banco, associaoes e includes da tabela conforme o sequelize,
    a classe publica pode conter metodos personalizados como: consultas, validacoes especificas e etc...

    documentacao do SEQUELIZE: http://docs.sequelizejs.com
 */
import { Model, DataTypes } from 'sequelize';
import conectionDatabase from '../../core/conectionDatabase';
import GrupoUsuariosUsuario from './GupoUsuariosUsuario';
class GrupoUsuarios extends Model{}
GrupoUsuarios.init({
    id: {
        type: new DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: new DataTypes.STRING()
      }

},{
    underscored:true,
    sequelize: conectionDatabase,
    tableName:'grupo_usuarios'
});

GrupoUsuarios.hasMany(GrupoUsuariosUsuario,{foreignKey:'grupo_usuarios_id'});

export default GrupoUsuarios;
