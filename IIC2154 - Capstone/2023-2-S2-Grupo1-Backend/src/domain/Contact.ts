import { type Clientdb } from '../infrastructure/database/client';
import { type Quotedb } from '../infrastructure/database/quote';

class Contact {
  public id: number;
  public client: Clientdb;
  public quotes: Quotedb[];
  constructor(
    public name: string,
    public email: string
  ) {}
}

export { Contact };
