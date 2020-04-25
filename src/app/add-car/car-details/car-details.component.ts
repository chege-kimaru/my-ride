import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarService} from '../../services/car.service';
import {Make} from '../../models/make.model';
import {Model} from '../../models/model.model';
import {Series} from '../../models/series.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarDetail} from '../../models/car.detail.model';
import {Car} from '../../models/car.model';
import {Subject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  makes: Make[] = [];
  models: Model[] = [];
  series: Series[] = [];
  years: number[] = [];
  bodyTypes: string[] = [];

  makeChanged: boolean;
  modelChanged: boolean;

  form: FormGroup;
  @Input() car$: Subject<Car> = new Subject<Car>();
  @Output() carUpdate: EventEmitter<Car> = new EventEmitter<Car>();
  car: Car = new Car();

  constructor(private carService: CarService, private fb: FormBuilder, private toastr: ToastrService) {
    this.buildForm(this.car.CarDetail);
  }

  ngOnInit(): void {
    this.getMakes();
    this.setYears();
    this.setBodyTypes();

    this.car$.subscribe(car => {
      this.car = car;

      if (this.car.CarDetail && this.car.CarDetail.make_id) {
        this.makeChanged = false;
        this.modelChanged = false;

        // this.getModels(this.car.CarDetail.make_id);
        // this.getSeries(this.car.CarDetail.make_id);
        this.buildForm(this.car.CarDetail);
      }
    });
  }

  buildForm(carDetail: CarDetail) {
    this.form = this.fb.group({
      make_id: [carDetail.make_id, Validators.compose([Validators.required])],
      model_id: [carDetail.model_id, Validators.compose([Validators.required])],
      series_id: [carDetail.series_id],
      year: [carDetail.year],
      mileage: [carDetail.mileage, Validators.compose([Validators.required])],
      body_type: [carDetail.body_type, Validators.compose([Validators.required])],
      condition_type: [carDetail.condition_type, Validators.compose([Validators.required])],
      transmission_type: [carDetail.transmission_type, Validators.compose([Validators.required])],
    });
  }

  setBodyTypes() {
    this.bodyTypes.push('Saloons', 'Hatchbacks', '4 Wheel Drives and SUVs', 'Station Wagons',
      'Pickups', 'Motorbikes', 'Convertibles', 'Buses, Taxis and Vans', 'Trucks', 'Machinery and Tractors',
      'Trailers', 'Minis', 'Coupes', 'Quad Bikes', 'Other');
  }

  setYears() {
    const year = new Date().getFullYear();
    for (let i = year; i > year - 30; i--) {
      this.years.push(i);
    }
  }

  getMakes() {
    this.carService.getMakes().subscribe((res: any) => {
      this.makes = res.data;
    });
  }

  getModels(makeId) {
    this.carService.getModels(makeId).subscribe((res: any) => {
      this.models = res.data;
    });
  }

  getSeries(modelId) {
    this.carService.getSeries(modelId).subscribe((res: any) => {
      this.series = res.data;
    });
  }

  onSubmit(form: FormGroup) {
    this.carService.setCarDetails(form.value, this.car.id).subscribe((res: any) => {
      this.car.CarDetail = res.data;
      this.carUpdate.emit(this.car);
      this.toastr.success('Car details have been set');
    }, (error: HttpErrorResponse) => {
      this.toastr.error('OOps, could not save details. Please reload and try again');
    });
  }
}
