import {Base} from './base.model';
import {User} from './user.model';
import {CarDetail} from './car.detail.model';
import {CarFeature} from './car.feature.model';
import {CarPicture} from './car.picture.model';

export class Car extends Base {
  id: string;
  user_id: string;
  price: number;
  terms: string;

  picture: CarPicture;

  User: User;
  CarDetail: CarDetail = new CarDetail();
  CarFeature: CarFeature = new CarFeature();
  CarPictures: Array<CarPicture> = new Array<CarPicture>();
}
