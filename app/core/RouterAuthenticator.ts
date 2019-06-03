import { sign, verify } from 'jsonwebtoken';
export default class RouterAuthenticator {
    constructor(req, res, next) {
        //this.generate();
        if (!this.authenticate(req)) {
            res.status(401).end();
        } else {
            next();
        }
    }

    private authenticate(req): boolean {
        let retorno;
        try {
            if (req.get('Authorization')) {
                let tk = req.get('Authorization').replace(/[Bb]earer /, '');
                let credencials = verify(tk, process.env.KEY_TOKEN);

               retorno = this.chekCredencials(credencials, req);
            } else {
                retorno = false;
            }
        } catch (err) {
            retorno = false;
        }
        return retorno;
    }

    private chekCredencials(credencials, req) {
        //if(credencials.permissions[req.path])
        let retorno = true;
        if (!credencials.permissions[req.path])
            retorno = false;
        else if (!credencials.permissions[req.path].find(k => k == req.method))
            retorno = false;

        return retorno
    }

    private generate() {
        console.log(sign({ "user": "jefferson brassilino", "permissions": { "/auth/signup": ["POST", "GET"] } }, process.env.KEY_TOKEN));
    }
}