import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Car} from '../models/car.model';
import {CarService} from '../services/car.service';
import {Hire} from '../models/hire.model';

@Component({
  selector: 'app-hire-dialog',
  templateUrl: './hire-dialog.component.html',
  styleUrls: ['./hire-dialog.component.scss']
})
export class HireDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HireDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public car: Car) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
