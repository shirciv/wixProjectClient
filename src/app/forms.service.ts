import { Injectable } from '@angular/core';
import {Form} from './form';
import {Field} from './Field';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
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


export class FormsService {

  private formsUrl= 'http://localhost:55015/api/Forms';

  constructor(private http: HttpClient,
             private messageService: MessageService) { }

  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.formsUrl)
     .pipe(tap(forms=> this.log('fetched forms')),catchError(this.handleError('getForms',[])));
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
    this.messageService.add(`FormService: ${message}`);
  }

  getFields(id: number): Observable<Field[]> {
    const url = `${this.formsUrl}/${id}`;
    return this.http.get<Field[]>(url);
  }

  /** POST: add a new form to the server */
  addNewForm (form: Form): Observable<Form> {
    return this.http.post<Form>(this.formsUrl, form, httpOptions).pipe(
      tap((form: Form) => this.log(`added new form w/ id=${form.id}`)),
      catchError(this.handleError<Form>('addForm'))
      );
  } 

  updateForm (form: Form): Observable<any> {
    return this.http.put(this.formsUrl, form, httpOptions).pipe(
      tap(_ => this.log(`updated form numOfSub`)),
      catchError(this.handleError<any>('updateForm'))
    );
  }

  
}


