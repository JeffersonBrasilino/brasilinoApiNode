import { sign, verify } from 'jsonwebtoken';
export default class AuthenticatorManager {

    authenticate = (req, res, next) => {
        let retorno;
        try {
            if (req.get('Authorization')) {
                let tk = req.get('Authorization').replace(/[Bb]earer /, '');
                let credencials = verify(tk, process.env.KEY_TOKEN);

                retorno = this.chekCredencials(credencials.data, req);
            } else {
                retorno = false;
            }

        } catch (err) {
            retorno = false;
        }

        if (retorno == false)
            res.status(401).end();
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
        let retorno = true;
        if (!credencials.permissions[req.path])
            retorno = false;
        else if (!credencials.permissions[req.path].find(k => k == req.method))
            retorno = false;

        return retorno
    }
}