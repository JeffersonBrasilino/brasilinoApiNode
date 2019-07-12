import { sign, verify } from 'jsonwebtoken';
export default class AuthenticatorManager {

    authenticate = (req, res, next) => {
        let retorno = 200;
        try {
            if (req.get('Authorization')) {
                let tk = req.get('Authorization').replace(/[Bb]earer /, '');
                let credencials = verify(tk, process.env.KEY_TOKEN);

                retorno = this.chekCredencials(credencials.data, req);
            } else {
                retorno = 401;
            }

        } catch (err) {
            retorno = 401;
        }

        if (retorno != 200)
            res.status(retorno).end();
        else
            next();
    }

    generateCredencials = (data) => {
        let configToken = {
            data: data
        }
        return sign(configToken, process.env.KEY_TOKEN);
    }

    private chekCredencials(credencials, req) {
        let retorno = 200;
        if (!credencials.permissions[req.path] || !credencials.permissions[req.path].find(k => k == req.method))
            retorno = 403;

        return retorno
    }
}