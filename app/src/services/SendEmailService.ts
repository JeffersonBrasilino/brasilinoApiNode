import SendEmail from "../../core/SendEmail";

export default class SendEmailService {

    async sendEmail(sendTo:Array<string> ,subject:string,content:string) {
        console.log('sendEmailService');
        //const a = new SendEmail();
        //return await a.sendEmail(sendTo,subject,content);
    }

    sendEmailSignup(sendTo:Array<string> ,subject:string,content:string) {
        const a = new SendEmail();
        return a.sendEmail(sendTo,subject,content);
    }
}
