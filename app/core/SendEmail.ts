import * as nodemailer from 'nodemailer';
import {smtpConfigs} from "../config/SmtpConfigs";

export default class SendEmail {

    private transport;

    constructor() {
        this.transport = nodemailer.createTransport(smtpConfigs);
    }

    check() {
        this.transport.verify((err, suc) => {
            if (err)
                console.log(err);
            else
                console.log('smtp configurado e conectado com sucesso.');
        })
    }

    sendEmail() {
        this.transport.sendMail({
            to: "jefferson.wendhel@gmail.com",
            subject: "teste de envio de email",
            html: '<b>se voce está lendo isso é pq deu certo caroi</b>'
        }).then((suc) => {
            console.log('success>>> ', suc);
        }).catch(err => {
            console.log('err>>> ', err)
        });
    }
}
