import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Car} from '../../models/car.model';
import {CarService} from '../../services/car.service';
import {ToastrService} from 'ngx-toastr';
import {CarDetail} from '../../models/car.detail.model';
import {HttpErrorResponse} from '@angular/common/http';
import {CarFeature} from '../../models/car.feature.model';

@Component({
  selector: 'app-car-features',
  templateUrl: './car-features.component.html',
  styleUrls: ['./car-features.component.scss']
})
export class CarFeaturesComponent implements OnInit {

  form: FormGroup;
  @Input() car$: Subject<Car> = new Subject<Car>();
  @Output() carUpdate: EventEmitter<Car> = new EventEmitter<Car>();
  car: Car = new Car();

  constructor(private carService: CarService, private fb: FormBuilder, private toastr: ToastrService) {
    this.buildForm(this.car.CarFeature);
  }

  ngOnInit(): void {
    this.car$.subscribe(car => {
      this.car = car;

      if (this.car.CarFeature && this.car.CarFeature.car_id) {
        this.buildForm(this.car.CarFeature);
      }
    });
  }

  buildForm(carFeature: CarFeature) {
    this.form = this.fb.group({
      fuel_type: [carFeature.fuel_type, Validators.compose([Validators.required])],
      interior_type: [carFeature.interior_type, Validators.compose([Validators.required])],
      colour: [carFeature.colour, Validators.compose([Validators.required])],
      engine: [carFeature.engine, Validators.compose([Validators.required])],
      description: [carFeature.description, Validators.compose([Validators.required])],
    });
  }

  onSubmit(form: FormGroup) {
    this.carService.setCarFeatures(form.value, this.car.id).subscribe((res: any) => {
      this.car.CarFeature = res.data;
      this.carUpdate.emit(this.car);
      this.toastr.success('Car features have been set');
    }, (error: HttpErrorResponse) => {
      this.toastr.error('OOps, could not save details. Please reload and try again');
    });
  }
}
