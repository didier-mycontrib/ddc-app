import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { GenericCrudAbstractContextHelper } from '../../shared/component/crud/abstract/GenericCrudAbstractContextHelper';
import { GenericCrudContext } from '../../shared/component/crud/GenericCrudContext';
import { Publication } from '../../common/data/publication';
import { PublicationService } from '../../common/service/publication.service';
import { ObjectHelper } from '../../shared/helper/object-helper';
import { GenericCrudHelper } from '../../shared/component/crud/abstract/GenericCrudHelper';
import { PublicationHelper } from '../../common/helper/publication-helper';
import { FormsModule } from '@angular/forms';
import { GenericCrudComponent, GenericCrudState } from '../../shared/component/crud/generic-crud/generic-crud.component';
import { fileNameWithDateTimeSuffix } from '../../shared/util/util';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../../shared/component/generic/message-popup/message-popup.component';

@Component({
  selector: 'app-admin-news',
  imports: [FormsModule,GenericCrudComponent],
  templateUrl: './admin-news.component.html',
  styleUrl: './admin-news.component.scss'
})
export class AdminNewsComponent implements OnInit ,  GenericCrudAbstractContextHelper<Publication,String>{

  readonly dialog = inject(MatDialog);
  
  detailType = 'none';  //ou "link" ou "file" ou "text"

  objectTemp : any = null;
   
  imageFileToUpload: File | null = null;
  detailFileToUpload: File | null = null;

  @ViewChild('f_imageFile') 
 imageFileInput : any ;

 @ViewChild('f_detailsFile') 
 detailsFileInput : any ;

 resetFileInputs(){
  if(this.imageFileInput && this.imageFileInput.nativeElement){
     // console.log("reset imageFileInput")
      this.imageFileInput.nativeElement.value = "";
  }
  if(this.detailsFileInput && this.detailsFileInput.nativeElement){
    // console.log("reset detailsFileInput")
    this.detailsFileInput.nativeElement.value = "";
  }
 }

  onGenericCrudStateChange(eventCrudState:GenericCrudState){
    console.log("onGenericCrudStateChange , eventCrudState:" + JSON.stringify(eventCrudState))
    this.objectTemp = eventCrudState.objectTemp;
    if(eventCrudState.lastAction){
        if(eventCrudState.lastAction=="onSelected")
              this.onReinitCoherentState();
        else if(eventCrudState.lastAction=="onNew" || eventCrudState.lastAction=="onInit")
              this.onInitNew();
    } 
  }

  convertDate(d:Date) {
      function pad(s:number) { return (s < 10) ? '0' + s : s; }
      return [d.getFullYear(), pad(d.getMonth()+1) ,pad(d.getDate()) ].join('-');
  }
  onInitNew(){
      this.imageFileToUpload=null;
      this.detailFileToUpload=null;
      this.resetFileInputs();
      this.objectTemp.date=this.convertDate(new Date());
      this.detailType="none";
  }

  onReinitCoherentState(){
    this.resetFileInputs();
    this.imageFileToUpload = null;
    this.detailFileToUpload=null;
     if(this.objectTemp==null) return;
      if(this.objectTemp.texte_complet!=null)
        this.detailType="text";
      else if(this.objectTemp.lien_externe!=null)
          this.detailType="link";
      else if(this.objectTemp.fichier_details_name!=null)
        this.detailType="file";
      else 
         this.detailType="none";
    console.log("onReinitCoherentState, detailType="+this.detailType)
  }

  showSumUpInMessageDialog(){
    const titre = this.objectTemp.titre;
    const texte = this.objectTemp.resume;
    MessagePopupComponent.messagePopup(this.dialog,titre,texte,"info")//"info" or "warning" or "error"
  }

   showTexteCommpletInMessageDialog(){
    const titre = this.objectTemp.titre;
    const texte = this.objectTemp.texte_complet;
    MessagePopupComponent.messagePopup(this.dialog,titre,texte,"info")//"info" or "warning" or "error"
  }

  coherentDetails(){
    //after changing detailType:
    switch(this.detailType){
      case "none":
         this.detailFileToUpload=null;
         this.objectTemp.fichier_details_name=null;
         this.objectTemp.texte_complet=null;
         this.objectTemp.lien_externe=null;
         break;
     case "link":
         this.detailFileToUpload=null;
         this.objectTemp.fichier_details_name=null;
         this.objectTemp.texte_complet=null;
         break; 
    case "file":
         this.objectTemp.lien_externe=null;
         this.objectTemp.texte_complet=null;
         break; 
    case "text":
         this.detailFileToUpload=null;
         this.objectTemp.fichier_details_name=null;
         this.objectTemp.lien_externe=null;
         break;  
    }
  }

  handleImageFileInput(evt:any) {
    let files: FileList = evt.target!['files'];
    if(this.objectTemp==null)return;
    this.imageFileToUpload = files.item(0);
    const originalfileName=this.imageFileToUpload?.name || ""; //.name , .size , .type

    //IMPORTANT : un suffix d'horodatage est ajouté au nom du fichier qui sera enregistré coté serveur
    //pour garantir une unicité de la ressource (pas d'écrasement d'ancien fichier de même nom)
    this.objectTemp.fichier_image_name=fileNameWithDateTimeSuffix(originalfileName)
  } 
  
  handleDetailFileInput(evt:any) {
    let files: FileList = evt.target!['files'];
    if(this.objectTemp==null)return;
    this.detailFileToUpload = files.item(0);
    const originalfileName=this.detailFileToUpload?.name || ""; //.name , .size , .type

    //IMPORTANT : un suffix d'horodatage est ajouté au nom du fichier qui sera enregistré coté serveur
    //pour garantir une unicité de la ressource (pas d'écrasement d'ancien fichier de même nom)
    this.objectTemp.fichier_details_name= fileNameWithDateTimeSuffix(originalfileName)
  } 

  genericCrudContext : GenericCrudContext<Publication,String> ;
  //specific subpart for Qcm or Contect or other Entity
  //this specific subpart is based on sub-sub-part "GenericContexHelper" implements by this class .


  constructor(public publicationService : PublicationService) {
    this.genericCrudContext = new GenericCrudContext<Publication,String>(this);
    this.genericCrudContext.requiredRole="admin"; //to use private URL for get
                                                  //IMPORTANT: public results without responses , private results with responses
    this.genericCrudContext.filterDefs=[
    ]
    this.genericCrudContext.availableActions="READ,NEW,ADD,DELETE" ; // not again  UPDATE/PUT with upload
    this.genericCrudContext.onUploadFormDataPrepareFn=()=>{
         const formData: FormData = new FormData();
         formData.append('imageFile' , this.imageFileToUpload!); //may be null
         formData.append('detailsFile' , this.detailFileToUpload!); //may be null
         formData.append('publication' , JSON.stringify(this.objectTemp));
         return formData;
    }
   }

  objectHelper(): ObjectHelper<Publication, String> {
      return new PublicationHelper();
  }

  crudHelper(): GenericCrudHelper<Publication, String> | null {
    return null;
}
  
  ngOnInit(): void {
  }
}
