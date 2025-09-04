import { Component, ViewChild } from '@angular/core';
import { GenericCrudAbstractContextHelper } from '../../shared/component/crud/abstract/GenericCrudAbstractContextHelper';
import { Ressource } from '../../common/data/ressource';
import { GenericCrudComponent, GenericCrudState } from '../../shared/component/crud/generic-crud/generic-crud.component';
import { RessourceService } from '../../common/service/ressource.service';
import { RessourceHelper } from '../../common/helper/ressource-helper';
import { ObjectHelper } from '../../shared/helper/object-helper';
import { GenericCrudHelper } from '../../shared/component/crud/abstract/GenericCrudHelper';
import { GenericCrudContext } from '../../shared/component/crud/GenericCrudContext';
import { FormsModule } from '@angular/forms';
import { fileNameWithDateTimeSuffix } from '../../shared/util/util';

@Component({
  selector: 'app-admin-ressources',
  imports: [FormsModule,GenericCrudComponent],
  templateUrl: './admin-ressources.component.html',
  styleUrl: './admin-ressources.component.scss'
})
export class AdminRessourcesComponent implements  GenericCrudAbstractContextHelper<Ressource,String>{
  
  genericCrudContext : GenericCrudContext<Ressource,String> ;

  public resTypesSelectionnables = ["document" , "image" , "video" , "pdf" , "autres"];

  public resCategoriesSelectionnables = [ "ressource" , "plan" , "cv" , "illustration" , "avis" , "autres"];
  
  objectTemp : any = null;
   
  resFileToUpload: File | null = null;

  @ViewChild('f_res_file') 
  resfileInput : any ;

 resetFileInputs(){
  if(this.resfileInput && this.resfileInput.nativeElement){
      console.log("reset resfileInput")
      this.resfileInput.nativeElement.value = "";
  }
 }


  onGenericCrudStateChange(eventCrudState:GenericCrudState){
    console.log("onGenericCrudStateChange , eventCrudState:" + JSON.stringify(eventCrudState))
    this.objectTemp = eventCrudState.objectTemp;
    if(eventCrudState.lastAction=="onSelected")
              this.onReinitCoherentState();
    else if(eventCrudState.lastAction){
       if(eventCrudState.lastAction=="onNew" || eventCrudState.lastAction=="onInit" )
              this.onInitNew();
    } 
  }

  onReinitCoherentState(){
     this.resetFileInputs();
     this.resFileToUpload = null;
    }

  convertDate(d:Date) {
      function pad(s:number) { return (s < 10) ? '0' + s : s; }
      return [d.getFullYear(), pad(d.getMonth()+1) ,pad(d.getDate()) ].join('-');
  }


  onInitNew(){
      this.resetFileInputs();
      this.resFileToUpload = null;
      this.objectTemp.date=this.convertDate(new Date());
      this.objectTemp.res_type="document"; //par défaut
      this.objectTemp.res_categorie="ressource"; //par défaut
  }

  constructor(public ressourceService : RessourceService) {
      this.genericCrudContext = new GenericCrudContext<Ressource,String>(this);
      this.genericCrudContext.requiredRole="admin"; //to use private URL for get
                                                    //IMPORTANT: public results without responses , private results with responses
      this.genericCrudContext.filterDefs=[
      ]
      this.genericCrudContext.availableActions="READ,NEW,ADD,DELETE" ; // not again  UPDATE/PUT with upload
      this.genericCrudContext.onUploadFormDataPrepareFn=()=>{
           const formData: FormData = new FormData();
           formData.append('resFile' , this.resFileToUpload!); //may be null
           formData.append('ressource' , JSON.stringify(this.objectTemp));
           return formData;
      }
     }
  
    objectHelper(): ObjectHelper<Ressource, String> {
        return new RessourceHelper();
    }
  
    crudHelper(): GenericCrudHelper<Ressource, String> | null {
      return null;
  }

  handleResFileInput(evt:any) {
    let files: FileList = evt.target!['files'];
    if(this.objectTemp==null)return;
    this.resFileToUpload = files.item(0);
    let originalfileName = this.resFileToUpload?.name || ""; //.name , .size , .type

    //IMPORTANT : un suffix d'horodatage est ajouté au nom du fichier qui sera enregistré coté serveur
    //pour garantir une unicité de la ressource (pas d'écrasement d'ancien fichier de même nom)
    //le nom complet du fichier avec suffix sera enregistré en base de données (de manière cohérente coté serveur)
    this.objectTemp.res_fic_name= fileNameWithDateTimeSuffix(originalfileName)

    let ficName = originalfileName;
    let posPoint = ficName.lastIndexOf('.');
    let ficNameSansExt = ficName.substring(0,posPoint);
    let ficExt = ficName.substring(posPoint+1);

    if(this.objectTemp.titre==null || this.objectTemp.titre==""){
      //titre par defaut = fic name sans extension
      this.objectTemp.titre=ficNameSansExt;
    }
      
    switch(ficExt){
        case "jpg":
        case "jpeg":
        case "gif":
        case "png":
            this.objectTemp.res_type="image";
            break;
        case "pdf":
            this.objectTemp.res_type="pdf";
            break;
        case "mpeg":
            this.objectTemp.res_type="video";
            break;
        default:
            this.objectTemp.res_type="document";
            break;
      }    
  } 
}
