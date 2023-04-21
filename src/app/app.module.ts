import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { BsUtilModule } from 'src/bs-util/bs-util.module';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PresFormationComponent } from './services/prestations/pres-formation/pres-formation.component';
import { PresDeveloppementComponent } from './services/prestations/pres-developpement/pres-developpement.component';
import { PresConseilsComponent } from './services/prestations/pres-conseils/pres-conseils.component';
import { PreferTechnosComponent } from './services/divers/prefer-technos/prefer-technos.component';
import { DidierComponent } from './competences/didier/didier.component';
import { CvComponent } from './competences/cv/cv.component';
import { DomCompetencesComponent } from './competences/dom-competences/dom-competences.component';
import { PlansComponent } from './services/plans/plans.component';
import { ContributionsComponent } from './services/contributions/contributions.component';
import { DiversComponent } from './services/divers/divers.component';
import { DisponibilitesComponent } from './activites/disponibilites/disponibilites.component';
import { ContactComponent } from './activites/contact/contact.component';
import { PrestationsComponent } from './services/prestations/prestations.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { NewsComponent } from './services/divers/news/news.component';
import { AdminRessourcesComponent } from './admin/admin-ressources/admin-ressources.component';
import { GenericModule } from 'src/generic/generic.module';
import { ExternalLinksComponent } from './footer/external-links/external-links.component';
import { MentionsLegalesComponent } from './footer/mentions-legales/mentions-legales.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyAuthInterceptor } from './common/interceptor/my-auth-interceptor';
import { QcmComponent } from './services/qcm/qcm.component';
import { LogInOutComponent } from './log-in-out/log-in-out.component';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    PresFormationComponent,
    PresDeveloppementComponent,
    PresConseilsComponent,
    PreferTechnosComponent,
    DidierComponent,
    CvComponent,
    DomCompetencesComponent,
    PlansComponent,
    ContributionsComponent,
    DiversComponent,
    NewsComponent,
    DisponibilitesComponent,
    ContactComponent,
    PrestationsComponent,
    LoginComponent,
    LogInOutComponent,
    AdminNewsComponent,
    AdminRessourcesComponent,
    ExternalLinksComponent,
    MentionsLegalesComponent,
    QcmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TabsModule.forRoot(),BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    BsUtilModule,
    GenericModule,
    OAuthModule.forRoot()
  ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MyAuthInterceptor,
        multi: true
        }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
