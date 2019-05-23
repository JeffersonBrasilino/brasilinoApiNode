import Usuarios from '../models/Usuarios_';
import UsuariosModel from '../models/UsuariosModel';
export class LoginActions {
    login = async (req, res) => {
        try {
            UsuariosModel.findAll().then((r)=>{
                res.send({ Usuarios:r });
            });
        } catch (err) {
            console.log(err);
        }
    }
}