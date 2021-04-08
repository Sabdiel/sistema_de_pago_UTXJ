import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  private URL = "https://api-pagos-utxj.herokuapp.com/api";

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
   }

  get isLogged(): any {
    return this.loggedIn;
  }

  signUp(user: {}) {
    return this.http.post<any>(this.URL + 'signup', user);
  }

  signIn(user: {}) {
    return this.http.post<any>(this.URL + 'signin', user)
    .pipe(
      map((res: any) => {
      this.loggedIn = true;
      return res;
      }),
     );
  }

  insert(data: {}){
 return this.http.post<any>(this.URL+ 'insert', data);
  }
  private checkToken(): void {
    const user = localStorage.getItem('token') || null;
    if (user){
      const isExired = helper.isTokenExpired(user);
      const descrypt = helper.decodeToken(user);

      if (isExired) {
      this.loggedIn = false;
      window.alert('sesion expirada');
      localStorage.removeItem('token');
      this.router.navigate(['/signin']);
      }else{
        this.loggedIn = true ;
      }
    }
  }
}
