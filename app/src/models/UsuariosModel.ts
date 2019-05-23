import { Model, DataTypes } from 'sequelize';
import Db from '../../core/conectionDatabase';
class UsuariosModel extends Model<UsuariosModel>{
    //add especifcs methods here...
}
UsuariosModel.init({},
    {
        sequelize: Db,
        tableName: 'usuarios',
        underscored: true,
        name: { singular: 'Usuarios', plural: 'Usuarios' }
    }
)

export default UsuariosModel;