import AuthService from '../services/AuthService';
export class AuthActions {

    private authService: AuthService
    constructor() {
        this.authService = new AuthService();
    }

    index = (req, res) => {
        res.send('AuthAction');
    }
    signIn = async(req,res)=>{
        let result = await this.authService.signIn(req.body.user,req.body.password);
        res.json(result);
    }
    signup = async (req, res) => {
        let result = await this.authService.createUser(req.body);
        res.json(result);
    }
}