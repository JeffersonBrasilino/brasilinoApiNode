import { Model, DataTypes } from 'sequelize';
import Db from '../../core/conectionDatabase';

export class GrupoUsuariosModel extends Model<GrupoUsuariosModel>{
    //add especifcs methods here...
}
GrupoUsuariosModel.init(
    {
        id: { type: new DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        descricao: { type: new DataTypes.STRING(150), },
        created_at: { type: new DataTypes.DATE, },
        updated_at: { type: new DataTypes.DATE, },
        status: { type: new DataTypes.SMALLINT, },
    },
    {
        sequelize: Db.conect(),
        tableName: 'grupo_usuarios',
        underscored: true,
        name: {
            singular: 'GrupoUsuarios', plural: 'GrupoUsuarios'
        }
    });
