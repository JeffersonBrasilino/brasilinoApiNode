import SendEmailService from "../services/SendEmailService";

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
        this.sv.sendEmailSignup(req.body.sendTo, req.body.subject, req.body.content,req.body.secret);
        res.send('ok');
    }
}
