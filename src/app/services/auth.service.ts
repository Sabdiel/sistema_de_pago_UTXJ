import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "https://api-pagos-utxj.herokuapp.com/api "

  constructor(private http: HttpClient) { }

  signUp(user: {}) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signIn(user: {}) {
    return this.http.post<any>(this.URL + '/signin', user);
  }
}
