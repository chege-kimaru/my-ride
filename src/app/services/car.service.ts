import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Car} from '../models/car.model';
import {CarFeature} from '../models/car.feature.model';
import {CarDetail} from '../models/car.detail.model';
import {Hire} from '../models/hire.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {
  }

  getMakes() {
    return this.http.get(`${environment.BASE_URI}/car-makes/makes`);
  }

  getModels(makeId) {
    return this.http.get(`${environment.BASE_URI}/car-makes/makes/${makeId}/models`);
  }

  getSeries(modelId) {
    return this.http.get(`${environment.BASE_URI}/car-makes/models/${modelId}/series`);
  }

  createCar(car: Car) {
    return this.http.post(`${environment.BASE_URI}/cars`, car);
  }

  updateCar(car: Car, carId) {
    return this.http.put(`${environment.BASE_URI}/cars/${carId}`, car);
  }

  getCars() {
    return this.http.get(`${environment.BASE_URI}/cars`);
  }

  getCar(carId) {
    return this.http.get(`${environment.BASE_URI}/cars/${carId}`);
  }

  setCarDetails(carDetail: CarDetail, carId) {
    return this.http.patch(`${environment.BASE_URI}/cars/${carId}/details`, carDetail);
  }

  setCarFeatures(carFeature: CarFeature, carId) {
    return this.http.patch(`${environment.BASE_URI}/cars/${carId}/features`, carFeature);
  }

  setCarPicture(formData: FormData, carId) {
    return this.http.patch(`${environment.BASE_URI}/cars/${carId}/pictures`, formData);
  }

  bookCar(hire: Hire, carId: string) {
    return this.http.post(`${environment.BASE_URI}/cars/${carId}/hires`, hire);
  }

  getCarHires(carId: string) {
    return this.http.get(`${environment.BASE_URI}/cars/${carId}/hires`);
  }

  verifyCarHire(carId: string, hireId: string) {
    return this.http.patch(`${environment.BASE_URI}/cars/${carId}/hires/${hireId}/verify`, {});
  }

  payCarHire(carId: string, hireId: string, data) {
    return this.http.patch(`${environment.BASE_URI}/cars/${carId}/hires/${hireId}/pay`, data);
  }

  cancelCarHire(carId: string, hireId: string) {
    return this.http.patch(`${environment.BASE_URI}/cars/${carId}/hires/${hireId}/cancel`, {});
  }

  returnHire(carId: string, hireId: string) {
    return this.http.patch(`${environment.BASE_URI}/cars/${carId}/hires/${hireId}/returned`, {});
  }
}
