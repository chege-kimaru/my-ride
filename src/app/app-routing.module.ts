import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarsComponent} from './cars/cars.component';
import {SingleCarComponent} from './single-car/single-car.component';
import {MyCarsComponent} from './my-cars/my-cars.component';
import {MyBookingsComponent} from './my-bookings/my-bookings.component';
import {BookComponent} from './book/book.component';
import {HomeComponent} from './home/home.component';
import {AddCarComponent} from './add-car/add-car.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'cars/:carId', component: SingleCarComponent},
  {path: 'my-cars', component: MyCarsComponent},
  {path: 'add-car/:carId', component: AddCarComponent},
  {path: 'my-bookings', component: MyBookingsComponent},
  {path: 'book', component: BookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
