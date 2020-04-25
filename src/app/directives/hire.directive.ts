import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {Car} from '../models/car.model';
import {MatDialog} from '@angular/material/dialog';
import {HireDialogComponent} from '../hire-dialog/hire-dialog.component';

@Directive({
  selector: '[appHire]'
})
export class HireDirective {

  @Input() car: Car;

  constructor(private el: ElementRef,
              public dialog: MatDialog) {
  }

  @HostListener('click') onClick() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HireDialogComponent, {
      // width: '380px',
      data: this.car,
      disableClose: true
    });
  }
}
