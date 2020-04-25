import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser$.subscribe(user => this.currentUser = user);
  }

  updateUser(user: User) {
    return this.http.put(`${environment.BASE_URI}/users`, user);
  }

  getUserDetails() {
    return this.http.get(`${environment.BASE_URI}/users`)
      .subscribe((res: any) => {
        this.currentUser$.next(res.data);
      });
  }

  getUserCars() {
    return this.http.get(`${environment.BASE_URI}/users/me/cars`);
  }

  getUserHires() {
    return this.http.get(`${environment.BASE_URI}/users/me/hires`);
  }
}
