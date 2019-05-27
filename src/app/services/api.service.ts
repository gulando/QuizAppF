import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Quiz, ExamType, QuizTheme, Question, AnswerType, Answer } from '../models/quiz.model';
import { catchError } from 'rxjs/operators';

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

  // /api/quiz / GetAllQuestionsByQuizThemes / 5 ? quizThemeIDs = 7 & quizThemeIDs=8"
  getAllQuestionsByQuizThemes(quizId: number, quizThemesIDs:string) {
    return this.http.get<Question[]>(`${this.api_url}/quiz/GetAllQuestionsByQuizThemes/${quizId}/?${quizThemesIDs}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAllQuestionsByExamType(quizId: number, examType: number) {
    return this.http.get<Question[]>(`${this.api_url}/quiz/GetAllQuestionsByExamType/${quizId}/${examType}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAccountSessions(account_id: number) {
    return this.http.get(`${this.api_url}/getAccountSessions?account_id=${account_id}`, { responseType: 'json' });
  }

  isAnswerCorrect(question_id: number, answersList:string) {
    //http://api.shtemaran.am//api/question/IsAnswerCorrect/29?answers=4
    return this.http.get<Answer>(`${this.api_url}/question/IsAnswerCorrect/${question_id}/?${answersList}`);
  }

  getAllAnswerTypes(){
    return this.http.get<AnswerType[]>(`${this.api_url}/answerType/GetAllAnswerTypes`);
  }

  

}
