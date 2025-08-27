import { Component } from '@angular/core';
import { MyCardComponent } from '../../shared/component/generic/my-card/my-card.component';

@Component({
  selector: 'app-cv',
  imports: [MyCardComponent],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent {

}
