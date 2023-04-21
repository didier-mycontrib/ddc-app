import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyAuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let access_token = sessionStorage.getItem('access_token');//NB: access_token for angular-oauth2-oidc or ...
    if(access_token && access_token!=""){
        const authReq = request.clone({headers: 
            request.headers.set('Authorization', 'Bearer ' + access_token)});
        return next.handle(authReq);
    }
    else 
        return next.handle(request);
  }
}
