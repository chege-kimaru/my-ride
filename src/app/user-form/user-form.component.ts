import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  user: User = new User();

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.buildForm(this.user);
  }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user: User) => {
      if (user && user.account_id) {
        this.user = user;
        this.buildForm(user);
      }
    });
  }

  buildForm(user: User) {
    this.form = this.fb.group({
      name: [user.name, Validators.compose([Validators.required])],
      country: ['Kenya', Validators.compose([Validators.required])],
      city: ['Nairobi', Validators.compose([Validators.required])],
      phone: [user.phone, Validators.compose([Validators.required])],
      id_number: [user.id_number, Validators.compose([Validators.required])],
    });
  }

  onSubmit(form: FormGroup) {
    this.userService.updateUser(form.value).subscribe((res: any) => {
      this.userService.currentUser$.next(res.data);
      this.toastr.success('Your details have been updated');
    }, (error: HttpErrorResponse) => {
      this.toastr.error('OOps, could not save details. Please reload and try again');
    });
  }
}
