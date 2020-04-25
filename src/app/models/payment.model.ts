import {Base} from './base.model';
import {Hire} from './hire.model';

export class Payment extends Base {
  id: string;
  amount: number;
  hire_id: string;
  txref: string;

  Hire: Hire;
}
