import {Account} from './account.model';
import {Base} from './base.model';

export class User extends Base {
  account_id: string;
  name: string;
  country: string;
  city: string;
  phone: string;
  id_number: string;

  Account: Account;
}
