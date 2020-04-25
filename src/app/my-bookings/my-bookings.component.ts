import {Component, OnInit} from '@angular/core';
import {Hire} from '../models/hire.model';
import {UserService} from '../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CarService} from '../services/car.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';
import {uuid} from 'uuidv4';

declare const getpaidSetup: any;

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {

  hires: Hire[];
  user: User;

  constructor(private userService: UserService,
              private carService: CarService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getCarHires();
  }

  getCarHires() {
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
    });
    this.userService.getUserHires().subscribe((res: any) => {
      this.hires = res.data;
    });
  }

  getCarName(hire: Hire) {
    if (hire && hire.Car && hire.Car.CarDetail) {
      return hire.Car.CarDetail.Make.make + ' ' + hire.Car.CarDetail.Model.model + ' ' + hire.Car.CarDetail.Series.series;
    } else {
      return '';
    }
  }

  getCarImage(hire: Hire) {
    if (hire && hire.Car && hire.Car.CarPictures && hire.Car.CarPictures.length > 0) {
      return hire.Car.CarPictures[0].picture;
    } else {
      return '';
    }
  }

  setStatus(status) {
    switch (status) {
      case 1:
        return 'Booked';
      case 2:
        return 'Verified';
      case 3:
        return 'Cancelled';
      case 4:
        return 'Paid';
      case 5:
        return 'Returned';
    }
  }

  pay(hire: Hire) {
    const x = getpaidSetup({
      PBFPubKey: environment.RAVE_KEY,
      customer_email: this.user.Account.email,
      amount: ((20 / 100) * hire.Car.price) + hire.Car.price,
      customer_phone: this.user.phone,
      currency: 'KES',
      txref: uuid(),
      onclose: (response) => {
      },
      callback: (response) => {
        const txref = response.tx.txRef; // collect txRef returned and pass to a server page to complete status check.
        console.log(response);
        if (
          response.tx.chargeResponseCode === '00' ||
          response.tx.chargeResponseCode === '0'
        ) {
          // redirect to a success page
          this.payHire(hire, {txref});
        } else {
          // redirect to a failure page.
          this.toastr.error('Transaction Failed');
        }

        x.close(); // use this to close the modal immediately after payment.
      }
    });
  }

  payHire(hire: Hire, data) {
    this.carService.payCarHire(hire.Car.id, hire.id, data).subscribe((res: any) => {
      this.getCarHires();
      this.toastr.success('Successfully paid to hire this car');
    }, (err: HttpErrorResponse) => {
      this.toastr.error('Could not pay to hire this car');
    });
  }

  cancel(hire: Hire) {
    this.carService.cancelCarHire(hire.Car.id, hire.id).subscribe((res: any) => {
      this.getCarHires();
      this.toastr.success('Successfully cancelled hire');
    }, (err: HttpErrorResponse) => {
      this.toastr.error('Could not cancel hire');
    });
  }
}
