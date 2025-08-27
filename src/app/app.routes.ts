import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginOutComponent } from './login-out/login-out.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { CvComponent } from './competences/cv/cv.component';
import { DomCompetencesComponent } from './competences/dom-competences/dom-competences.component';
import { ContactComponent } from './activites/contact/contact.component';
import { DisponibilitesComponent } from './activites/disponibilites/disponibilites.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminRessourcesComponent } from './admin/admin-ressources/admin-ressources.component';
import { authGuard } from './common/guard/auth.guard';
import { QcmComponent } from './services/qcm/qcm.component';
import { PresentationComponent } from './competences/presentation/presentation.component';
import { PrestationsComponent } from './services/prestations/prestations.component';
import { RealisationsComponent } from './services/realisations/realisations.component';
import { ExemplesComponent } from './services/exemples/exemples.component';
import { NewsComponent } from './activites/news/news.component';

export const routes: Routes = [
    { path: 'ngr-home', component: HomeComponent },

    { path: 'ngr-login-out', component: LoginOutComponent },
    { path: 'ngr-not-authorized', component: NotAuthorizedComponent },
    { path: 'ngr-admin-news', component: AdminNewsComponent , canActivate: [authGuard] } ,
    { path: 'ngr-admin-ressources', component: AdminRessourcesComponent , canActivate: [authGuard] } ,

    { path: 'ngr-presentation', component: PresentationComponent },
    { path: 'ngr-dom-competences', component: DomCompetencesComponent },
    { path: 'ngr-cv', component: CvComponent },

    { path: 'ngr-disponibilites', component: DisponibilitesComponent },
    { path: 'ngr-contact', component: ContactComponent },
    { path: 'ngr-news', component: NewsComponent },

    { path: 'ngr-qcm', component: QcmComponent },
    { path: 'ngr-prestations', component: PrestationsComponent },
    { path: 'ngr-exemples', component: ExemplesComponent },
    { path: 'ngr-realisations', component: RealisationsComponent },

    { path: '', redirectTo: '/ngr-home', pathMatch: 'full'},
    { path: '**', redirectTo: '/ngr-home', pathMatch: 'full'}
];
