import * as models from '../models/ExportModels';
import md5 from 'md5';
import { Op } from 'sequelize';
import AuthenticatorManager from '../../core/AuthenticatorManager';
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
        let retorno;
        try {
            let pass = md5(password);
            let userData = await models.UsuariosModel.findOne({
                attributes: ['id'],
                where: { login: user, senha: pass, status: 1 },
                include: [
                    {
                        model: models.GrupoUsuariosUsuarioModel,
                        attributes: ['grupo_usuario_id'],
                        where: { status: 1 }
                    }
                ]
            });
            if (userData) {
                let objectToken = { 'userId': userData.id };
                let permissions = await models.RotasApiModel.findAll({
                    where: { status: 1 },
                    include: [
                        { model: models.GrupoUsuariosPermissoesModel, where: { grupo_usuario_id: 3 } }
                    ]
                });

                let routesAllowUser = {};
                for (const pm of permissions) {
                    routesAllowUser[pm.rota] = <any>[]
                    pm.GrupoUsuariosPermissoes.forEach((val, key) => {
                        routesAllowUser[pm.rota].push(val.permissao);
                    });
                }

                objectToken['permissions'] = routesAllowUser;
                retorno = { token: new AuthenticatorManager().generateCredencials(objectToken) };

            } else {
                retorno = { token: 'null' };
            }
        } catch (error) {
            retorno = 400; //400 - bad request;
        }
        return retorno;
    }
}