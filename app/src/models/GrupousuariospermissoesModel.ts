import { Model, DataTypes } from 'sequelize';
import Db from '../../core/conectionDatabase';
class GrupousuariospermissoesModel extends Model<GrupousuariospermissoesModel>{
    //add especifcs methods here...
}
GrupousuariospermissoesModel.init({
    id: { type: new DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    permissao: { type: new DataTypes.STRING(6), },
    created_at: { type: new DataTypes.DATE, },
    updated_at: { type: new DataTypes.DATE, },
    status: { type: new DataTypes.SMALLINT, },
    modulo_id: { type: new DataTypes.INTEGER, },
    Attribute1: { type: new DataTypes.INTEGER, },
},
    {
        sequelize: Db,
        tableName: 'grupo_usuarios_permissoes',
        underscored: true,
        name: { singular: 'Grupousuariospermissoes', plural: 'Grupousuariospermissoes' }
    }
)

export default GrupousuariospermissoesModel;