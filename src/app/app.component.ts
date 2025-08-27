import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyTogglePanelComponent } from './shared/component/generic/my-toggle-panel/my-toggle-panel.component';
import { D2fNgxLayoutComponent } from './shared/component/layout/d2f-ngx-layout.component';
import { MenuDef } from './shared/data/menu-def';

@Component({
  selector: 'app-root',
  imports: [D2fNgxLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Didier DEFRANCE (site pro)';

  legalFooterMainText ="mentions légales"//"ddc app legal footer"

  appMenuDefs : MenuDef[] = [
    new MenuDef("accueil","/ngr-home"),
    new MenuDef("presentation","/ngr-presentation"),
    new MenuDef("contact","/ngr-contact"),
    new MenuDef("competences","/ngr-dom-competences"),
    new MenuDef("disponibilites","/ngr-disponibilites"),
    new MenuDef("cv","/ngr-cv"),
    
   
    new MenuDef("services ...",null,[
      new MenuDef("qcm","/ngr-qcm"),
      new MenuDef("prestations","/ngr-prestations"),
      new MenuDef("realisations","/ngr-realisations"),
      new MenuDef("exemples","/ngr-exemples"),
    ]),

    new MenuDef("news","/ngr-news"),
    
    new MenuDef("admin ...",null,[
       new MenuDef("login-out","/ngr-login-out"),
       new MenuDef("admin-news","/ngr-admin-news"),
       new MenuDef("admin-ressources","/ngr-admin-ressources"),
    ])
  ];

  quickMenuDefs : MenuDef[] = [
        new MenuDef("disponibilites","/ngr-disponibilites"),
        new MenuDef("cv","/ngr-cv"),
        new MenuDef("qcm","/ngr-qcm"),
  ];

  public ajustUrlWithEnvContext(url:string):string {
    let ajustUrl=url;
    const mainApiPrefix= "https://www.d-defrance.fr/"
    const absoluteUrl = process.env['ABSOLUTE_URL']|| "no";
    if(absoluteUrl=="yes"){
        ajustUrl=mainApiPrefix+ajustUrl
    }
    /*
    const apiKey = process.env['API_KEY']|| "";
    if(apiKey!=""){
        ajustUrl=`${ajustUrl}?apiKey=${apiKey}`;
    }
    */
    return ajustUrl;
  }
  
}
