import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-ride';


  constructor(private authService: AuthService, private userService: UserService) {
    this.authService.getAccount();
    this.userService.getUserDetails();
  }
}
