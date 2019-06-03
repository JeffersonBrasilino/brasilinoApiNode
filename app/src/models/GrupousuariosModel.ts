import { Model, DataTypes } from 'sequelize';
import Db from '../../core/conectionDatabase';
import GrupousuariosusuarioModel from './GrupousuariosusuarioModel';
class GrupousuariosModel extends Model<GrupousuariosModel>{
    static grupoUsuariosUsuario;
    //add especifcs methods here...
}
GrupousuariosModel.init({
    id: { type: new DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    descricao: { type: new DataTypes.STRING(150), },
    created_at: { type: new DataTypes.DATE, },
    updated_at: { type: new DataTypes.DATE, },
    status: { type: new DataTypes.SMALLINT, },
},
    {
        sequelize: Db,
        tableName: 'grupo_usuarios',
        underscored: true,
        name: { singular: 'Grupousuarios', plural: 'Grupousuarios' }
    }
)
GrupousuariosModel.grupoUsuariosUsuario = GrupousuariosModel.hasMany(GrupousuariosusuarioModel,{foreignKey:'grupo_usuario_id'});
GrupousuariosusuarioModel.belongsTo(GrupousuariosModel,{foreignKey:'grupo_usuario_id'});
export default GrupousuariosModel;