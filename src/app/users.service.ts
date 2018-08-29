
import {User} from './User';

import { Injectable } from '@angular/core';
import {Form} from './form';
import {Field} from './Field';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private UsersUrl= 'http://localhost:55015/api/Users';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

getInputs(id:number): Observable<User[]>{
    const url = `${this.UsersUrl}/${id}`;
    return this.http.get<User[]>(url).pipe( tap(_ => this.log(`fetched form id=${id}`)),
      catchError(this.handleError<User[]>(`getInputs id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

 /** POST: add a new form to the server */
 addNewUser (user: User): Observable<User> {
  return this.http.post<Form>(this.UsersUrl, user, httpOptions).pipe(
    tap((user: User) => this.log(`added new User w/ id=${user.id}`)),
    catchError(this.handleError<User>('addUser'))
    );
}
}
