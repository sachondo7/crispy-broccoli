import { User } from '../../../domain/User';
import { Userdb } from '../../../infrastructure/database/user';
import { database } from '../../../infrastructure/database/data-source';
import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import path from 'path';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;
const userRepository = database.getRepository(Userdb);

const dotenvPath = path.resolve(__dirname, '../../../../.env');
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
require('dotenv').config({ path: dotenvPath });

const generateToken = (length = 10): string => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }

      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL!,
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      refreshToken: process.env.REFRESH_TOKEN!,
      accessToken: accessToken as string
    }
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  const emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

export class RecoverPassword {
  async execute(email: string): Promise<Userdb | undefined> {
    try {
      const user = await userRepository.findOneBy({ email });
      if (!user) {
        return undefined;
      }

      const temporaryPassword = generateToken(10);
      const emailBody = `Estimado/a ${user.name},\n
       tu contraseña temporal es: ${temporaryPassword}\n
       Por favor, ingresa a la página y cámbiala de inmediato.`;

      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Contraseña temporal',
        text: emailBody
      };

      await sendEmail(mailOptions);

      console.log('User password is:', temporaryPassword);

      // console.log('User password is:', temporaryPassword);

      user.passwordHash = await bcrypt.hash(temporaryPassword, 5);
      await userRepository.save(user);


      // console.log('user hash is:', user.passwordHash);
      // const result: PasswordRecoveryResult = {
      //   user,
      //   temporaryPassword
      // };

      return user;

    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
