import * as models from '../models/ExportModels';
import md5 from 'md5';
import AuthenticatorManager from '../../core/AuthenticatorManager';
import DataValidator from "../../core/DataValidator";

export default class AuthService {

    createUser = async (data) => {
        let retorno;
        const rules = {
            nome: {required: true, minLength: 100},
            email: {required: true},
            login: {required: true},
            senha: {required: true}
        };
        let validate = new DataValidator().validateGroupData(rules, data);
        if (validate.valid == false) {
            retorno = {status: 400, data: validate.errors};
        } else {
            data.senha = md5(data.senha);
            await models.UsuariosModel.create(data, {
                include: [
                    {model: models.GrupoUsuariosUsuarioModel}
                ]
            }).then((res) => {
                retorno = {status: 201, data: {id: res.id}};
            }).catch((err) => {
                retorno = {status: 500, data: {}};
            });
        }
        return retorno;
    };

    signIn = async (user, password) => {
        let retorno;
        try {
            let pass = md5(password);
            let userData = await models.UsuariosModel.findOne({
                attributes: ['id'],
                where: {login: user, senha: pass, status: 1},
                include: [
                    {
                        model: models.GrupoUsuariosUsuarioModel,
                        attributes: ['grupo_usuario_id'],
                        where: {status: 1}
                    }
                ]
            });
            if (userData) {
                let objectToken = {'userId': userData.id};
                let permissions = await models.RotasApiModel.findAll({
                    where: {status: 1},
                    include: [
                        {model: models.GrupoUsuariosPermissoesModel, where: {grupo_usuario_id: 3}}
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
                retorno = {token: new AuthenticatorManager().generateCredencials(objectToken)};

            } else {
                retorno = {token: 'null'};
            }
        } catch (error) {
            retorno = 400; //400 - bad request;
        }
        return retorno;
    }

    //TODO fazer validacao em um arquivo separado para servir para outras requisicoes... NOWWWW
    private validateFields(rules, data) {
        let retorno = true;
        for (let rule in rules) {
            let field = data[rule];
            if (rules[rule].required == true) {
                if (field == undefined || field == {} || field == [] || field == '' || field == null) {
                    retorno = false;
                }
            }
        }
        return retorno;
    }
}
