import {Base} from './base.model';
import {Make} from './make.model';

export class Model extends Base {
  id: number;
  model: string;
  make_id: number;

  Make: Make;
}
