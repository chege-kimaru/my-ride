import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../models/account.model';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentAccount$: Subject<Account> = new Subject<Account>();
  public currentAcount: Account;

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService) {
  }

  googleSignIn(token) {
    return this.http.post(`${environment.BASE_URI}/auth/signin`, token);
  }

  login(account: Account) {
    localStorage.setItem('MYRIDE_AUTH_TOKEN', account.jwt);
    this.currentAccount$.next(account);
    this.currentAcount = account;
  }

  getAccount() {
    return this.http.get(`${environment.BASE_URI}/auth`).subscribe((res: any) => {
      this.currentAccount$.next(res.data);
      this.currentAcount = res.data;
    });
  }

  getToken() {
    return sessionStorage.getItem('MYRIDE_AUTH_TOKEN') || localStorage.getItem('MYRIDE_AUTH_TOKEN');
  }

  logout() {
    localStorage.removeItem('MYRIDE_AUTH_TOKEN');
    sessionStorage.removeItem('MYRIDE_AUTH_TOKEN');
    this.currentAccount$.next(null);
    this.currentAcount = null;
    this.router.navigateByUrl('/');
    this.toastr.info('You have been logged out. Please click the sign in button to sign in again.');
  }
}
