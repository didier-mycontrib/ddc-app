import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ressource } from '../data/ressource';
import { GenericRestCrudServiceWithUpload } from 'src/generic/service/generic-rest-crud-service';

@Injectable({
  providedIn: 'root'
})
export class RessourceService extends GenericRestCrudServiceWithUpload<Ressource> {
  public settingUploadBaseUrl(): void {
   this.uploadBaseUrl= "./res-api/private/upload-ressource";
  }
 
  public settingPublicAndPrivateBaseUrl(): void {
    this.publicBaseUrl = "./res-api/public/ressource" ; //avec ng serve --proxy-config proxy.conf.json
    this.privateBaseUrl = "./res-api/private/ressource" ;
  }

  constructor(http : HttpClient) { 
    super(http);
  }

}
