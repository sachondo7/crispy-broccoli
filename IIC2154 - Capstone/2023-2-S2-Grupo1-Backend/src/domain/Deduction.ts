import { type Userdb } from '../infrastructure/database/user';
import { type Tariffdb } from '../infrastructure/database/tariff';
import { type Quotedb } from '../infrastructure/database/quote';

class Deduction {
  public id: number;
  public userId: Userdb;
  public tariffId: Tariffdb;
  constructor(
    public authorization: boolean,
    public percentage: number
  ) {}
}

export { Deduction };
