import * as models from '../models/ExportModels';
import md5 from 'md5';
export default class AuthService {
    createUser = (data): Promise<models.UsuariosModel | any> => {
        data.senha = md5(data.senha);
        return models.UsuariosModel.create(data, {
            include: [
                { model: models.GrupoUsuariosUsuarioModel }
            ]
        }).then((res) => {
            return res.id
        }).catch((err) => {
            return false
        })
    }

    signIn = async (user, password) => {
        let pass = md5(password);
        return await models.UsuariosModel.findOne({
            include:[
                {
                    model:models.GrupoUsuariosUsuarioModel, 
                    include:[
                        {model: models.GrupoUsuariosModel}
                    ]
                }]   
        });
    }
}