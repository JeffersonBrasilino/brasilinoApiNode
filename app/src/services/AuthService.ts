import * as models from '../models/ExportModels';
import md5 from 'md5';
import AuthenticatorManager from '../../core/AuthenticatorManager';
import DataValidator from "../../core/DataValidator";
import {UsuariosModel} from "../models/ExportModels";
//TODO: FAZER A TRANSACTION DO SEQUELIZE FUNCIONAR(DE ALGUMA FORMA).
export default class AuthService {

    createUser = async (data) => {
        let retorno;
        const rules = {
            nome: {required: true},
            email: {required: true, email: true},
            login: {required: true},
            senha: {required: true}
        };
        let validate = new DataValidator().validateGroupData(rules, data);
        if (validate.valid == false) {
            retorno = {status: 400, data: validate.errors};
        } else {

            let checkEmail = await models.UsuariosModel.findOne({
                attributes: ['id'],
                where: {email: data.email}
            });

            if (!checkEmail) {
                data.senha = md5(data.senha);
                await models.UsuariosModel.create(data, {
                    include: [
                        {model: models.GrupoUsuariosUsuarioModel}
                    ]
                }).then((res) => {
                    retorno = {status: 201, data: {userId: new AuthenticatorManager().generateCredencials({userId:res.id})}};
                }).catch((err) => {
                    retorno = {status: 500, data: {}};
                });
            } else {
                retorno = {status: 409, data: {hasEmail: true}}
            }

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
                    routesAllowUser[pm.rota] = <any>[];
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
    };

    checkEmail = async (email: string) => {
        let retorno;
        try {
            if (email == undefined) {
                retorno = {code: 400};
            } else {
                let validate = new DataValidator().email(email);
                if(validate == null){
                    const verifyEmail = await models.UsuariosModel.findOne({
                        attributes: ['id'],
                        where: {email: email}
                    });
                    if(verifyEmail)
                        retorno = {code: 200, data: {hasEmail: true}};
                    else
                        retorno = {code: 200, data: {hasEmail: false}};
                }else{
                    retorno = {code: 200, data: {email: validate}};
                }
            }
        } catch (e) {
            retorno = {code: 500, data: {}}; //server error;
        }
        return retorno;
    }

    activatedUser(userToken){
        let retorno = {code:200};
        try{
            const authManager = new AuthenticatorManager();
            let userData = authManager.verifyToken(userToken);
            if(userData.ok == true){
                UsuariosModel.update({status:1},{
                    where:{
                        //@ts-ignore
                        id:userData.data.userId
                    }
                })
            }else{
                retorno.code = 403;
            }
        }catch (e) {
            retorno.code = 500;
        }
        return retorno;
    }
}
