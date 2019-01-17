import * as nodemailer from 'nodemailer';
import * as SMTPTransport from "nodemailer/lib/smtp-transport";

export interface MailerConfig {
  transport: nodemailer.Transport | SMTPTransport.Options,
  options?: nodemailer.TransportOptions,
}

class Mailer {
  private mailer : nodemailer.Transporter;
  constructor(config: MailerConfig) {
    this.mailer = nodemailer.createTransport(config.transport, config.options)
  }

  send(options: nodemailer.SendMailOptions) {
    return this.mailer.sendMail(options);
  }
}

export default Mailer;