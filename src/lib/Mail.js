import nodemail from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.transport = nodemail.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    this.transport.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
