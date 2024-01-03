import Koa from 'koa';
import cors from 'koa-cors';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { database } from '../infrastructure/database/data-source'; // Import your database connection
import { runSeeders } from 'typeorm-extension';
import path from 'path';

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const deductionsRoutes = require('./routes/deductions');
const tariffRoutes = require('./routes/tariff');
const servicesRoutes = require('./routes/services');
const profilesRoutes = require('./routes/profiles');
const clientsRoutes = require('./routes/clients');
const quotesRoutes = require('./routes/quotes');
const contactsRoutes = require('./routes/contacts');
const utilsRouter = require('./routes/utils');
const adminRoutes = require('./routes/admin');
const mailerRoutes = require('./routes/mailer');
const reportsRoutes = require('./routes/reports');
const statisticsRoutes = require('./routes/statistics');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const dotenvPath = path.resolve(__dirname, '../../.env');
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
require('dotenv').config({ path: dotenvPath });


const app = new Koa();
const router = new Router();


if (process.env.NODE_ENV !== 'test') {
  database
    .initialize()
    .then(() => {
      // Here you can start to work with your database
      console.log('Database connected');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      // runSeeders(database);
      // console.log('Seeders runned');
    })
    .catch((error) => {
      console.log(error);
    });
}

app.use(
  cors({
    origin: '*'
  })
);
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());
app.use(indexRoutes.routes());
app.use(usersRoutes.routes());
app.use(deductionsRoutes.routes());
app.use(tariffRoutes.routes());
app.use(servicesRoutes.routes());
app.use(profilesRoutes.routes());
app.use(clientsRoutes.routes());
app.use(quotesRoutes.routes());
app.use(contactsRoutes.routes());
app.use(utilsRouter.routes());
app.use(adminRoutes.routes());
app.use(mailerRoutes.routes());
app.use(reportsRoutes.routes());
app.use(statisticsRoutes.routes());

const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = server;
export default app;
