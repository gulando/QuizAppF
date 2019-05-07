import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Quiz, ExamType, QuizTheme } from '../models/quiz.model';
//import { catchError } from 'rxjs/operators/catchError';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  httpOptions = {
    headers: new HttpHeaders(environment.httpHeadersJSON)
  };
  api_url = environment.api_url;
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  saveAsCSV(data: object) {
    return this.http.post<any>(`${this.api_url}/saveAsCSV`, { data: data }); //, this.httpOptions
  }

  // readInputJSON(){
  //   return this.http.get('../../assets/data.json');
  // }


  // list(): Observable<Course[]> {
  //   const url = `${this.baseUrl}/`;
  //   return this.http.get(url);
  // }

  // public getDetails(): Promise<Details[]> {
  //   return this.http
  //     .get<Details>(`${this.baseUrl}/api/details`)
  //     .map(response => {
  //       const array = JSON.parse(response.json()) as any[];
  //       const details = array.map(data => new Details(data));
  //       return details;
  //     })
  //     .toPromise();
  // }

  getQuizes() {
    return this.http.get<Quiz[]>(`${this.api_url}/quiz/GetAllQuizes`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getQuizThemeByID(quizId: number) {
    return this.http.get<QuizTheme[]>(`${this.api_url}/quiz/GetAllQuizThemesByQuizID/${quizId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAllExamTypes() {
    return this.http.get<ExamType[]>(`${this.api_url}/examType/GetAllExamTypes`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  ///  /api/quiz / GetAllQuestionsByQuizThemes / quizID / list < int > quizThemesIDs
  GetAllQuestionsByQuizThemes(quizId: number, quizThemesIDs:String) {
    return this.http.get<ExamType[]>(`${this.api_url}/quiz/GetAllQuestionsByQuizThemes/${quizId}/list/quizThemesIDs`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

 


  // getQuizes(): Observable<Quiz[]> {
  //  // if(environment.production){
  //     //return this.http.get(`${this.api_url}/quiz/GetAllQuizes?id=${id}`, { responseType: 'json' });
  //     return this.http.get(`${this.api_url}/quiz/GetAllQuizes`, { responseType: 'json' });
  //   // } else {
  //   //   return [
  //   //     {id: 1, quizName: 'Հայոց լեզու և գրականություն'},
  //   //     {id: 2, quizName: 'գրականություն' }
  //   //   ]
  //   // }
    
  // }

  getAccountSessions(account_id: number) {
    return this.http.get(`${this.api_url}/getAccountSessions?account_id=${account_id}`, { responseType: 'json' });
  }

  // async getDefaultConfig(id:number): Promise<any> {
  //   try {
  //     let response = await this.http.get(`${this.api_url}/defaultConfig?id=${id}`).toPromise();
  //     return response[0];

  //   } catch (error) {
  //     await this.handleError(error);
  //   }
  // }

}
