import {Component, OnInit} from '@angular/core';
import {CarService} from '../services/car.service';
import {Car} from '../models/car.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) {
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
