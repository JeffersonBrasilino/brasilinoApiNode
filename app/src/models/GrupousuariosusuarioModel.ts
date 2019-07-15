import { Model, DataTypes } from 'sequelize';
import Db from '../../core/conectionDatabase';
import { UsuariosModel, GrupoUsuariosModel } from './ExportModels';

export class GrupoUsuariosUsuarioModel extends Model<GrupoUsuariosUsuarioModel>{
    //add especifcs methods here...
}
GrupoUsuariosUsuarioModel.init(
    {
        id: { type: new DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        usuario_id: { type: new DataTypes.INTEGER, },
        grupo_usuario_id: { type: new DataTypes.INTEGER, },
        created_at: { type: new DataTypes.DATE, },
        updated_at: { type: new DataTypes.DATE, },
        status: { type: new DataTypes.SMALLINT, },
    },
    {
        sequelize: Db.conect(),
        tableName: 'grupo_usuarios_usuario',
        underscored: true,
        name: {
            singular: 'GrupoUsuariosUsuario', plural: 'GrupoUsuariosUsuario'
        }
    });
UsuariosModel.hasMany(GrupoUsuariosUsuarioModel, { foreignKey: 'usuario_id' });
GrupoUsuariosUsuarioModel.belongsTo(UsuariosModel, { foreignKey: 'usuario_id' });
GrupoUsuariosModel.hasMany(GrupoUsuariosUsuarioModel, { foreignKey: 'grupo_usuario_id' });
GrupoUsuariosUsuarioModel.belongsTo(GrupoUsuariosModel, { foreignKey: 'grupo_usuario_id' });
