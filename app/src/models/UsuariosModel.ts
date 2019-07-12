import { Model, DataTypes } from 'sequelize';
import Db from '../../core/conectionDatabase';

export class UsuariosModel extends Model<UsuariosModel>{
    //add especifcs methods here...
}

UsuariosModel.init(
    {
        id: { type: new DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        nome: { type: new DataTypes.STRING(255), },
        email: { type: new DataTypes.STRING(255), },
        login: { type: new DataTypes.STRING(255), },
        senha: { type: new DataTypes.TEXT, },
        facebook_token: { type: new DataTypes.TEXT, },
        created_at: { type: new DataTypes.DATE, },
        updated_at: { type: new DataTypes.DATE, },
        status: { type: new DataTypes.SMALLINT, },
    },
    {
        sequelize: Db,
        tableName: 'usuarios',
        underscored: true,
        name: {
            singular: 'Usuarios', plural: 'Usuarios'
        }
    }
);
