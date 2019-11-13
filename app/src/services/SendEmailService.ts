import SendEmail from "../../core/SendEmail";

export default class SendEmailService {

    async sendEmail() {
        const a = new SendEmail();
        await a.sendEmail(['jefferson.wendhel@gmail.com'],'teste','ushdiushoiausfhaodshufasoiuh');
    }
}
