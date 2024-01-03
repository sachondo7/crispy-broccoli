import Router from 'koa-router';
import bcrypt from 'bcrypt';
import { CreateUser } from '../../app/services/user/CreateUser';
import { GetUserById } from '../../app/services/user/GetUserById';
import { UpdateUser } from '../../app/services/user/UpdateUser';
import { DeleteUser } from '../../app/services/user/DeleteUser';
import { UpdateDeduction } from '../../app/services/deduction/UpdateDeduction';
import { UpdatePrices } from '../../app/services/Tariff/UpdatePrices';
import { GetQuotesToAceptDeductionAdmin } from '../../app/services/quote/GetQuotesToAceptDeductionAdmin';
import { UpdateUserToQuote } from '../../app/services/quote/UpdateUserToQuote';
import { checkAdminPermission } from '../middlewares/adminPermissionMiddleware';
import { GetQuoteToReasigne } from '../../app/services/quote/GetQuoteToReasigne';
import { ReasignStatus } from '../../app/services/Tariff/ReasignStatus';

const router = new Router();

type CreateUserRequestBody = {
  name: string;
  email: string;
  password: string;
  type: string;
};

type UpdateDeductionAuthorizationRequestBody = {
  authorization: boolean;
  percentage: number;
};

type UpdateUserQuoteRequestBody = {
  userId: number;
  quoteId: number;
};

router.post('/admin/create_user/:userId', checkAdminPermission, async (ctx) => {
  try {
    const requestBody = ctx.request.body as CreateUserRequestBody;
    if (!requestBody?.name || !requestBody.email || !requestBody.password) {
      ctx.status = 400; // Bad Request status code
      ctx.body = { error: 'Request body is missing required fields.' };
      return;
    }

    const passwordHash = await bcrypt.hash(requestBody.password, 5);

    const createUser = new CreateUser();
    const newUser = await createUser.execute(
      requestBody.name,
      requestBody.email,
      passwordHash,
      requestBody.type
    );

    ctx.status = 201;
    ctx.body = newUser;

    console.log('User has been saved. User id is', newUser.id);
  } catch (error) {
    console.error('Error creating and saving user:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while creating the user.' };
  }
});

router.put(
  '/admin/block_user/:userId/:id',
  checkAdminPermission,
  async (ctx) => {
    try {
      const userId = parseInt(ctx.params.id, 10);
      const getUserById = new GetUserById();
      const user = await getUserById.execute(userId);

      if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
      }

      if (user.blocked) {
        ctx.status = 409;
        ctx.body = { error: 'User already blocked' };
        return;
      }

      const updatedData = { blocked: true };
      const updateUser = new UpdateUser();
      const updatedUser = await updateUser.execute(userId, updatedData);

      if (updatedUser) {
        ctx.status = 200;
        console.log('User has been blocked');
        ctx.body = updatedUser;
      } else {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
      }
    } catch (error) {
      console.error('Error blocking user:', error);
      ctx.status = 500;
      ctx.body = { error: 'An error occurred while blocking the user.' };
    }
  }
);

router.put(
  '/admin/unblock_user/:userId/:id',
  checkAdminPermission,
  async (ctx) => {
    try {
      const userId = parseInt(ctx.params.id, 10);
      const getUserById = new GetUserById();
      const user = await getUserById.execute(userId);

      if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
      }

      if (!user.blocked) {
        ctx.status = 409;
        ctx.body = { error: 'User already unblocked' };
        return;
      }

      const updatedData = { blocked: false };
      const updateUser = new UpdateUser();
      const updatedUser = await updateUser.execute(userId, updatedData);

      if (updatedUser) {
        ctx.status = 200;
        console.log('User has been unblocked');
        ctx.body = updatedUser;
      } else {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
      ctx.status = 500;
      ctx.body = { error: 'An error occurred while unblocking the user.' };
    }
  }
);

router.delete(
  '/admin/eliminate_user/:userId/:id',
  checkAdminPermission,
  async (ctx) => {
    try {
      const userId = parseInt(ctx.params.id, 10);
      const adminId = parseInt(ctx.params.userId, 10);

      const getUserById = new GetUserById();
      const userToEliminate = await getUserById.execute(userId);
      const admin = await getUserById.execute(adminId);
      if (userToEliminate.type === 'CEO') {
        ctx.status = 403;
        ctx.body = {
          error: 'CEO can not be eliminated'
        };
        return;
      }

      if (userToEliminate.type === 'administrator' && admin.type !== 'CEO') {
        ctx.status = 403;
        ctx.body = {
          error: 'Only CEO can eliminate an administrator'
        };
        return;
      }

      const deleteUser = new DeleteUser();
      const userDeleted = await deleteUser.execute(userId);

      if (userDeleted) {
        ctx.status = 204;
        ctx.body = 'User has been deleted';
        console.log('User has been deleted');
      } else {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      ctx.status = 500;
      ctx.body = { error: 'An error occurred while deleting the user.' };
    }
  }
);

router.get(
  '/admin/accept_discounts/:userId',
  checkAdminPermission,
  async (ctx) => {
    try {
      const userId = parseInt(ctx.params.userId, 10);
      const getUserById = new GetUserById();
      const user = await getUserById.execute(userId);

      const getQuotesByFilters = new GetQuotesToAceptDeductionAdmin();
      const quotes = await getQuotesByFilters.execute(user);

      ctx.status = 200; // OK status code
      ctx.body = quotes;
    } catch (error) {
      console.error('Error retrieving quotes:', error);
      ctx.status = 500; // Internal Server Error status code
      ctx.body = { error: 'An error occurred while retrieving the quotes.' };
    }
  }
);

router.post(
  '/admin/edit_deductions/:userId/:id',
  checkAdminPermission,
  async (ctx) => {
    try {
      const userId = parseInt(ctx.params.userId, 10);
      const getUserById = new GetUserById();
      const user = await getUserById.execute(userId);

      const deductionId = parseInt(ctx.params.id, 10);
      const updatedData = ctx.request
        .body as UpdateDeductionAuthorizationRequestBody;

      if (!updatedData.authorization) {
        ctx.status = 400; // Bad Request status code
        ctx.body = { error: 'Request body is missing authorization field.' };
        return;
      }

      if (updatedData.percentage < 0 || updatedData.percentage > 100) {
        ctx.status = 400; // Bad Request status code
        ctx.body = { error: 'Porcentaje de descuento inválido.' };
        return;
      }

      if (
        updatedData.percentage > 15 &&
        user.type !== 'CEO' &&
        updatedData.authorization
      ) {
        ctx.status = 403;
        ctx.body = {
          message: 'Solo el gerente puede aceptar descuento mayores a un 15%'
        };
        return;
      }

      const updateDeduction = new UpdateDeduction();
      const updatedDeduction = await updateDeduction.execute(
        deductionId,
        updatedData
      );

      if (updatedDeduction) {
        const tariffId = updatedDeduction.tariffId.id;

        const status = 'Emitida';
        const reasignStatus = new ReasignStatus();
        await reasignStatus.execute(tariffId, status);

        const updatePrices = new UpdatePrices();
        const updatedPrices = await updatePrices.execute(tariffId);
        ctx.status = 200; // OK status code (deduction found)
        ctx.body = { updatedDeduction, updatedPrices };
      } else {
        ctx.status = 404; // Not Found status code (deduction not found)
        ctx.body = { error: 'Deduction not found' };
      }
    } catch (error) {
      console.error('Error retrieving deduction:', error);
      ctx.status = 500; // Internal Server Error status code
      ctx.body = { error: 'An error occurred while retrieving the deduction.' };
    }
  }
);

router.post(
  '/admin/reassign_quotes_user/:userId',
  checkAdminPermission,
  async (ctx) => {
    try {
      const updatedData = ctx.request.body as UpdateUserQuoteRequestBody;
      const updateUserToQuote = new UpdateUserToQuote();
      const updatedUserQuote = await updateUserToQuote.execute(
        updatedData.userId,
        updatedData.quoteId
      );

      if (updatedUserQuote) {
        ctx.status = 200;
        console.log('User of quote has been updated');
        ctx.body = updatedUserQuote;
      } else {
        ctx.status = 404;
        ctx.body = { error: 'Quote not found' };
      }
    } catch (error) {
      console.error('Error updating quote:', error);
      ctx.status = 500;
      ctx.body = { error: 'An error occurred while updating the quote.' };
    }
  }
);

router.get(
  '/admin/quotes_to_reassign/:userId',
  checkAdminPermission,
  async (ctx) => {
    try {
      const getQuoteToReasigne = new GetQuoteToReasigne();
      const quotes = await getQuoteToReasigne.execute();

      ctx.status = 200; // OK status code
      ctx.body = quotes;
    } catch (error) {
      console.error('Error retrieving quotes:', error);
      ctx.status = 500; // Internal Server Error status code
      ctx.body = { error: 'An error occurred while retrieving the quotes.' };
    }
  }
);

module.exports = router;
