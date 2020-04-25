import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Car} from '../models/car.model';
import {CarService} from '../services/car.service';
import {Hire} from '../models/hire.model';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-car-hires-dialog',
  templateUrl: './car-hires-dialog.component.html',
  styleUrls: ['./car-hires-dialog.component.scss']
})
export class CarHiresDialogComponent implements OnInit {

  hires: Hire[];

  constructor(
    public dialogRef: MatDialogRef<CarHiresDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public car: Car,
    private carService: CarService,
    private toastr: ToastrService) {
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getCarHires();
  }

  getCarHires() {
    this.carService.getCarHires(this.car.id).subscribe((res: any) => {
      this.hires = res.data;
    });
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

  verify(hire: Hire) {
    this.carService.verifyCarHire(this.car.id, hire.id).subscribe((res: any) => {
      this.getCarHires();
      this.toastr.success('Successfully verified hire');
    }, (err: HttpErrorResponse) => {
      this.toastr.error('Could not verify hire');
    });
  }

  cancel(hire: Hire) {
    this.carService.cancelCarHire(this.car.id, hire.id).subscribe((res: any) => {
      this.getCarHires();
      this.toastr.success('Successfully cancelled hire');
    }, (err: HttpErrorResponse) => {
      this.toastr.error('Could not cancel hire');
    });
  }

  return(hire: Hire) {
    this.carService.returnHire(this.car.id, hire.id).subscribe((res: any) => {
      this.getCarHires();
      this.toastr.success('Successfully marked car as returned.');
    }, (err: HttpErrorResponse) => {
      this.toastr.error('Could not mark car as returned.');
    });
  }
}
