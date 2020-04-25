import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Car} from '../models/car.model';
import {CarService} from '../services/car.service';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';

declare const $: any;

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  car$: Subject<Car> = new Subject<Car>();
  car: Car = new Car();
  user: User = new User();
  event: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private userService: UserService) {
    this.user = this.userService.currentUser;
    this.userService.currentUser$.subscribe(user => this.user = user);

    this.car$.subscribe(car => this.car = car);
    this.route.params.subscribe(params => {
      if (params.carId === 'new') {

      } else {
        this.carService.getCar(params.carId).subscribe((res: any) => {
          this.car$.next(res.data);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  preview() {
    this.router.navigateByUrl(`/cars/carId`);
  }

  carUpdate(c: Car) {
    this.car$.next(c);
  }
}
