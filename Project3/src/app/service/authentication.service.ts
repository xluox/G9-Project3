import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/xml',
    'Authorization': 'jwt-token'
  })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private SERVER_URL = "http://localhost:3000";

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private currentKey: HttpHeaders;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(email, password) {
        return this.http.post<any>(`${this.SERVER_URL}/auth/login`, { email, password } , {observe: 'response'})
            .pipe(map(data => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(data.body['user']));
                localStorage.setItem('token',data.body['token']['token'].toString());
                this.currentUserSubject.next(data.body['user']);
                // console.log(this.currentUserSubject.value);
                //console.log(user.headers);
                return data.body['user'];
            } 
          )  
          );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.clear();
        this.currentUserSubject.next(null);
    }


    register(user) {
      return this.http.post(`${this.SERVER_URL}/auth/register`, user, {observe: 'response'})
      .pipe(map(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(data.body['user']));
        localStorage.setItem('token',data.body['token']['token'].toString());
        this.currentUserSubject.next(data.body['user']);
        // console.log(this.currentUserSubject.value);
        //console.log(user.headers);
        return data.body['user'];
    } 
  )  
  );
  }
}
