import {Base} from './base.model';
import {Car} from './car.model';

export class CarPicture extends Base {
  id: string;
  car_id: string;
  picture: string;
  part: string;

  Car: Car;
}
