//import SendEmail from "../../core/SendEmail";

import AuthenticatorManager from "../../core/AuthenticatorManager";

export default class SendEmailService {

    async sendEmail(sendTo:Array<string> ,subject:string,content:string) {
        console.log('sendEmailService');
        //const a = new SendEmail();
        //return await a.sendEmail(sendTo,subject,content);
    }

    sendEmailSignup(sendTo:Array<string> ,subject:string,content:string, secret: string) {
        const authenticator = new AuthenticatorManager();
        /*const a = new SendEmail();
        return await a.sendEmail(sendTo,subject,content);*/
    }
}
