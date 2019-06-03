import { Model, DataTypes } from 'sequelize';
import Db from '../../core/conectionDatabase';
import GrupousuariosModel from './GrupousuariosModel';
import UsuariosModel from './UsuariosModel';
class GrupousuariosusuarioModel extends Model<GrupousuariosusuarioModel>{
    static grupoUsuarios;
    static usuarios;
    //add especifcs methods here...
}
GrupousuariosusuarioModel.init({
    id: { type: new DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    usuario_id: { type: new DataTypes.INTEGER, },
    grupo_usuario_id: { type: new DataTypes.INTEGER, },
    created_at: { type: new DataTypes.DATE, },
    updated_at: { type: new DataTypes.DATE, },
    status: { type: new DataTypes.SMALLINT, },
},
    {
        sequelize: Db,
        tableName: 'grupo_usuarios_usuario',
        underscored: true,
        name: { singular: 'Grupousuariosusuario', plural: 'Grupousuariosusuario' }
    }
)
export default GrupousuariosusuarioModel;