import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Post} from '../models/post'
import { Observable , of} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';
import {postdata} from '../models/postdata'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'//,
    //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGNjYmY3OGExNjk4MWQyYzlkYjBkZTUiLCJpYXQiOjE1NzUyOTYxMjIsImV4cCI6MTU3NTI5OTcyMn0.Rqmg1a6-La1N1I121HVUUPenel7euQ7DU0SU1QkwNvk'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  getAllPost() : Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(this.SERVER_URL + '/posts', { observe: 'response' });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  // getAllPost(): Observable<any> {
  //   return this.http.get<Post[]>(this.SERVER_URL + '/posts', httpOptions).pipe(
  //     retry(3), catchError(this.handleError<Post[]>('getAllPost', [])));
  // }

  private log(message: string) {
    console.log(message);
  }


  addPost(post: postdata): Observable<postdata> {
    var token= "";
    if(localStorage.getItem('token')){
      token =   localStorage.getItem('token');
      const headers= new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token      
      });

      return this.http.post<postdata>(this.SERVER_URL + '/posts', post, {headers: headers})
      .pipe(
        catchError(this.handleError('addPost', post))
      );
    }


  }

}
