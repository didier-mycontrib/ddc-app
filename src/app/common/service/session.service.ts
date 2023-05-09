import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthErrorEvent, OAuthInfoEvent, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { User } from '../data/user';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public currentSecureMode : boolean =false; //=false; //temporairement false en début phase de dev pour premier tests !!!!!

  private _user = new User();

  public get user(){ return this._user;}

  public set user(u:User){
    this._user=u;
    sessionStorage.setItem("session.user",JSON.stringify(this._user));
  }

 
  constructor(private oauthService: OAuthService , private router : Router, private location: Location) { 
        //Location with CommonModule in app.module.ts
        this.initOAuthServiceForCodeFlow();
        let sUser = sessionStorage.getItem("session.user");
        if(sUser) {
          this._user = JSON.parse(sUser);
        }
  }

  initOAuthServiceForCodeFlow(){
  

    const authCodeFlowConfig: AuthConfig = {
      // Url of the Identity Provider
     

      //issuer: 'https://www.d-defrance.fr/keycloak/realms/sandboxrealm',
      issuer: 'https://www.d-defrance.fr/keycloak/realms/d2frealm',
   
  
      // URL of the SPA to redirect the user to after login
      //redirectUri: window.location.origin + "/ngr-loggedIn",

      silentRefreshRedirectUri: window.location.origin + this.location.prepareExternalUrl("/silent-refresh.html"),
      useSilentRefresh: true,
      
      postLogoutRedirectUri : window.location.origin +  this.location.prepareExternalUrl("/ngr-logInOut"), 
      //ou /ngr-welcome ou ...
  
      // The SPA's id. The SPA is registered with this id at the auth-server
      //clientId: 'anywebappclient',
     clientId: 'd2fclient',
      //clientSecret if necessary (not very useful for web SPA)
      //dummyClientSecret is required if client not public (client authentication: on + credential in keycloak)
	  //dummyClientSecret: 'DMzPzIV2OQAphSbR84D7ebwxjrUNBgq5' ,
      responseType: 'code',
  
      // set the scope for the permissions the client should request
      // The first four are defined by OIDC.
      // Important: Request offline_access to get a refresh token
      // The api scope is a usecase specific one
      scope: 'openid profile resource.read resource.write resource.delete',
  
      showDebugInformation: true,
    };
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.oidc = true; // ID_Token

    this.oauthService.setStorage(sessionStorage);
    
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events.subscribe(
      event => {
        if (event instanceof OAuthSuccessEvent) {
          //console.log("OAuthSuccessEvent: "+JSON.stringify(event));
          console.log("OAuthSuccessEvent: "+event.type);
          this.manageSuccessEvent(event);
        }
        if (event instanceof OAuthInfoEvent) {
         // console.log("OAuthInfoEvent: "+JSON.stringify(event));
         console.log("OAuthInfoEvent: "+event.type);
        }
        if (event instanceof OAuthErrorEvent) {
         // console.error("OAuthErrorEvent: "+JSON.stringify(event));
         console.log("OAuthErrorEvent: "+event.type);
        } else {
          console.warn(event.type);
        }
      });

  }//end of initOAuthServiceForCodeFlow

  manageSuccessEvent(event : OAuthSuccessEvent){
    if(event.type=="token_received" ){
      console.log("***** token_received ****")
      this._user.authenticated = true;
      let grantedScopesObj : object = this.oauthService.getGrantedScopes();
      this._user.grantedScopes =<any> grantedScopesObj;
      console.log("grantedScopes="+JSON.stringify(this._user.grantedScopes));

      var claims : any = this.oauthService.getIdentityClaims();
      console.log("claims="+JSON.stringify(claims))
      if (claims) {
        this._user.username= claims.preferred_username + "("+ claims.name + ")";
        if(claims.preferred_username=="d2f")
           this._user.roles="admin";
        else 
           this._user.roles="user";
      }
      
      

      /*
      //not necessary with popup and silent-refresh
      let savedData = sessionStorage.getItem("data");
      if(savedData){
        this.data = JSON.parse(savedData)
      }
      */
     if(this.oauthService.silentRefreshRedirectUri != null){
       //this.router.navigateByUrl("/ngr-loggedIn");
       this.router.navigateByUrl("/ngr-welcome"); //with message form this SessionService if successuf login
     }
    }
  }


  delegateOidcLogin(){
      /*
      //not necessary with popup and silent-refresh:
      sessionStorage.setItem("data",JSON.stringify(this.data)) //store session data before redirect and lost
     */

      //this.oauthService.initImplicitFlow(); //Attention: possible que si configuré par le serveur OAuth2/OIDC .
      //this.oauthService.initCodeFlow(); //c'est mieux

      //this.oauthService.initLoginFlow(); //appel en interne
      //.initImplicitFlow(); ou .initCodeFlow(); 
      //selon la configuration préalablement enregistrée.

      this.oauthService.initLoginFlowInPopup();
  }

  oidcLogout(){
       //this.oauthService....
       this.oauthService.logOut(); //clear tokens in storage and redirect to logOutEndpoint
       //this.oauthService.revokeTokenAndLogout(); //warning : problems if no CORS settings !!!!

       //delete old cookies (oauth2/oidc/keycloak):
       document.cookie = "AUTH_SESSION_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       document.cookie = "AUTH_SESSION_ID_LEGACY=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

 

  public get accessTokenString() : string {
    return this.oauthService.getAccessToken();
  }

}
