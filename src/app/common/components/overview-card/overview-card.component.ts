import { Component, input } from '@angular/core';
import { MyCardComponent } from '../../../shared/component/generic/my-card/my-card.component';

@Component({
  selector: 'app-overview-card',
  imports: [MyCardComponent],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.scss'
})
export class OverviewCardComponent {

  title = input("default card title");


  smallInnerHtmlText= input("default card content text");


  bigModalInnerHtmlText  = input("big html");


  footer = input(""); //"default optional card footer text";
}
