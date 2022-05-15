import { MailAdapter, SendMailData } from '../mailAdapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '6bc04841ffc252',
    pass: '9a1c3688b2c292',
  },
});

class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedback-app <oi@email.com>',
      to: 'José Oliveira <j.oliveira90@live.com>',
      subject,
      html: body,
    });
  }
}

export { NodemailerMailAdapter };
