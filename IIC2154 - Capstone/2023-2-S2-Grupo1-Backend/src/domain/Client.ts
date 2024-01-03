import { type Quotedb } from '../infrastructure/database/quote';

class Client {
  public id: number;
  public quotes: Quotedb[];
  constructor(
    public name: string,
    public rut_empresa: string
  ) {}
}

export { Client };
