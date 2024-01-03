import { type Deductiondb } from '../infrastructure/database/deduction';
import { type Profiledb } from '../infrastructure/database/profile';
import { type Servicedb } from '../infrastructure/database/service';

class Tariff {
  public id: number;
  public deductions: Deductiondb[];
  public profiles: Profiledb[];
  public serviceId: Servicedb;
  public quoteId: number;
  public monthPrice: number;
  constructor(
    public currency: string,
    public priceWhitDeduction: number,
    public grossPrice: number,
    public proyectDuration: number,
    public risk: number,
    public otherCosts: number
  ) {}
}

export { Tariff };
