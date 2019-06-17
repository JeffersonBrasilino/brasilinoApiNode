import { Model, DataTypes } from 'sequelize';
import Db from '../../core/conectionDatabase';
import { } from './ExportModels';

export class RotasApiModel extends Model<RotasApiModel>{
    //add especifcs methods here...
}
RotasApiModel.init(
    {
        id: { type: new DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        rota: { type: new DataTypes.STRING(255), },
        created_at: { type: new DataTypes.DATE, },
        updated_at: { type: new DataTypes.DATE, },
        status: { type: new DataTypes.SMALLINT, },
    },
    {
        sequelize: Db,
        tableName: 'rotas_api',
        underscored: true,
        name: {
            singular: 'RotasApi', plural: 'RotasApi'
        }
    });
