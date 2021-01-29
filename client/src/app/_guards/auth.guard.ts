import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { observable, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { BlockLike } from 'typescript';
import { Router } from '@angular/router';

import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService, private router : Router){}


  canActivate(): Observable<any> {
    return  this.accountService.currentUser$.pipe(
      map(user => {
        if(user) {
          return true;
        } 
        else{
          this.toastr.error('You shall not pass')
          this.router.navigateByUrl('/');
          return false;
        }
       
      })
    )
  }
  
}
