import Router from 'koa-router';
import { CreateDeduction } from '../../app/services/deduction/CreateDeduction';
import { UpdateDeduction } from '../../app/services/deduction/UpdateDeduction';

const router = new Router();

type CreateDeductionRequestBody = {
  authorization: boolean;
  percentage: number;
  userId: number;
  tariffId: number;
  type: string;
};

router.post('/api/deduction', async (ctx) => {
  try {
    const requestBody = ctx.request.body as CreateDeductionRequestBody;

    if (!requestBody.userId) {
      ctx.status = 400; // Bad Request status code
      ctx.body = { error: 'Request body is missing required fields.' };
      return;
    }

    // Validar que requestBody.percentage sea un número válido
    if (
      typeof requestBody.percentage !== 'number' ||
      isNaN(requestBody.percentage)
    ) {
      ctx.status = 400; // Bad Request status code
      ctx.body = { error: 'Percentage must be a valid number.' };
      return;
    }

    if (
      (requestBody.percentage > 7 && requestBody.type === 'KAM') ||
      (requestBody.percentage > 15 && requestBody.type === 'administrator')
    ) {
      requestBody.authorization = false;
    } else {
      requestBody.authorization = true;
    }

    // Validar que requestBody.userId sea un número entero
    if (!Number.isInteger(requestBody.userId)) {
      ctx.status = 400; // Bad Request status code
      ctx.body = { error: 'userId must be an integer.' };
      return;
    }

    const createDeduction = new CreateDeduction();
    const newDeduction = await createDeduction.execute(
      requestBody.authorization,
      requestBody.percentage,
      requestBody.userId,
      requestBody.tariffId
    );

    ctx.status = 201;
    ctx.body = newDeduction;

    console.log('Deduction has been saved. Deduction id is', newDeduction.id);
  } catch (error) {
    console.error('Error creating and saving deduction:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while creating the deduction.' };
  }
});

router.put('/api/deductions/:id', async (ctx) => {
  try {
    const deductionId = parseInt(ctx.params.id, 10);
    const updatedData = ctx.request.body;

    const updateDeduction = new UpdateDeduction();
    const updatedDeduction = await updateDeduction.execute(
      deductionId,
      updatedData
    );

    if (updatedDeduction) {
      ctx.status = 200;
      console.log("Deduction's data has been updated");
      ctx.body = updatedDeduction;
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Deduction not found' };
    }
  } catch (error) {
    console.error('Error updating deduction:', error);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while updating the deduction.' };
  }
});

module.exports = router;
