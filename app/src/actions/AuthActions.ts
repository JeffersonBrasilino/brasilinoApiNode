import AuthService from '../services/AuthService';
export class AuthActions {

    private authService: AuthService
    constructor() {
        this.authService = new AuthService();
    }

    index = (req, res) => {
        res.send('AuthAction');
    }

    signIn = async (req, res) => {
       let result = await this.authService.signIn(req.body.user, req.body.password);

       //funcao status ficou deprecated para status(number) novo metodo...
       if(typeof result == "number")
           res.sendStatus(result);
       else
           res.send(result);
    }

    signup = async (req, res) => {
        console.log(req.params);
        // let result = await this.authService.createUser(req.body);
        // res.json(result);
    }
}
