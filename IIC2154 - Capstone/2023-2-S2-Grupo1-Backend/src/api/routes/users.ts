import Router from 'koa-router';
import { CreateUser } from '../../app/services/user/CreateUser';
import { GetUserByEmail } from '../../app/services/user/GetUserByEmail';
import { GetUserById } from '../../app/services/user/GetUserById';
import { GetUsers } from '../../app/services/user/GetUsers';
import { UpdateUser } from '../../app/services/user/UpdateUser';
import { UpdateUserToken } from '../../app/services/user/UpdateUserToken';
import { RecoverPassword } from '../../app/services/user/RecoverPassword';
import { DeleteUser } from '../../app/services/user/DeleteUser';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

const router = new Router();

type CreateUserRequestBody = {
  name: string;
  email: string;
  password: string;
  type: string;
};

type LoginBody = {
  email: string;
  password: string;
};

type ChangePasswordBody = {
  password: string;
  newPassword: string;
};

type UpdateTokenRequestBody = {
  fcmToken: string;
  userId: number;
};

type RecoverPasswordRequestBody = {
  email: string;
};

router.post('/api/users/login', async (ctx) => {
  try {
    const requestBody = ctx.request.body as LoginBody;

    if (!requestBody.email || !requestBody.password) {
      ctx.status = 400; // Bad Request status code
      ctx.body = { error: 'Request body is missing required fields.' };
      return;
    }

    const getUserByEmailService = new GetUserByEmail();
    const user = await getUserByEmailService.execute(requestBody.email);

    if (user) {
      const condicion = await bcrypt.compare(
        requestBody.password,
        user.passwordHash
      );
      if (condicion) {
        if (user.blocked) {
          ctx.body = { detail: 'Usuario bloqueado' };
          ctx.status = 403;
        } else {
          let respuesta = false;
          if (user.type === 'administrator' || user.type === 'CEO') {
            respuesta = true;
          }

          ctx.response.body = { administrator: respuesta, userId: user.id };
          ctx.status = 200;
        }
      } else {
        ctx.status = 404;
        ctx.body = {
          detail: 'Usuario no encontrado o contraseña incorrecta'
        };
      }
    } else {
      ctx.status = 404;
      ctx.body = { detail: 'Usuario no encontrado o contraseña incorrecta' };
    }
  } catch (error) {
    ctx.throw(error);
    ctx.status = 400;
    ctx.body = {
      detail: 'Ha ocurrido un problema, no se pudo realizar login'
    };
  }
});

router.post('/api/users', async (ctx) => {
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

router.post('/api/users/updateToken', async (ctx) => {
  try {
    const { fcmToken, userId } = ctx.request.body as UpdateTokenRequestBody;
    const updateUser = new UpdateUserToken();
    const updatedUser = await updateUser.execute(fcmToken, userId);

    if (updatedUser) {
      ctx.status = 200;
      console.log('User has been updated');
      ctx.body = updatedUser;
    } else {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    }
  } catch (error) {
    console.error('Error updating user:', error);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while updating the user.' };
  }
});

router.post('/api/users/recoverPassword', async (ctx) => {
  try {
    const { email } = ctx.request.body as RecoverPasswordRequestBody;
    const updateUser = new RecoverPassword();
    const updatedUser = await updateUser.execute(email);

    if (updatedUser) {
      ctx.status = 200;
      console.log('User password has been updated');
      ctx.body = updatedUser;
    } else {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    }
  } catch (error) {
    console.error('Error updating user:', error);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while updating the user password.' };
  }
});

router.get('/api/users/:id', async (ctx) => {
  try {
    const userId = parseInt(ctx.params.id, 10); // Parse the user ID from the route parameter
    const getUserById = new GetUserById();
    const user = await getUserById.execute(userId);

    if (user) {
      ctx.status = 200; // OK status code (user found)
      ctx.body = user;
    } else {
      ctx.status = 404; // Not Found status code (user not found)
      ctx.body = { error: 'User not found' };
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while retrieving the user.' };
  }
});

router.get('/api/users', async (ctx) => {
  try {
    const getAllUsers = new GetUsers();
    const users = await getAllUsers.execute();

    ctx.status = 200; // OK status code
    ctx.body = users;
  } catch (error) {
    console.error('Error retrieving users:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while retrieving users.' };
  }
});

router.put('/api/users/changePassword/:id', async (ctx) => {
  try {
    const userId = parseInt(ctx.params.id, 10);
    const requestBody = ctx.request.body as ChangePasswordBody;
    if (!requestBody.newPassword || !requestBody.password) {
      ctx.status = 400;
      ctx.body = { error: 'Request body is missing required fields.' };
      return;
    }

    const getUserByIdService = new GetUserById();
    const user = await getUserByIdService.execute(userId);

    if (user) {
      const condicion = await bcrypt.compare(
        requestBody.password,
        user.passwordHash
      );
      if (!condicion) {
        ctx.status = 404;
        ctx.body = {
          error: 'Contraseña anterior incorrecta'
        };
        return;
      }
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }

    if (requestBody.password === requestBody.newPassword) {
      ctx.status = 404;
      ctx.body = {
        error: 'La nueva contraseña no puede ser igual a la anterior'
      };
      return;
    }

    const newPasswordHash = await bcrypt.hash(requestBody.newPassword, 5);
    const updatedData = { passwordHash: newPasswordHash };
    const updateUser = new UpdateUser();
    const updatedUser = await updateUser.execute(userId, updatedData);

    if (updatedUser) {
      ctx.status = 200;
      console.log('Password has been changed');
      ctx.body = updatedUser;
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Error changing password' };
    }
  } catch (error) {
    console.error('Error changing password:', error);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while changing the password.' };
  }
});

router.delete('/api/users/:id', async (ctx) => {
  try {
    const userId = parseInt(ctx.params.id, 10); // Parse the user ID from the route parameter
    const deleteUser = new DeleteUser();
    const userDeleted = await deleteUser.execute(userId);

    if (userDeleted) {
      ctx.status = 204; // No Content status code (successful deletion)
      console.log('User has been deleted');
    } else {
      ctx.status = 404; // Not Found status code (user not found)
      ctx.body = { error: 'User not found' };
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    ctx.status = 500; // Internal Server Error status code
    ctx.body = { error: 'An error occurred while deleting the user.' };
  }
});

module.exports = router;
