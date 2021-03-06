import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../common/data/publication';
import { ContextCard } from './ContextCard';
import { PublicationService } from '../../../common/service/publication.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  tabPublicationNews : Publication[] =[];
  contextCardsNews : ContextCard[]= [];

  constructor(private _publicationService : PublicationService) { }
  
  loadPublication(){

    this._publicationService.getAllObjects()
        .subscribe(
          (listePublication) => {
                          this.tabPublicationNews=listePublication;
                          this.contextCardsNews=this.build_overview_cards_context_from_publications(this.tabPublicationNews);
            } ,
          (error) => { console.log( " error : " + error ) ; }
        );

  }
  

  ngOnInit() {
    this.loadPublication();
  }

  //en entree publication (provenant de la base de données et vehiculées via WS REST JSON
//en sortie cards_context (pour le template affichage)
/*
 publication = { titre : "titre XYZ" , date : "2018-06-01",
                 fichier_image_name : null ,  resume : "<h3>contenuHTML<h3>" , 
				         fichier_details_name : "f1.pdf" , texte_complet: "...." , lien_externe : "" 
				 };
contextCards =  [
					  { "title" : "titre A1", "texte" : "<i>contenu</i> <b>A1</b>" , "footer" : '2018-02-01' , "large_html_text" : '...' },
					  ];
*/


build_overview_cards_context_from_publications(tabPublications : Publication[]) : ContextCard[]{
	var contextCards =  [];
  let num=0;					
	for(let i in tabPublications){
		   num++;
		   let ctxCard : ContextCard = { title : "", texte :"" , footer : null , large_html_text : null};
			ctxCard.title=tabPublications[i].titre;
			var texte = tabPublications[i].resume;
			
			var imgSrc="./images/florilege.jpg"; //par defaut
			if(this.notNullAndNotEmpty(tabPublications[i].fichier_image_name)){
				imgSrc="/res-api/public/posts/images/" + tabPublications[i].fichier_image_name;
			}
			var htmlWithImagePrefix = '<img src="'+imgSrc+'" class="maxOverviewSized" /> <br/>';
			texte=htmlWithImagePrefix + texte;
			
			if(this.notNullAndNotEmpty(tabPublications[i].lien_externe)){
				texte = '<a target="_blank" href="'+tabPublications[i].lien_externe+'">' + texte + '</a>';
			}
			if(this.notNullAndNotEmpty(tabPublications[i].texte_complet)){
				ctxCard.large_html_text = tabPublications[i].texte_complet;
			}
			else if(this.notNullAndNotEmpty(tabPublications[i].fichier_details_name)){
				texte = '<a target="_blank" href="/res-api/public/posts/'+tabPublications[i].fichier_details_name+'">' + texte + '</a>';
			}
			
			ctxCard.texte= texte;
			ctxCard.footer=tabPublications[i].date;
			contextCards.push(ctxCard);
		}
	return contextCards;
}

notNullAndNotEmpty(str:string | null):boolean{
	if(str){
		if(str.length==0)
			return false;
		else 
			return true;
	}
	else{
		return false;
	}
}

}
