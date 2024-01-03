import request from 'supertest';
import app from '../src/api/server';
import { database } from '../src/infrastructure/database/data-source';
import { execSync } from 'child_process';
import { runSeeders } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

const req = request(app);

beforeAll(async () => {
  try {
    await database.initialize();
    console.log('Database connected');
    // execSync(
    //   'npm run typeorm migration:run -- -d ./src/infrastructure/database/data-source.ts',
    //   { stdio: 'inherit' }
    // );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // runSeeders(database);
    // console.log('Seeders runned');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
});

afterAll(async () => {
  await database.destroy();
});

describe('API create quote', () => {
  let userId2: number;
  let clientId2: number;
  let serviceId: number;
  let contactId2: number;
  let quoteId: number;

  beforeAll(async () => {
    // Create a user
    const userResponse = await req.post('/api/users').send({
      name: 'Ximena Lambert',
      email: 'ximena.lambert@trebolit.cl',
      password: '12345678password'
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    userId2 = userResponse.body.id;

    // Create a client
    const clientResponse = await req.post('/api/clients').send({
      name: 'Banco Falabella',
      rut_empresa: '123456789'
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    clientId2 = clientResponse.body.id;

    // Create a service
    const serviceResponse = await req.post('/api/services').send({
      type: 'CELULA GESTIONADA'
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    serviceId = serviceResponse.body.id;

    // Create a contact
    const contactResponse = await req.post('/api/contacts').send({
      name: 'Martin Perez',
      email: 'martin.perez@bancofalabella.cl',
      clientId: clientId2
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    contactId2 = contactResponse.body.id;
  });

  it('should create a new quote with a POST request', async () => {
    const newQuote = {
      clientId: clientId2,
      contactId: contactId2,
      idProyecto: 'FA-001',
      risk: 'medio',
      perfiles: { 'Junior Developer': 50, 'Senior Developer': 20 },
      adicionales: ['Actualizacion de hardware'],
      porcentajeDescuento: 3,
      proyectDuration: 3,
      userId: userId2,
      currency: 'UF',
      service: serviceId,
      otherCosts: 10
    };
    const response = await req.post('/api/quotes').send(newQuote);
    console.log('Response is', response.body);
    expect(response.status).toBe(201);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    quoteId = response.body.quoteId;
    console.log('quoteId is', quoteId);
  });

  it('should return a 200 status code for GET /api/quotes/:id', async () => {
    const route = '/api/quotes/' + quoteId;
    const response = await req.get(route);
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for GET /api/quotes/filters/:user_id', async () => {
    const route = '/api/quotes/filters/' + userId2;
    const response = await req.post(route).send({ clientId: clientId2 });
    expect(response.status).toBe(200);
  });
});

describe('API simple get Endpoint Tests', () => {
  it('should return a 200 status code for GET /', async () => {
    const response = await req.get('/');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for GET /api/quotes', async () => {
    const response = await req.get('/api/quotes');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for GET /api/services', async () => {
    const response = await req.get('/api/services');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for GET /api/profiles/hardcoded', async () => {
    const response = await req.get('/api/profiles/hardcoded');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for GET /api/clients', async () => {
    const response = await req.get('/api/clients');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for GET /api/additionals/hardcoded', async () => {
    const response = await req.get('/api/additionals/hardcoded');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for GET /api/quotes/expire/:userId/:days', async () => {
    const response = await req.get('/api/quotes/expire/1/1');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for GET /api/quotes/searchHistory/:user_id', async () => {
    const response = await req.get('/api/quotes/searchHistory/1');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for GET /api/tariffs/:id', async () => {
    const response = await req.get('/api/tariffs/1');
    expect(response.status).toBe(200);
  });
});
