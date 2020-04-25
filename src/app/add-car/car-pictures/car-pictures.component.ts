import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {Car} from '../../models/car.model';
import {CarService} from '../../services/car.service';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {CarPicture} from '../../models/car.picture.model';

@Component({
  selector: 'app-car-pictures',
  templateUrl: './car-pictures.component.html',
  styleUrls: ['./car-pictures.component.scss']
})
export class CarPicturesComponent implements OnInit {

  @Input() car$: Subject<Car> = new Subject<Car>();
  @Output() carUpdate: EventEmitter<Car> = new EventEmitter<Car>();
  car: Car = new Car();

  imageFront: CarPicture;
  imageBack: CarPicture;
  imageLeft: CarPicture;
  imageRight: CarPicture;
  imageDashboard: CarPicture;
  imageInterior: CarPicture;

  constructor(private carService: CarService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.car$.subscribe(car => {
      this.car = car;
      this.getPartImages();
    });
  }

  onFileSelected(element: HTMLInputElement, preview: HTMLImageElement, event) {
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (typeof reader.result === 'string') {
          preview.src = reader.result;
        }
      };

      reader.readAsDataURL(element.files[0]);
    }
  }

  setImage(part, element: HTMLInputElement) {
    const data = new FormData();
    data.append('part', part);
    data.append('image', element.files[0]);

    this.carService.setCarPicture(data, this.car.id).subscribe((res: any) => {
      if (!this.car.CarPictures) {
        this.car.CarPictures = [];
      }
      this.car.CarPictures.push(res.data);
      this.carUpdate.emit(this.car);
      this.toastr.success(`Car ${part} has been set successfully`);
    }, (error: HttpErrorResponse) => {
      this.toastr.error('OOps, could not save details. Please reload and try again');
    });
  }

  getPartImages() {
    this.car.CarPictures.forEach((pic) => {
      switch (pic.part) {
        case 'front':
          this.imageFront = pic;
          break;
        case 'back':
          this.imageFront = pic;
          break;
        case 'left':
          this.imageFront = pic;
          break;
        case 'right':
          this.imageFront = pic;
          break;
        case 'dashboard':
          this.imageFront = pic;
          break;
        case 'interior':
          this.imageFront = pic;
          break;
      }
    });
  }
}
