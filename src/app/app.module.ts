import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CarsComponent} from './cars/cars.component';
import {SingleCarComponent} from './single-car/single-car.component';
import {AddCarComponent} from './add-car/add-car.component';
import {MyCarsComponent} from './my-cars/my-cars.component';
import {MyBookingsComponent} from './my-bookings/my-bookings.component';
import {BookComponent} from './book/book.component';
import {HomeComponent} from './home/home.component';
import {HireDetailsComponent} from './add-car/hire-details/hire-details.component';
import {CarDetailsComponent} from './add-car/car-details/car-details.component';
import {CarFeaturesComponent} from './add-car/car-features/car-features.component';
import {CarPicturesComponent} from './add-car/car-pictures/car-pictures.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {SigninDirective} from './directives/signin.directive';
import {ToastrModule} from 'ngx-toastr';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {UserFormComponent} from './user-form/user-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BookFormComponent} from './book-form/book-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {HireDialogComponent} from './hire-dialog/hire-dialog.component';
import {HireDirective} from './directives/hire.directive';
import {MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { CarHiresDialogComponent } from './car-hires-dialog/car-hires-dialog.component';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarsComponent,
    SingleCarComponent,
    AddCarComponent,
    MyCarsComponent,
    MyBookingsComponent,
    BookComponent,
    HomeComponent,
    HireDetailsComponent,
    CarDetailsComponent,
    CarFeaturesComponent,
    CarPicturesComponent,
    SigninDirective,
    UserFormComponent,
    BookFormComponent,
    HireDialogComponent,
    HireDirective,
    CarHiresDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatRadioModule,
        MatStepperModule,
        MatButtonModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        MatCardModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatChipsModule
    ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
