import {AfterViewInit, Directive, ElementRef, HostListener} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

declare const gapi: any;

@Directive({
  selector: '[appSignin]'
})
export class SigninDirective implements AfterViewInit {

  auth2: any;

  constructor(private el: ElementRef, private toastr: ToastrService, private authService: AuthService) {
  }

  @HostListener('click') onClick() {

  }

  ngAfterViewInit(): void {
    this.onGapiLoad().then(() => {
      this.auth2.attachClickHandler(this.el.nativeElement, {},
        (googleUser) => this.signIn(googleUser),
        (error) => {
          this.toastr.error(error.error);
        });
    });
  }

  onGapiLoad() {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '686426475552-tqo47e0huapm4roqvpovaq3103h5hee3.apps.googleusercontent.com'
        });
        resolve();
      });
    });
  }

  signIn(googleUser) {
    this.authService.googleSignIn({token: googleUser.getAuthResponse().id_token})
      .subscribe((user: any) => {
        this.toastr.success(`Welcome ${user.data.email}`);
        this.authService.login(user.data);
      }, (error: HttpErrorResponse) => {
        this.toastr.error(`oops, an error occurred`);
      });
  }

}
