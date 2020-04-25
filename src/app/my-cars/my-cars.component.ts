import {Component, OnInit} from '@angular/core';
import {Car} from '../models/car.model';
import {UserService} from '../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {CarHiresDialogComponent} from '../car-hires-dialog/car-hires-dialog.component';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.scss']
})
export class MyCarsComponent implements OnInit {

  cars: Car[];

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getUserCars().subscribe((res: any) => {
      this.cars = res.data;
      this.cars.map(car => {
        car.picture = car.CarPictures.filter(c => c.part === 'front')[0];
      });
    });
  }

  openHireDialog(car: Car): void {
    const dialogRef = this.dialog.open(CarHiresDialogComponent, {
      // width: '380px',
      data: car,
      disableClose: true
    });
  }

}
