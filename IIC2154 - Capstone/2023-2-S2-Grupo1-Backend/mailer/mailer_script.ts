import axios from 'axios';
import nodemailer from 'nodemailer';
import path from 'path';
import { google } from 'googleapis';
import * as admin from 'firebase-admin';
const { OAuth2 } = google.auth;

const dotenvPath = path.resolve(__dirname, '../.env');
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
require('dotenv').config({ path: dotenvPath });

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

console.log('admin inicializado');

function formatDate(date: Date): string {
  const day: string = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  const year: string = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

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
  try {
    const emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
    console.log('Email sent successfully!');
  } catch (error: any) {
    console.error('Error sending email:', error);
    // You can handle the error here or rethrow it if needed.
    throw error;
  }
};

const scheduleRepeatingEmail = async () => {
  console.log('Scheduling repeating email...');
  // const response = await axios.get('https://legitbusiness.me/quotes/mailer');
  const response = await axios.get('http://api:3000/quotes/mailer');

  console.log('GET request successful:', response.data.length);
  const quotes = response.data;

  if (response.data.length > 0) {
    console.log(response.data);
    const quotesByUser: Record<string, any[]> = {};

    quotes.forEach((quote) => {
      if (quote.userId !== null) {
        const { userId } = quote;
        const { email } = userId;

        if (!quotesByUser[email]) {
          quotesByUser[email] = [];
        }

        quotesByUser[email].push(quote);
      }
    });

    const result = Object.keys(quotesByUser).map((email) => ({
      [email]: quotesByUser[email]
    }));

    for (const userQuotes of result) {
      const email = Object.keys(userQuotes)[0];
      const quotes = userQuotes[email];
      let emailBody = `Estimado/a:\n Las siguientes cotizaciones están a punto de expirar:\n`;
      let notificationBody = '';

      for (const quote of quotes) {
        const delivery_ = new Date(quote.deliveryDate);
        const end_ = new Date(quote.endDate);
        const delivery = formatDate(delivery_);
        const endDate = formatDate(end_);
        emailBody += `  - ${quote.idProyecto}, del cliente ${quote.clientId.name},`;
        emailBody += ` con fecha de entrega ${delivery} y fecha de cierre ${endDate}.\n`;
        notificationBody += `- ${quote.idProyecto}\n`;
      }

      console.log('TOKEN DEVISE');
      console.log(quotes[0].userId.tokenDevise);
      console.log('TOKEN DEVISE');
      emailBody += `Saludos cordiales.`;

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Recordatorio de cotización por vencer',
        text: emailBody
      };
      try {
        await sendEmail(mailOptions);
      } catch (error: any) {
        // Handle the error from the calling code if needed.
        console.error('Error in sendEmail function:', error);
      }

      if (quotes[0].userId.tokenDevise !== null) {
        const message = {
          token: quotes[0].userId.tokenDevise,
          notification: {
            title: 'Cotizaciones por vencer',
            body: notificationBody
          }
        };
        admin
          .messaging()
          .send(message)
          .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
      }
    }
  }

  //   Token:
  //     'cxMQz_MaQcSX0FGGh13L--:APA91bGeoCH4HexyfnXi2crTyM59c0_o9voNOwzpMmubGU8RfRfse4gtuCv-i8JkJ1VKjRzj53Vs39xePX3qbYp6MZ9LmDHBUZqiNcHN7D9XqMD2MctusklrDycWSNfTZ4yWtqedfslS',

  const now = new Date();
  console.log('Current date and time:', now.toLocaleString());

  const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const timeUntilNextDay = nextDay.getTime() - now.getTime();

  setTimeout(scheduleRepeatingEmail, timeUntilNextDay);
};

setTimeout(() => {
  scheduleRepeatingEmail().catch((error) => {
    console.error('An error occurred while scheduling daily email:', error);
  });
}, 10000);
