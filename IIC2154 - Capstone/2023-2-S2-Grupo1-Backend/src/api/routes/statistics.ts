import Router from 'koa-router';
import { GetQuoteStatistics } from '../../app/services/quote/GetQuoteStatistics';
import axios from 'axios';

const router = new Router();

router.get('/api/statistics', async (ctx) => {
  const clientId = ctx.request.query.clientId
    ? (ctx.request.query.clientId as string)
    : undefined;
  const userId = ctx.request.query.userId
    ? (ctx.request.query.userId as string)
    : undefined;
  const serviceId = ctx.request.query.serviceId
    ? (ctx.request.query.serviceId as string)
    : undefined;
  const startDate = ctx.request.query.startDate
    ? new Date(ctx.request.query.startDate as string)
    : undefined;
  const endDate = ctx.request.query.endDate
    ? new Date(ctx.request.query.endDate as string)
    : undefined;

  const getAllQuotes = new GetQuoteStatistics();
  const quotes = await getAllQuotes.execute();

  let client;
  if (clientId) {
    const respuesta = await axios.get(
      `http://localhost:3000/api/clients/${clientId}`
    );
    client = respuesta.data;
  }

  const filteredQuotes = quotes.filter((quote) => {
    if (clientId && !(client.rut_empresa === quote.clientId.rut_empresa)) {
      return false;
    }

    if (
      serviceId &&
      !(parseInt(serviceId, 10) === quote.tariffId.serviceId.id)
    ) {
      return false;
    }

    if (userId && !(parseInt(userId, 10) === quote.userId.id)) {
      return false;
    }

    if (startDate && new Date(quote.updateDate) <= new Date(startDate)) {
      return false;
    }

    if (endDate && new Date(quote.updateDate) >= new Date(endDate)) {
      return false;
    }

    return true;
  });

  const statistics = {
    enviada: 0,
    enviadaUF: 0,
    adjudicado: 0,
    adjudicadoUF: 0,
    perdido: 0,
    perdidoUF: 0,
    emitida: 0,
    emitidaUF: 0,
    negociada: 0,
    negociadaUF: 0,
    graficoFecha: {
      Enviadas: [],
      Adjudicadas: [],
      Perdidas: [],
      Emitidas: [],
      Negociadas: [],
      Fechas: []
    }
  };

  if (filteredQuotes.length === 0) {
    ctx.body = statistics;
    return;
  }

  const firstDate = startDate ? startDate : filteredQuotes[0].updateDate;
  const lastDate = endDate
    ? endDate
    : filteredQuotes[filteredQuotes.length - 1].updateDate;

  const currentDate = new Date(firstDate);
  currentDate.setHours(0, 0, 0, 0);
  lastDate.setHours(0, 0, 0, 0);

  while (currentDate <= new Date(lastDate)) {
    const date = new Date(currentDate);
    const formattedDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });

    if (!statistics.graficoFecha.Fechas.includes(formattedDate)) {
      statistics.graficoFecha.Fechas.push(formattedDate);
      statistics.graficoFecha.Enviadas.push(0);
      statistics.graficoFecha.Adjudicadas.push(0);
      statistics.graficoFecha.Perdidas.push(0);
      statistics.graficoFecha.Emitidas.push(0);
      statistics.graficoFecha.Negociadas.push(0);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  filteredQuotes.forEach((quote) => {
    if (
      quote.tariffId &&
      quote.tariffId.priceWhitDeduction !== null &&
      quote.status
    ) {
      const date = new Date(quote.updateDate);
      const formattedDate = date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short'
      });
      const index = statistics.graficoFecha.Fechas.indexOf(formattedDate);
      switch (quote.status) {
        case 'Enviada':
          statistics.enviada += 1;
          statistics.enviadaUF += quote.tariffId.priceWhitDeduction;

          while (statistics.graficoFecha.Enviadas.length < index + 1) {
            statistics.graficoFecha.Enviadas.push(0);
          }

          statistics.graficoFecha.Enviadas[index] += 1;

          break;
        case 'Adjudicado':
          statistics.adjudicado += 1;
          statistics.adjudicadoUF += quote.tariffId.priceWhitDeduction;

          while (statistics.graficoFecha.Adjudicadas.length < index + 1) {
            statistics.graficoFecha.Adjudicadas.push(0);
          }

          statistics.graficoFecha.Adjudicadas[index] += 1;
          break;
        case 'Perdido':
          statistics.perdido += 1;
          statistics.perdidoUF += quote.tariffId.priceWhitDeduction;

          while (statistics.graficoFecha.Perdidas.length < index + 1) {
            statistics.graficoFecha.Perdidas.push(0);
          }

          statistics.graficoFecha.Perdidas[index] += 1;
          break;
        case 'Negociada':
          statistics.negociada += 1;
          statistics.negociadaUF += quote.tariffId.priceWhitDeduction;

          while (statistics.graficoFecha.Negociadas.length < index + 1) {
            statistics.graficoFecha.Negociadas.push(0);
          }

          statistics.graficoFecha.Negociadas[index] += 1;
          break;
        default:
          statistics.emitida += 1;
          statistics.emitidaUF += quote.tariffId.priceWhitDeduction;

          while (statistics.graficoFecha.Emitidas.length < index + 1) {
            statistics.graficoFecha.Emitidas.push(0);
          }

          statistics.graficoFecha.Emitidas[index] += 1;
          break;
      }
    }
  });

  ctx.body = statistics;
});

module.exports = router;
