import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Car} from '../../models/car.model';
import {HttpErrorResponse} from '@angular/common/http';
import {CarService} from '../../services/car.service';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hire-details',
  templateUrl: './hire-details.component.html',
  styleUrls: ['./hire-details.component.scss']
})
export class HireDetailsComponent implements OnInit {

  @Input() car$: Subject<Car> = new Subject<Car>();
  @Output() carUpdate: EventEmitter<Car> = new EventEmitter<Car>();

  car: Car = new Car();
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private carService: CarService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm(new Car());
    this.car$.subscribe(car => {
      this.car = car;
      this.buildForm(car);
    });
  }

  buildForm(car: Car) {
    this.form = this.fb.group({
      price: [car.price, Validators.compose([Validators.required])],
      terms: [car.terms, Validators.compose([Validators.required])],
    });
  }

  onSubmit(form: FormGroup) {
    if (this.car.id) {
      this.carService.updateCar(form.value, this.car.id).subscribe((res: any) => {
        this.car.price = res.data.price;
        this.car.terms = res.data.terms;
        this.carUpdate.emit(this.car);
        this.toastr.success('Hire details have been set');
      }, (error: HttpErrorResponse) => {
        this.toastr.error('OOps, could not save details. Please reload and try again');
      });
    } else {
      this.carService.createCar(form.value).subscribe((res: any) => {
        this.car.id = res.data.id;
        // this.car.price = res.data.price;
        // this.car.terms = res.data.terms;
        // this.carUpdate.emit(this.car);
        this.toastr.success('Hire details have been set');
        this.router.navigateByUrl(`/add-car/${this.car.id}`);
      }, (error: HttpErrorResponse) => {
        this.toastr.error('OOps, could not save details. Please reload and try again');
      });
    }
  }
}
