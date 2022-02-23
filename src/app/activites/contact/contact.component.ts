import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/common/data/Contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  msg=""; //message de statut (après envoie du contact)
      
@Input()
cardTitle : string = "Me contacter"; //valeur par defaut;

@Input()
withoutCoord : boolean = false; //valeur par defaut;

@Input()
sendButtonLabel : string = "Envoyer" ; //valeur par défaut

@Input()
contact : Contact = { _id: null, nom : "" , prenom : "" , adresse : "" , telephone : "", 
                      email : "" , objet : "" , message : "" , 
                      date : this.convertDate(new Date()), statut : "nouveau" , selection:false
                      }; //valeur par défaut;

convertDate(d:Date) {
  function pad(s:number) { return (s < 10) ? '0' + s : s; }
  return [d.getFullYear(), pad(d.getMonth()+1) ,pad(d.getDate()) ].join('-');
}

  constructor() { }

  ngOnInit() {
  }

  

  
}
