import Router from 'koa-router';
import axios from 'axios';
import { GetPricePerMonth } from '../../app/services/profile/GetPricePerMonth';

const router = new Router();

type ShoppingCart = {
  risk: string;
  profiles: Array<[string, number]>;
  discountPercentage: number;
  proyectDuration: number; // En meses
  otherCosts: number; // Costos adicionales no calculables por nosotros
  clientId: number;
};

router.get('/api/risks', async (ctx) => {
  const risks = { 'Sin Riesgo': 0 , Bajo: 10, Medio: 20, Alto: 30};

  ctx.body = risks;
});

router.post('/api/cart', async (ctx) => {
  const risks = { Bajo: 10, Medio: 20, Alto: 30, 'Sin Riesgo': 0 };

  try {
    const requestBody = ctx.request.body as ShoppingCart;

    if (requestBody.clientId === undefined) {
      ctx.body = {
        error: 'The client id is required.'
      };
      ctx.status = 400;
      return;
    }

    let asignaciones = 0;
    let riesgo = -1;
    let mensual = -1;
    let tarifa = -1;
    let descuento = -1;
    let total = -1;

    if (requestBody.profiles !== undefined) {
      console.log('Revisando el carrito');
      const profiles = await axios.get(
        `http://localhost:3000/api/profiles/${requestBody.clientId}`
      );
      for (const [role, number] of requestBody.profiles) {
        const getProfilePrice = new GetPricePerMonth();
        const costperhour = await getProfilePrice.execute(role, profiles.data);
        asignaciones += Math.floor((costperhour * number) / 100);
      }
    }

    if (requestBody.otherCosts !== undefined) {
      asignaciones += requestBody.otherCosts;
    }

    if (requestBody.risk !== undefined) {
      riesgo = Math.floor((asignaciones * risks[requestBody.risk]) / 100);
      mensual = asignaciones + riesgo;
    }

    if (requestBody.discountPercentage === undefined) {
      descuento = 0;
    } else {
      descuento = Math.floor((mensual * requestBody.discountPercentage) / 100);
    }

    if (requestBody.proyectDuration === undefined) {
      tarifa = mensual;
      total = mensual - descuento;
    } else {
      tarifa = mensual * requestBody.proyectDuration;
      total = (mensual - descuento) * requestBody.proyectDuration;
      descuento *= requestBody.proyectDuration;
    }

    const cart = {
      asignaciones,
      riesgo,
      mensual,
      tarifa,
      descuento,
      total
    };

    ctx.body = cart;
    ctx.status = 200;
  } catch (error) {
    console.error('Error while calculating cart:', error);
    ctx.status = 500;
    ctx.body = {
      error: 'An error occurred while while the costs were being calculated.'
    };
  }
});
module.exports = router;
