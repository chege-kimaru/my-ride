import {Base} from './base.model';

export class Account extends Base {
  id: string;
  email: string;

  jwt: string;
}
