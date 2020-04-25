import {Base} from './base.model';
import {Make} from './make.model';
import {Model} from './model.model';
import {Series} from './series.model';
import {Car} from './car.model';

export class CarDetail extends Base {
  car_id: string;
  make_id: string;
  model_id: string;
  series_id: string;
  year: number;
  mileage: number;
  body_type: string;
  condition_type: string;
  transmission_type: string;

  Make: Make;
  Model: Model;
  Series: Series;
  Car: Car;
}
