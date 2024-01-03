import { type Tariffdb } from '../infrastructure/database/tariff';

class Profile {
  public id: number;
  public tariffId: Tariffdb;
  constructor(
    public role: string,
    public costperhour: number,
    public hourAssignment: number
  ) {}
}

export { Profile };
