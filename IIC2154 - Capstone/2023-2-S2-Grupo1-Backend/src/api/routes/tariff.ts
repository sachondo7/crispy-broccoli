import Router from 'koa-router';
import { CreateTariff } from '../../app/services/Tariff/CreateTariff';
import { DeleteTariff } from '../../app/services/Tariff/DeleteTariff';
import { GetTariffById } from '../../app/services/Tariff/GetTariffById';
import { GetTariffs } from '../../app/services/Tariff/GetTariffs';
import { UpdateTariff } from '../../app/services/Tariff/UpdateTariff';
import { UpdatePrices } from '../../app/services/Tariff/UpdatePrices';

const router = new Router();

type CreateTariffRequestBody = {
  currency: string;
  priceWhitDeduction: number;
  grossPrice: number;
  quoteId: number;
  proyectDuration: number;
  risk: string;
  otherCosts: number;
  serviceId: number;
};

router.post('/api/tariffs', async (ctx) => {
  try {
    const requestBody = ctx.request.body as CreateTariffRequestBody;
    if (
      !requestBody?.currency ||
      !requestBody.quoteId ||
      !requestBody.proyectDuration ||
      !requestBody.risk ||
      !requestBody.serviceId
    ) {
      ctx.status = 400; // Bad Request status code
      ctx.body = { error: 'Request body is missing required fields.' };
      return;
    }

    if (!requestBody.otherCosts) {
      requestBody.otherCosts = 0;
    }

    const diccionarioRiskNumber = {
      Bajo: 10,
      Medio: 20,
      Alto: 30,
      'Sin Riesgo': 0
    };

    const createTariff = new CreateTariff();
    const newTariff = await createTariff.execute(
      requestBody.currency,
      requestBody.quoteId,
      requestBody.proyectDuration,
      diccionarioRiskNumber[requestBody.risk],
      requestBody.otherCosts,
      requestBody.serviceId
    );

    ctx.status = 201;
    ctx.body = newTariff;

    console.log('Tariff has been saved. Tariff id is', newTariff.id);
  } catch (error) {
    console.error('Error creating and saving tariff:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while creating the tariff.' };
  }
});

router.get('/api/tariffs/:id', async (ctx) => {
  try {
    const tariffId = parseInt(ctx.params.id, 10); // Parse the tariff ID from the route parameter
    const getTariffById = new GetTariffById();
    const tariff = await getTariffById.execute(tariffId);

    if (tariff) {
      ctx.status = 200; // OK status code (tariff found)
      ctx.body = tariff;
    } else {
      ctx.status = 404; // Not Found status code (tariff not found)
      ctx.body = { error: 'Tariff not found' };
    }
  } catch (error) {
    console.error('Error retrieving tariff:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while retrieving the tariff.' };
  }
});

router.get('/api/tariffs', async (ctx) => {
  try {
    const getAllTariffs = new GetTariffs();
    const tariffs = await getAllTariffs.execute();

    ctx.status = 200; // OK status code
    ctx.body = tariffs;
  } catch (error) {
    console.error('Error retrieving tariffs:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while retrieving tariffs.' };
  }
});

router.put('/api/tariffs/:id', async (ctx) => {
  try {
    const tariffId = parseInt(ctx.params.id, 10);
    const updatedData = ctx.request.body;
    const updateTariff = new UpdateTariff();
    const updatedTariff = await updateTariff.execute(tariffId, updatedData);

    if (updatedTariff) {
      ctx.status = 200;
      console.log('Tariff has been updated');
      ctx.body = updatedTariff;
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Tariff not found' };
    }
  } catch (error) {
    console.error('Error updating tariff:', error);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while updating the tariff.' };
  }
});

router.delete('/api/tariffs/:id', async (ctx) => {
  try {
    const tariffId = parseInt(ctx.params.id, 10); // Parse the tariff ID from the route parameter
    const deleteTariff = new DeleteTariff();
    const tariffDeleted = await deleteTariff.execute(tariffId);

    if (tariffDeleted) {
      ctx.status = 204; // No Content status code (successful deletion)
      console.log('Tariff has been deleted');
    } else {
      ctx.status = 404; // Not Found status code (tariff not found)
      ctx.body = { error: 'Tariff not found' };
    }
  } catch (error) {
    console.error('Error deleting tariff:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while deleting the tariff.' };
  }
});

router.get('/api/tariffs/updatePrice/:id', async (ctx) => {
  const tariffId = parseInt(ctx.params.id, 10);
  const updatePrices = new UpdatePrices();
  const updatedTariff = await updatePrices.execute(tariffId);
  ctx.body = updatedTariff;
});

module.exports = router;
