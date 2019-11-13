import * as nodemailer from 'nodemailer';

export default class SendEmail {

    private transport;

    constructor() {
        const config = process.env;
        this.transport = nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: Number(config.SMTP_PORT),
            secure: true,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASS
            }
        });
        this.transport.verify((err, suc) => {
            if (err)
                throw Error('configuracao do SMTP incorreta ' + err);
        });
    }

    check(): void {
        this.transport.verify((err, suc) => {
            if (err)
                console.log(err);
            else
                console.log('smtp configurado e conectado com sucesso.');
        })
    }

    sendEmail(emails: Array<string>, subject: String, content: String) {
        let emailsStr = emails.join(',');
        return this.transport.sendMail({
            from: process.env.SMTP_USER,
            to: emailsStr,
            subject: subject,
            html: content
        });
    }
}
