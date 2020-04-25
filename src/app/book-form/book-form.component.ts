import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Car} from '../models/car.model';
import {CarService} from '../services/car.service';
import {ToastrService} from 'ngx-toastr';
import {CarDetail} from '../models/car.detail.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  form: FormGroup;
  @Input()
  car: Car = new Car();
  @Output() closeDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor(private carService: CarService, private fb: FormBuilder,
              private toastr: ToastrService, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  buildForm() {
    this.form = this.fb.group({
      from: ['', Validators.compose([Validators.required])],
      to: ['', Validators.compose([Validators.required])],
      purpose: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      'accept-terms': ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.carService.bookCar(form.value, this.car.id).subscribe((res: any) => {
      this.toastr.success('Your booking has been recorded. Please wait for verification from the car owner.');
      this.router.navigateByUrl('/my-bookings');
      this.closeDialog.emit();
    }, (error: HttpErrorResponse) => {
      this.toastr.error('OOps, could not go through. Please reload and try again');
    });
  }
}
