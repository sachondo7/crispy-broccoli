import Router from 'koa-router';
import axios from 'axios';
import { CreateQuote } from '../../app/services/quote/CreateQuote';
import { DeleteQuote } from '../../app/services/quote/DeleteQuote';
import { GetQuoteById } from '../../app/services/quote/GetQuoteById';
import { GetQuotes } from '../../app/services/quote/GetQuotes';
import { UpdateQuote } from '../../app/services/quote/UpdateQuote';
import { GetQuoteByDaysToExpire } from '../../app/services/quote/GetQuotesByDaysToExpire';
import { GetQuoteByUserId } from '../../app/services/quote/GetQuoteByUserId';
import { GetQuotesFilters } from '../../app/services/quote/GetQuotesFilter';
import { AsignedTarrifToQuote } from '../../app/services/quote/AsignedTarrifToQuote';
import { UpdatePrices } from '../../app/services/Tariff/UpdatePrices';
import { EliminateProfiles } from '../../app/services/Tariff/EliminateProfiles';
import { GetUserById } from '../../app/services/user/GetUserById';
import { GetPricePerMonth } from '../../app/services/profile/GetPricePerMonth';
import { GetServiceId } from '../../app/services/service/GetServiceId';
import { GetClientId } from '../../app/services/client/GetClientId';

const router = new Router();

type CreateQuoteRequestBody = {
  endDate: Date;
  deliveryDate: Date;
  status: string;
  idProyecto: string;
  userId: number;
  clientId: number;
  contactId: number;
};

type NewQuoteRequestBody = {
  clientId: number;
  contactId: number; // Id contacto
  idProyecto: string;
  risk: string;
  perfiles: Array<[string, number]>;
  porcentajeDescuento: number;
  proyectDuration: number; // En meses
  userId: number;
  currency: string;
  service: number; // Id servicio
  otherCosts: number; // Costos adicionales no calculables por nosotros
  endDate: Date;
  deliveryDate: Date;
  status: string;
};

router.post('/api/quotes/create', async (ctx) => {
  try {
    const requestBody = ctx.request.body as CreateQuoteRequestBody;
    if (
      !requestBody.endDate ||
      !requestBody.status ||
      !requestBody?.idProyecto ||
      !requestBody.userId ||
      !requestBody.clientId
    ) {
      ctx.status = 400; // Bad Request status code
      ctx.body = { error: 'Request body is missing required fields.' };
      return;
    }

    const startDate = new Date();
    const updateDate = new Date();

    let deliveryDate;
    if (!requestBody.deliveryDate) {
      const deliveryDate = new Date();
      deliveryDate.setDate(startDate.getDate() + 60);
    } else {
      deliveryDate = requestBody.deliveryDate;
    }

    const createQuote = new CreateQuote();
    const newQuote = await createQuote.execute(
      startDate,
      requestBody.endDate,
      deliveryDate,
      updateDate,
      requestBody.status,
      requestBody.idProyecto,
      requestBody.userId,
      requestBody.clientId,
      requestBody.contactId
    );

    ctx.status = 201;
    ctx.body = { quoteId: newQuote.id };

    console.log('Quote has been saved. Quote id is', newQuote.id);
  } catch (error) {
    console.error('Error creating and saving quote:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while creating the quote.' };
  }
});

router.get('/api/quotes/:id', async (ctx) => {
  try {
    const quoteId = parseInt(ctx.params.id, 10); // Parse the quote ID from the route parameter
    const getQuoteById = new GetQuoteById();
    const quote = await getQuoteById.execute(quoteId);

    if (quote) {
      ctx.status = 200; // OK status code (quote found)
      ctx.body = quote;
    } else {
      ctx.status = 404; // Not Found status code (quote not found)
      ctx.body = { error: 'Quote not found' };
    }
  } catch (error) {
    console.error('Error retrieving quote:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while retrieving the quote.' };
  }
});

router.get('/api/quotes', async (ctx) => {
  try {
    const getAllQuotes = new GetQuotes();
    const quotes = await getAllQuotes.execute();

    ctx.status = 200; // OK status code
    ctx.body = quotes;
  } catch (error) {
    console.error('Error retrieving quotes:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while retrieving quotes.' };
  }
});

router.get('/api/quotes/searchHistory/:user_id', async (ctx) => {
  try {
    const userId = parseInt(ctx.params.user_id, 10);
    const getAllQuotes = new GetQuoteByUserId();
    const quotes = await getAllQuotes.execute(userId);

    ctx.status = 200; // OK status code
    ctx.body = quotes;
  } catch (error) {
    console.error('Error retrieving quotes:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while retrieving quotes.' };
  }
});

router.post('/api/quotes/filters/:user_id', async (ctx) => {
  try {
    const userId = parseInt(ctx.params.user_id, 10);
    const updatedData = ctx.request.body;

    const getQuotesByFilters = new GetQuotesFilters();
    const quotes = await getQuotesByFilters.execute(userId, updatedData);

    ctx.status = 200; // OK status code
    ctx.body = quotes;
  } catch (error) {
    console.error('Error retrieving quotes:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while retrieving quotes.' };
  }
});

// eslint-disable-next-line complexity
router.post('/api/quotes', async (ctx) => {
  const requestBody = ctx.request.body as NewQuoteRequestBody;
  if (
    !requestBody.clientId ||
    //! requestBody.contactId ||
    !requestBody.idProyecto ||
    !requestBody.risk ||
    //! requestBody.porcentajeDescuento ||
    !requestBody.proyectDuration ||
    !requestBody.userId
  ) {
    ctx.status = 400; // Bad Request status code
    ctx.body = {
      error:
        'Request body is missing required fields. You are missing:' +
        JSON.stringify(requestBody) +
        ' ' +
        !requestBody.clientId +
        ' ' +
        !requestBody.idProyecto +
        ' ' +
        !requestBody.risk +
        ' ' +
        !requestBody.proyectDuration +
        ' ' +
        !requestBody.userId
    };

    return;
  }

  if (
    requestBody.porcentajeDescuento < 0 ||
    requestBody.porcentajeDescuento > 100
  ) {
    ctx.status = 400; // Bad Request status code
    ctx.body = { error: 'Porcentaje de descuento inválido.' };
    return;
  }

  if (requestBody.proyectDuration < 0) {
    ctx.status = 400; // Bad Request status code
    ctx.body = { error: 'Duración de proyecto inválida.' };
    return;
  }

  let endDate;
  // Si es que no se entrego una fecha de cierre se calcula la fecha de finalización (endDate) sumando la duración (proyectDuration) a la fecha actual
  if (!requestBody.endDate) {
    const currentDate = new Date();
    endDate = new Date(
      currentDate.getTime() +
        requestBody.proyectDuration * 30 * 24 * 60 * 60 * 1000
    );
  } else {
    endDate = requestBody.endDate;
  }

  let { status } = requestBody;
  if (status === null || status === undefined) {
    status = 'Emitida';
  }

  const getUserById = new GetUserById();
  const user = await getUserById.execute(requestBody.userId);

  if (
    (requestBody.porcentajeDescuento > 7 && user.type === 'KAM') ||
    (requestBody.porcentajeDescuento > 15 && user.type === 'administrator')
  ) {
    status = 'Por autorizar';
  }

  const getClientId = new GetClientId();
  const clientId = await getClientId.execute(requestBody.clientId);
  const initialClientId = requestBody.clientId;
  requestBody.clientId = clientId;

  const newRequestBody = {
    ...requestBody,
    status,
    endDate
  };
  let quoteId;
  requestBody.clientId = initialClientId;

  try {
    // Envía una solicitud POST a /api/quotes con el nuevo requestBody
    const response = await axios.post(
      'http://localhost:3000/api/quotes/create',
      newRequestBody
    );
    if (response.status !== 201 && response.status !== 200) {
      ctx.status = 500;
      ctx.body = { error: 'An error occurred while creating the quote.' };
      return;
    }

    quoteId = response.data.quoteId;
  } catch (error) {
    console.error('Error creating quote:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while creating the quote.' };
    return;
  }

  let tariffId;
  const actualNumberService = -1;
  const getServiceId = new GetServiceId();
  const quoteServiceId = await getServiceId.execute(
    requestBody.service,
    requestBody.clientId,
    actualNumberService
  );
  try {
    const newTariffBody = {
      currency: requestBody.currency,
      quoteId,
      proyectDuration: requestBody.proyectDuration,
      risk: requestBody.risk,
      otherCosts: requestBody.otherCosts,
      serviceId: quoteServiceId
    };
    const response = await axios.post(
      'http://localhost:3000/api/tariffs',
      newTariffBody
    );
    if (response.status !== 201) {
      await axios.delete(`http://localhost:3000/api/quotes/${quoteId}`);
      throw new Error(
        'An error occurred while creating the tariff of the quote.'
      );
    }

    tariffId = response.data.id;
  } catch (error) {
    console.error('Error creating tariff:', error);
    ctx.status = 500;
    ctx.body = {
      error: 'An error occurred while creating the tariff of the quote.'
    };
    return;
  }

  const asignedTarrifToQuoteInstance = new AsignedTarrifToQuote();
  await asignedTarrifToQuoteInstance.execute(tariffId, quoteId);

  let porcentajeDescuento = 0;

  if (requestBody.porcentajeDescuento) {
    porcentajeDescuento = requestBody.porcentajeDescuento;
  }

  let deductionId;
  try {
    const newDeductionBody = {
      percentage: porcentajeDescuento,
      userId: requestBody.userId,
      quoteId,
      tariffId,
      type: user.type
    };
    const response = await axios.post(
      'http://localhost:3000/api/deduction',
      newDeductionBody
    );
    if (response.status !== 201) {
      await axios.delete(`http://localhost:3000/api/quotes/${quoteId}`);
      await axios.delete(`http://localhost:3000/api/tariffs/${tariffId}`);
      throw new Error(
        'An error occurred while creating the deduction of the quote.'
      );
    }

    deductionId = response.data.id;
  } catch (error) {
    console.error('Error creating deduction:', error);
    ctx.status = 500;
    ctx.body = {
      error: 'An error occurred while creating the deduction of the quote.'
    };
    return;
  }

  if (requestBody.perfiles) {
    const profiles = await axios.get(
      `http://localhost:3000/api/profiles/${requestBody.clientId}`
    );
    // eslint-disable-next-line guard-for-in, @typescript-eslint/no-for-in-array
    for (const profile in requestBody.perfiles) {
      const value = requestBody.perfiles[profile][1];
      const key = requestBody.perfiles[profile][0];
      const getProfilePrice = new GetPricePerMonth();
      const costperhour = await getProfilePrice.execute(key, profiles.data);
      const newProfileBody = {
        role: key,
        costperhour,
        hourAssignment: value,
        tariffId
      };

      try {
        const response = await axios.post(
          'http://localhost:3000/api/profiles',
          newProfileBody
        );

        if (response.status !== 201 && response.status !== 200) {
          throw new Error(
            `An error occurred while creating the profile ${key} of the quote.`
          );
        }
      } catch (error) {
        console.error('Error creating profiles:', error);
        ctx.status = 500;
        ctx.body = {
          error: 'An error occurred while creating the profiles of the tariff.'
        };
        return;
      }
    }
  }

  const updatePrices = new UpdatePrices();
  await updatePrices.execute(tariffId);

  ctx.status = 201;
  ctx.body = { quoteId, tariffId };
});

router.put('/api/quotes/:id', async (ctx) => {
  try {
    const quoteId = parseInt(ctx.params.id, 10);
    const updatedData = ctx.request.body;
    const updateQuote = new UpdateQuote();
    const updatedQuote = await updateQuote.execute(quoteId, updatedData);

    if (updatedQuote) {
      ctx.status = 200;
      console.log('Quote has been updated');
      ctx.body = updatedQuote;
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Quote not found' };
    }
  } catch (error) {
    console.error('Error updating quote:', error);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while updating the quote.' };
  }
});

router.delete('/api/quotes/:id', async (ctx) => {
  try {
    const quoteId = parseInt(ctx.params.id, 10);
    const deleteQuote = new DeleteQuote();
    const quoteDeleted = await deleteQuote.execute(quoteId);

    if (quoteDeleted) {
      ctx.status = 204; // No Content status code (successful deletion)
      console.log('Quote has been deleted');
      ctx.body = { message: 'Quote has been deleted' };
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Quote not found' };
    }
  } catch (error) {
    console.error('Error deleting quote:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while deleting the quote.' };
  }
});

router.get('/api/quotes/expire/:userId/:days', async (ctx) => {
  try {
    const days = parseInt(ctx.params.days, 10); // Parse the days from the route parameter
    const userId = parseInt(ctx.params.userId, 10); // Parse the user ID from the route parameter
    const getQuoteByDaysToExpireInstance = new GetQuoteByDaysToExpire();
    const quotes = await getQuoteByDaysToExpireInstance.execute(days, userId);

    if (quotes) {
      ctx.status = 200; // OK status code (quotes found)
      ctx.body = quotes;
    } else {
      ctx.status = 404; // Not Found status code (quotes not found)
      ctx.body = { error: 'Quotes not found' };
    }
  } catch (error) {
    console.error('Error retrieving quotes:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while retrieving quotes.' };
  }
});

// eslint-disable-next-line complexity
router.post('/api/quotes/update/:id', async (ctx) => {
  const quoteId = parseInt(ctx.params.id, 10);
  const requestBody = ctx.request.body as NewQuoteRequestBody;

  const getQuoteById = new GetQuoteById();
  const quote = await getQuoteById.execute(quoteId);

  if (!quote) {
    ctx.status = 404; // Not Found status code (quote not found)
    ctx.body = { error: 'Quote not found' };
    return;
  }

  if (
    (requestBody.porcentajeDescuento < 0 ||
      requestBody.porcentajeDescuento > 100) &&
    requestBody.porcentajeDescuento !== undefined
  ) {
    ctx.status = 400; // Bad Request status code
    ctx.body = { error: 'Porcentaje de descuento inválido.' };
    return;
  }

  if (
    requestBody.risk !== 'Bajo' &&
    requestBody.risk !== 'Medio' &&
    requestBody.risk !== 'Alto' &&
    requestBody.risk !== 'Sin Riesgo' &&
    requestBody.risk !== undefined
  ) {
    ctx.status = 400; // Bad Request status code
    ctx.body = { error: 'Riesgo inválido.' };
    return;
  }

  if (
    requestBody.proyectDuration < 0 &&
    requestBody.proyectDuration !== undefined
  ) {
    ctx.status = 400; // Bad Request status code
    ctx.body = { error: 'Duración de proyecto inválida.' };
    return;
  }

  let { status } = requestBody;
  if (status === null || status === undefined) {
    status = 'Actualizada';
  }

  if (!requestBody.clientId && (requestBody.perfiles || requestBody.service)) {
    ctx.status = 400; // Bad Request status code
    ctx.body = {
      error:
        'Request body is missing required fields. You are missing ClientId:'
    };

    return;
  }

  if (!requestBody.userId && requestBody.porcentajeDescuento) {
    ctx.status = 400; // Bad Request status code
    ctx.body = {
      error: 'Request body is missing required fields. You are missing UserId:'
    };

    return;
  }

  const getUserById = new GetUserById();
  const user = await getUserById.execute(requestBody.userId);

  if (
    (requestBody.porcentajeDescuento <= 7 && user.type === 'KAM') ||
    (requestBody.porcentajeDescuento <= 15 && user.type === 'administrator')
  ) {
    status = 'Por autorizar';
  }

  if (requestBody.clientId !== undefined) {
    const getClientId = new GetClientId();
    const clientId = await getClientId.execute(requestBody.clientId);
    requestBody.clientId = clientId;
  }


  const updateDate = new Date();

  const newupdateQuoteBody = {
    ...requestBody,
    status,
    updateDate
  };

  try {
    // Envía una solicitud POST a /api/quotes con el nuevo requestBody
    const response = await axios.put(
      `http://localhost:3000/api/quotes/${quoteId}`,
      newupdateQuoteBody
    );
    if (response.status !== 200) {
      ctx.status = 500;
      ctx.body = { error: 'An error occurred while updating the quote.' };
    }
  } catch (error) {
    console.error('Error updating quote:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while updating the quote.' };
  }

  const diccionarioRiskNumber = {
    Bajo: 10,
    Medio: 20,
    Alto: 30,
    'Sin Riesgo': 0
  };
  let riesgo = null;
  if (requestBody.risk !== null) {
    riesgo = diccionarioRiskNumber[requestBody.risk];
  }

  let quoteServiceId = quote.tariffId.serviceId.id;
  if (requestBody.service !== undefined) {
    const getServiceId = new GetServiceId();
    quoteServiceId = await getServiceId.execute(
      requestBody.service,
      requestBody.clientId,
      quote.tariffId.serviceId.id
    );
  }

  try {
    const newUpdatedTariffBody = {
      currency: 'UF',
      quoteId,
      proyectDuration: requestBody.proyectDuration,
      risk: riesgo,
      otherCosts: requestBody.otherCosts,
      serviceId: quoteServiceId
    };
    const response = await axios.put(
      `http://localhost:3000/api/tariffs/${quote.tariffId.id}`,
      newUpdatedTariffBody
    );
    if (response.status !== 200) {
      throw new Error(
        'An error occurred while updating the tariff of the quote.'
      );
    }
  } catch (error) {
    console.error('Error updating tariff:', error);
    ctx.status = 500;
    ctx.body = {
      error: 'An error occurred while updating the tariff of the quote.'
    };
    return;
  }

  if (
    requestBody.porcentajeDescuento >= 0 &&
    requestBody.porcentajeDescuento !== undefined
  ) {
    try {
      let authorization = true;
      if (
        (requestBody.porcentajeDescuento > 7 && user.type === 'KAM') ||
        (requestBody.porcentajeDescuento > 15 && user.type === 'administrator')
      ) {
        authorization = false;
      }

      const newUpdatedDeductionBody = {
        percentage: requestBody.porcentajeDescuento,
        userId: quote.userId.id,
        tariffId: quote.tariffId.id,
        authorization
      };
      const response = await axios.put(
        `http://localhost:3000/api/deductions/${quote.tariffId.deductions[0].id}`,
        newUpdatedDeductionBody
      );
      if (response.status !== 200) {
        throw new Error(
          'An error occurred while updating the deduction of the quote.'
        );
      }
    } catch (error) {
      console.error('Error updating deduction:', error);
      ctx.status = 500;
      ctx.body = {
        error: 'An error occurred while updating the deduction of the quote.'
      };
      return;
    }
  }

  if (requestBody.perfiles) {
    const eliminateProfiles = new EliminateProfiles();
    await eliminateProfiles.execute(quote.tariffId.id);
    const profiles = await axios.get(
      `http://localhost:3000/api/profiles/${requestBody.clientId}`
    );
    // eslint-disable-next-line guard-for-in
    for (const profile in requestBody.perfiles) {
      const value = requestBody.perfiles[profile][1];
      const key = requestBody.perfiles[profile][0];
      const getProfilePrice = new GetPricePerMonth();
      const costperhour = await getProfilePrice.execute(key, profiles.data);
      const newProfileBody = {
        role: key,
        costperhour,
        hourAssignment: value,
        tariffId: quote.tariffId.id
      };

      try {
        const response = await axios.post(
          'http://localhost:3000/api/profiles',
          newProfileBody
        );

        if (response.status !== 201) {
          throw new Error(
            `An error occurred while creating the profile ${key} of the quote.`
          );
        }
      } catch (error) {
        console.error('Error creating profiles:', error);
        ctx.status = 500;
        ctx.body = {
          error: 'An error occurred while creating the profiles of the tariff.'
        };
        return;
      }
    }
  }

  const updatePrices = new UpdatePrices();
  await updatePrices.execute(quote.tariffId.id);

  const quote2 = await getQuoteById.execute(quoteId);

  ctx.status = 200;
  ctx.body = quote2;
});

module.exports = router;
