import { Component, inject, input } from '@angular/core';
import { MyCardComponent } from '../../../shared/component/generic/my-card/my-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../../../shared/component/generic/message-popup/message-popup.component';

@Component({
  selector: 'app-overview-card',
  imports: [MyCardComponent],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.scss'
})
export class OverviewCardComponent {

  readonly dialog = inject(MatDialog);

  title = input("default card title");


  smallInnerHtmlText= input("default card content text");


  bigModalInnerHtmlText  = input("");


  footer = input(""); //"default optional card footer text";

  showTexteCompletInMessageDialog(){
      MessagePopupComponent.messagePopup(this.dialog,this.title(),this.bigModalInnerHtmlText(),"info")//"info" or "warning" or "error"
    }
}
