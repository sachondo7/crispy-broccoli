import { type Context } from 'koa';
import { GetUserById } from '../../app/services/user/GetUserById';

export async function checkAdminPermission(
  ctx: Context,
  next: () => Promise<void>
) {
  const userId = parseInt(ctx.params.userId, 10);

  if (userId) {
    const getUserById = new GetUserById();
    const user = await getUserById.execute(userId);

    if (user && (user.type === 'administrator' || user.type === 'CEO')) {
      ctx.state.user = user; // Establece el usuario en ctx.state para su uso posterior
      await next();
    } else {
      ctx.status = 403;
      ctx.body = { message: 'No tienes permisos para acceder a esta ruta.' };
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      message: 'Se requiere un ID de usuario válido en los parámetros.'
    };
  }
}
