import { Component, OnInit } from '@angular/core';
import { RessourceService } from 'src/app/common/service/ressource.service';
import { Ressource } from 'src/app/common/data/ressource';
import { map , filter , flatMap , toArray} from 'rxjs/operators';

export class TitreHref {
  constructor(public titre:string | null= null ,
              public url:string | null= null){
              }
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  public filtre : string ="";
  public msgFiltrage = "";

  public plans :TitreHref[] = [];

  public onSubmit():void {
      //pré-version pas encore optimisée:
      this.ressourceService.getAllObjects()
      .pipe(
        flatMap(itemInTab=>itemInTab) ,
        filter((res: Ressource)=> res.res_type=="pdf" 
                                  && res.res_categorie=="plan"
                                  && res.titre.toLowerCase().includes(this.filtre.toLowerCase()) ),
        map( (res : Ressource) => { return new TitreHref(res.titre , "/res-api/public/posts/"+res.res_fic_name); }),
        toArray()
      ).subscribe(plans=>{this.plans=plans; console.log(JSON.stringify(plans));});

  }

  constructor(public ressourceService : RessourceService) { }

  ngOnInit() {
  }

}
