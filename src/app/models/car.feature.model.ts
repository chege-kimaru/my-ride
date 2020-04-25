import {Base} from './base.model';
import {Car} from './car.model';

export class CarFeature extends Base {
  car_id: string;
  fuel_type: string;
  interior_type: string;
  colour: string;
  engine: string;
  description: string;

  Car: Car;
}
