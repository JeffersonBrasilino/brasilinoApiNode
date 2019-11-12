import SendEmailService from "../services/SendEmailService";

export class SendEmailActions {
    private _service: SendEmailService;
    constructor(){
        this._service = new SendEmailService();
    }

    index = (req, res) => {
        this._service.sendEmail();
        res.send("SendEmailActions");
    }
}
