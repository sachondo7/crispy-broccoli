import { Userdb } from '../../../infrastructure/database/user';
import { database } from '../../../infrastructure/database/data-source';
import { type } from 'os';

export class CreateUser {
  async execute(
    name: string,
    email: string,
    passwordHash: string,
    type: string
  ): Promise<Userdb> {
    try {
      const newUser = new Userdb(name, email, passwordHash);
      newUser.deductions = []; // Inicializa deductions como un array vacío
      newUser.quotes = []; // Inicializa quotes como un array vacío
      if (type) {
        newUser.type = type;
      }

      await database.manager.save(newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}
 