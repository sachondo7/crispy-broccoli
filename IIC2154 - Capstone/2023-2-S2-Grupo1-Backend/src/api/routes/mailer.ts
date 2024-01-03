import Router from 'koa-router';
import { GetQuoteByDaysToExpireMailer } from '../../app/services/quote/GetQuotesToMail';

const router = new Router();

router.get('/quotes/mailer', async (ctx) => {
  try {
    const getAllQuotes = new GetQuoteByDaysToExpireMailer();
    const quotes = await getAllQuotes.execute();

    ctx.status = 200; // OK status code
    ctx.body = quotes;
  } catch (error) {
    console.error('Error retrieving users:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while retrieving users.' };
  }
});

module.exports = router;