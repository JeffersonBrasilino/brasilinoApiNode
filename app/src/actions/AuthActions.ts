import AuthService from '../services/AuthService';

export class AuthActions {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    index = (req, res) => {
        res.send('AuthAction');
    }

    signIn = async (req, res) => {
        let result = await this.authService.signIn(req.body.user, req.body.password);

        if (typeof result == "number")
            res.status(result).end();
        else
            res.status(200).send(result);
    }

    signup = async (req, res) => {
        let retorno = await this.authService.createUser(req.body);
        res.status(retorno.status).send(retorno.data);
    }

    checkEmail = async (req, res) => {
        let retorno = await this.authService.checkEmail(req.query.email);
        res.status(retorno.code).send(retorno.data);

    }
}
