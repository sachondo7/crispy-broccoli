import { type Tariffdb } from '../infrastructure/database/tariff';

class Service {
  public id: number;
  public tariff: Tariffdb[];

  constructor(public type: string) {}
}

export { Service };
