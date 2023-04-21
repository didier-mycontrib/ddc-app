import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../service/session.service';

@Injectable({
    providedIn: 'root'
  })
export class CanActivatePublisherRouteGuard {

constructor(private _sessionService: SessionService) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this._sessionService.currentSecureMode==false)
        return true;
    else
       return this._sessionService.user.roles.includes("publisher");
    }
}

//***********************************

@Injectable({
    providedIn: 'root'
  })
export class CanActivateAdminRouteGuard  {

constructor(private _sessionService: SessionService) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this._sessionService.currentSecureMode==false)
        return true;
    else
       return this._sessionService.user.roles.includes("admin");
    }
}