import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
    providedIn: 'root'
  })
export class CanActivateAdminRouteGuard implements CanActivate {

constructor(private _authService: AuthService) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this._authService.currentSecureMode==false)
        return true;
    else
       return this._authService.isUserAuthenticatedWithRole("admin");
    }
}

@Injectable({
    providedIn: 'root'
  })
export class CanActivateAdminRouteGuard implements CanActivate {

constructor(private _authService: AuthService) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this._authService.currentSecureMode==false)
        return true;
    else
       return this._authService.isUserAuthenticatedWithRole("admin");
    }
}