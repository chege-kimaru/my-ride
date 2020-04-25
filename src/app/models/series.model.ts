import {Base} from './base.model';
import {Model} from './model.model';

export class Series extends Base {
  id: number;
  series: string;
  model_id: number;

  Model: Model;
}
