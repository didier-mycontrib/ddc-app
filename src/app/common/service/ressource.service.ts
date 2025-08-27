import { Injectable } from '@angular/core';
import { Ressource } from '../data/ressource';
import { GenericRestCrudServiceWithUpload } from '../../shared/service/generic-rest-crud-service';

@Injectable({
  providedIn: 'root'
})
export class RessourceService extends GenericRestCrudServiceWithUpload<Ressource> {


constructor() { 
    super();
  }

  public override settingEntitiesNameAndApiBaseUrl(): void {
    this.apiBaseUrl = "/res-api/v1";
    this.entitiesName = "ressources";
    console.log("apiBaseUrl="+this.apiBaseUrl);
    console.log("entitiesName="+this.entitiesName);
  }
  
  public settingUploadBaseUrl(): void {
   this.uploadBaseUrl= "/res-api/v1/private/upload-ressource";
  }
 

}
