import {Component, OnInit} from '@angular/core';
import {Car} from '../models/car.model';
import {CarService} from '../services/car.service';
import {HireDialogComponent} from '../hire-dialog/hire-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CarHiresDialogComponent} from '../car-hires-dialog/car-hires-dialog.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe((res: any) => {
      this.cars = res.data;
      this.cars.map(car => {
        car.picture = car.CarPictures.filter(c => c.part === 'front')[0];
      });
    });
  }
}
