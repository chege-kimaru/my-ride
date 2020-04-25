import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authenticated: boolean;
  showNav = false;

  constructor(private authService: AuthService,
              private breakPointObserver: BreakpointObserver) {
    breakPointObserver.observe('(max-width: 1080px)').subscribe(result => this.showNav = result.matches);
  }

  ngOnInit(): void {
    this.authService.currentAccount$.subscribe(account => {
      if (account) {
        this.authenticated = true;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
