import { type Tariffdb } from '../infrastructure/database/tariff';
import { type Clientdb } from '../infrastructure/database/client';
import { type Userdb } from '../infrastructure/database/user';
import { type Contactdb } from '../infrastructure/database/contact';

class Quote {
  public id: number;
  public tariffId: Tariffdb;
  public user?: Userdb;
  public client?: Clientdb;
  public contact?: Contactdb;
  public updateDate?: Date;

  // eslint-disable-next-line max-params
  constructor(
    public startDate: Date,
    public endDate: Date,
    public deliveryDate: Date,
    public status: string,
    public idProyecto: string,
    public userId: Userdb,
    public clientId: Clientdb
  ) {}
}

export { Quote };
