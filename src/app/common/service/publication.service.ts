import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Publication } from "../data/publication";
import { map } from 'rxjs/operators';
import { GenericRestCrudServiceWithUpload } from '../../shared/service/generic-rest-crud-service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService extends GenericRestCrudServiceWithUpload<Publication>{

  constructor() { 
    super();
  }

  public override settingEntitiesNameAndApiBaseUrl(): void {
    this.apiBaseUrl = "/news-api/v1";
    this.entitiesName = "publications";
    console.log("apiBaseUrl="+this.apiBaseUrl);
    console.log("entitiesName="+this.entitiesName);
  }
  
  public settingUploadBaseUrl(): void {
    this.uploadBaseUrl="/news-api/v1/private/upload-publication";
  }

}
