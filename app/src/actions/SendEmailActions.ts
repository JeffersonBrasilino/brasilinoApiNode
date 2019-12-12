import SendEmailService from "../services/SendEmailService";
import AuthenticatorManager from "../../core/AuthenticatorManager";

export class SendEmailActions {
    private sv: SendEmailService;

    constructor() {
        this.sv = new SendEmailService();
    }

    index = (req, res) => {
        this.sv.sendEmail(req.body.sendTo, req.body.subject,req.body.content);
        res.send("SendEmailActions");
    };

    sendEmailSignup = (req, res) => {
        const auth = new AuthenticatorManager();
        const dataToken =  auth.verifyToken(req.body.secret);
        if(dataToken.ok == false){
            res.sendStatus(401);
        }else{
            this.sv.sendEmailSignup(req.body.sendTo, req.body.subject, req.body.content)
            res.sendStatus(200);
        }
    }
}
