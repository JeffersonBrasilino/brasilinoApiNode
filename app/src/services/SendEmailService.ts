import SendEmail from "../../core/SendEmail";

export default class SendEmailService {

    sendEmail = () => {
        const a = new SendEmail();
        a.check();
        a.sendEmail();
    }
}
