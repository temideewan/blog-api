import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

let mailTrapToken = ""

if(process.env.MAILTRAP_TOKEN){
  mailTrapToken = process.env.MAILTRAP_TOKEN
}
export const mailtrapClient = new MailtrapClient({
  token: mailTrapToken,
});

export const sender = {
  email: 'hello@demomailtrap.com',
  name: 'Temidayo',
};
