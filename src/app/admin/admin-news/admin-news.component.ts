import { Component, OnInit } from '@angular/core';
import { GenericCrudAbstractContextHelper } from '../../shared/component/crud/abstract/GenericCrudAbstractContextHelper';
import { GenericCrudContext } from '../../shared/component/crud/GenericCrudContext';
import { Publication } from '../../common/data/publication';
import { PublicationService } from '../../common/service/publication.service';
import { ObjectHelper } from '../../shared/helper/object-helper';
import { GenericCrudHelper } from '../../shared/component/crud/abstract/GenericCrudHelper';
import { PublicationHelper } from '../../common/helper/publication-helper';
import { FormsModule } from '@angular/forms';
import { GenericCrudComponent } from '../../shared/component/crud/generic-crud/generic-crud.component';
import { MyFormGroupWithLabelComponent } from '../../shared/component/generic/my-form-group-with-label/my-form-group-with-label.component';

@Component({
  selector: 'app-admin-news',
  imports: [FormsModule,GenericCrudComponent, MyFormGroupWithLabelComponent],
  templateUrl: './admin-news.component.html',
  styleUrl: './admin-news.component.scss'
})
export class AdminNewsComponent implements OnInit ,  GenericCrudAbstractContextHelper<Publication,String>{

  genericCrudContext : GenericCrudContext<Publication,String> ;
  //specific subpart for Qcm or Contect or other Entity
  //this specific subpart is based on sub-sub-part "GenericContexHelper" implements by this class .

  constructor(public publicationService : PublicationService) {
    this.genericCrudContext = new GenericCrudContext<Publication,String>(this);
    this.genericCrudContext.requiredRole="admin"; //to use private URL for get
                                                  //IMPORTANT: public results without responses , private results with responses
    this.genericCrudContext.filterDefs=[
    ]
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
