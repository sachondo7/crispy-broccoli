import Router from 'koa-router';
import { CreateProfile } from '../../app/services/profile/CreateProfile';
import { GetClientById } from '../../app/services/client/GetClientById';

import axios from 'axios';

const router = new Router();

type CreateProfileRequestBody = {
  role: string;
  costperhour: number;
  hourAssignment: number;
  tariffId: number;
};

router.get('/api/profiles/:clientId', async (ctx) => {
  try {
    const clientId = parseInt(ctx.params.clientId, 10);
    const getClientById = new GetClientById();
    const client = await getClientById.execute(clientId);

    if (!client) {
      ctx.status = 404;
      ctx.body = { error: 'Client not found' };
      return;
    }

    const token = 'SOME-VALUE';
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.get(
      `https://tarificador.free.beeceptor.com/profiles/${client.rut_empresa}`,
      { headers }
    );
    if (response.status !== 200) {
      ctx.status = 500;
      ctx.body = { error: 'An error occurred while getting profiles.' };
    }

    ctx.status = 200;
    ctx.body = response.data;
  } catch (error) {
    console.log('Error getting profiles from app.beeceptor');
    ctx.status = 200;
    const perfiles = [
      {
        id: 1,
        role: 'Desarrollador backend',
        costpermonth: 180,
        hourAssignment: 100
      },
      {
        id: 2,
        role: 'Diseñador',
        costpermonth: 120,
        hourAssignment: 100
      },
      {
        id: 3,
        role: 'Tester',
        costpermonth: 150,
        hourAssignment: 100
      },
      {
        id: 4,
        role: 'Desarrollador frontend',
        costpermonth: 189,
        hourAssignment: 100
      },
      {
        id: 5,
        role: 'Arquitecto',
        costpermonth: 80,
        hourAssignment: 100
      },
      {
        id: 6,
        role: 'Scrum master',
        costpermonth: 140,
        hourAssignment: 100
      },
      {
        id: 7,
        role: 'Desarrollador full stack',
        costpermonth: 180,
        hourAssignment: 100
      },
      {
        id: 8,
        role: 'Product owner',
        costpermonth: 90,
        hourAssignment: 100
      }
    ];
    ctx.body = perfiles;
  }
});

router.post('/api/profiles', async (ctx) => {
  try {
    const requestBody = ctx.request.body as CreateProfileRequestBody;
    if (
      !requestBody?.role ||
      !requestBody?.costperhour ||
      !requestBody.hourAssignment ||
      !requestBody.tariffId
    ) {
      ctx.status = 400; // Bad Request status code
      ctx.body = { error: 'Request body is missing required fields.' };
      return;
    }

    const createProfile = new CreateProfile();
    const newProfile = await createProfile.execute(
      requestBody.role,
      requestBody.costperhour,
      requestBody.hourAssignment,
      requestBody.tariffId
    );

    ctx.status = 201;
    ctx.body = newProfile;

    console.log('Profile has been saved. Profile id is', newProfile.id);
  } catch (error) {
    console.error('Error creating and saving profile:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while creating the profile.' };
  }
});

module.exports = router;
