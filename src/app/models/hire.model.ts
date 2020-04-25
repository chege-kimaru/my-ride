import {Base} from './base.model';
import {Car} from './car.model';
import {User} from './user.model';
import {Payment} from './payment.model';

export class Hire extends Base {
  id: string;
  car_id: string;
  user_id: string;
  from: any;
  to: any;
  purpose: string;
  location: string;
  payment_id: string;
  status: any;

  Car: Car;
  User: User;
  Payment: Payment;
}
