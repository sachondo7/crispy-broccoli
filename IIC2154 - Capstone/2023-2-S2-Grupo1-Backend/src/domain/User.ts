import { type Deductiondb } from '../infrastructure/database/deduction';
import { type Quotedb } from '../infrastructure/database/quote';
import { Exclude } from 'class-transformer';

class User {
  public id: number;
  public deductions: Deductiondb[];
  public quotes: Quotedb[];
  public blocked: boolean;
  public type: string;
  public tokenDevise: string;

  constructor(
    public name: string,
    public email: string,
    public passwordHash: string
  ) {}
}

export { User };
