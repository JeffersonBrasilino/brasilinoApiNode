import UsuariosModel from '../models/UsuariosModel';
import md5 from 'md5';
import { sign } from 'jsonwebtoken';

export default class AuthService {
    createUser = (data): Promise<UsuariosModel | boolean> => {
        data.senha = md5(data.senha);
        return UsuariosModel.create(data, {
            include: [
                { association: UsuariosModel.grupoUsuariosUsuario }
            ]
        }).then((res) => {
            return res.id
        }).catch((err) => {
            return false
        })
    }

    signIn = (user, password) => {
        console.log(process.env.KEY_TOKEN);
    }
}