import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/'
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map(user=> {
        if(user) {
          localStorage.setItem('user',JSON.stringify(<User>user));          
          this.currentUserSource.next(<User>user);
        }
      })
    );
  }

  register(model : any){
    return this.http.post(this.baseUrl + 'account/register' , model).pipe(
      map(user=>{
        if(user) {
          localStorage.setItem('user',JSON.stringify(<User>user));
          this.currentUserSource.next(<User>user);
        }
      })
    )
  }
  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}


