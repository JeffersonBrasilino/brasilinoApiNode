import { Model, DataTypes } from 'sequelize';
import Db from '../../core/conectionDatabase';
import { RotasApiModel, GrupoUsuariosModel } from './ExportModels';

export class GrupoUsuariosPermissoesModel extends Model<GrupoUsuariosPermissoesModel>{
    //add especifcs methods here...
}
GrupoUsuariosPermissoesModel.init(
    {
        id: { type: new DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        permissao: { type: new DataTypes.STRING(6), },
        created_at: { type: new DataTypes.DATE, },
        updated_at: { type: new DataTypes.DATE, },
        status: { type: new DataTypes.SMALLINT, },
        rota_id: { type: new DataTypes.INTEGER, },
        grupo_usuario_id: { type: new DataTypes.INTEGER, },
    },
    {
        sequelize: Db.conect(),
        tableName: 'grupo_usuarios_permissoes',
        underscored: true,
        name: {
            singular: 'GrupoUsuariosPermissoes', plural: 'GrupoUsuariosPermissoes'
        }
    });
RotasApiModel.hasMany(GrupoUsuariosPermissoesModel, { foreignKey: 'rota_id' });
GrupoUsuariosPermissoesModel.belongsTo(RotasApiModel, { foreignKey: 'rota_id' });
GrupoUsuariosModel.hasMany(GrupoUsuariosPermissoesModel, { foreignKey: 'grupo_usuario_id'});
GrupoUsuariosPermissoesModel.belongsTo(GrupoUsuariosModel, { foreignKey: 'grupo_usuario_id' });
