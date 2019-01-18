import * as nodemailer from 'nodemailer';
import { ServiceID } from "../decorator/ServiceDecorator";

class Mailer {
  @ServiceID("mailer") public id;

  private mailer : nodemailer.Transporter;
  constructor(transport, options) {
    this.mailer = nodemailer.createTransport(transport, options)
  }

  send(options: nodemailer.SendMailOptions) {
    return this.mailer.sendMail(options);
  }
}

export default Mailer;