import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Question, AnswerType } from '../../models/quiz.model';
import { FormControl, FormControlName } from '@angular/forms';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  questions: Question[] = [];
  examResults: object = {};
  curQuest = 0;
  currentAnswer:boolean = false;
  curAnsType:number = 0;
  nbCorrectAnswers = 0;
  nbAnswered = 0;
  allAnswerTypes: AnswerType[] = [];

  answerTypes = [];
  @Input() quizId: number;
  @Input() quizThemeIDs: string = "";
  @Input() examStarted: boolean;
  examFinished: boolean = false;

  constructor(
    private api: APIService
  ) {
    
    /* TODO: Here should be api call to getAllAnswerTypes, hardcodding for now */
    this.api.getAllAnswerTypes().subscribe(
      (data) => {
        this.allAnswerTypes = data;
        
        this.allAnswerTypes.map((el,i) => {
          switch (i) {
            case 0: // ԸՆՏՐՈՎԻ ՊԱՏԱՍԽԱՆՈՂ ԱՌԱՋԱԴՐԱՆՔՆԵՐ
              el.description = {
                type: "checkbox",
                count: 4,
                correctCount: 1,
                rows: 1
              }
              break;
            case 1: // ԿԱՐՃ ՊԱՏԱՍԽԱՆՈՎ ԱՌԱՋԱԴՐԱՆՔՆԵՐ, 1-ԻՆ ՏԵՍԱԿ
              el.description = {
                type: "number",
                count: 1,
                correctCount: 1,
                rows: 1
              }
              break;
            case 2: // ԿԱՐՃ ՊԱՏԱՍԽԱՆՈՎ ԱՌԱՋԱԴՐԱՆՔՆԵՐ, 2-ՐԴ ՏԵՍԱԿ
              el.description = {
                type: "checkbox",
                count: 9,
                correctCount: 6,
                rows: 1
              }
              break;
            case 3: // ՊՆԴՈՒՄՆԵՐԻ ՓՈՒՆՋ
              el.description = {
                type: "checkbox",
                count: 6,
                correctCount: null,
                rows: 3
              }
              break;
            default:
              break;
          }
        });
        this.resetAnswers();
      }
    )
  }

  ngOnInit() {
    
    this.api.getAllQuestionsByQuizThemes(this.quizId, this.quizThemeIDs).subscribe(
      (data) => {
        //console.log(this.quizId, data);
        this.questions = data || [];

        if (this.questions.length <= 0){
          this.questions = [
            { 
              "id": 15, "quizID": 5, "quizThemeID": 7, "questionTypeID": 10, "answerTypeID": 11,
              "quizName": "Հայոց լեզու և հայ գրականություն",
              "quizThemeName": "Հնչյունաբանություն",
              "questionText": "During development, you typically use the ng serve command to build, watch, and serve the application from local memory, using webpack-dev-server. When you are ready to deploy, however, you must use the ng build command to build the app and deploy the build artifacts elsewhere."
            },
            {
              "id": 17, "quizID": 5, "quizThemeID": 7, "questionTypeID": 11, "answerTypeID": 12,
              "quizName": "Հայոց լեզու և հայ գրականություն",
              "quizThemeName": "Հնչյունաբանություն",
              "questionText": "This section covers changes you may have make to the server or to files deployed to the server."
            },
            {
              "id": 18, "quizID": 5, "quizThemeID": 7, "questionTypeID": 11, "answerTypeID": 12,
              "quizName": "Հայոց լեզու և հայ գրականություն",
              "quizThemeName": "Հնչյունաբանություն",
              "questionText": "A routed application should support \"deep links\". A deep link is a URL that specifies a path to a component inside the app. For example, http://www.mysite.com/heroes/42 is a deep link to the hero detail page that displays the hero with id: 42."
            },
            {
              "id": 19, "quizID": 5, "quizThemeID": 7, "questionTypeID": 12, "answerTypeID": 13,
              "quizName": "Հայոց լեզու և հայ գրականություն",
              "quizThemeName": "Հնչյունաբանություն",
              "questionText": "A static server routinely returns index.html when it receives a request for http://www.mysite.com/. But it rejects http://www.mysite.com/heroes/42 and returns a 404 - Not Found error unless it is configured to return index.html instead."
            },
            {
              "id": 20, "quizID": 5, "quizThemeID": 7, "questionTypeID": 12, "answerTypeID": 13,
              "quizName": "Հայոց լեզու և հայ գրականություն",
              "quizThemeName": "Հնչյունաբանություն",
              "questionText":   "Production optimizations The --prod meta - flag engages the following build optimization features."
            },
            {
              "id": 21, "quizID": 5, "quizThemeID": 7, "questionTypeID": 13, "answerTypeID": 14,
              "quizName": "Հայոց լեզու և հայ գրականություն",
              "quizThemeName": "Հնչյունաբանություն",
              "questionText": "0"
            },
            {
              "id": 22, "quizID": 5, "quizThemeID": 7, "questionTypeID": 13, "answerTypeID": 14,
              "quizName": "Հայոց լեզու և հայ գրականություն",
              "quizThemeName": "Հնչյունաբանություն",
              "questionText": "GitHub Pages: you can't directly configure the GitHub Pages server, but you can add a 404 page. Copy index.html into 404.html. It will still be served as the 404 response, but the browser will process that page and load the app properly. It's also a good idea to serve from docs/ on master and to create a .nojekyll file Firebase hosting: add a rewrite rule."
            },
            {
              "id": 23, "quizID": 5, "quizThemeID": 7, "questionTypeID": 10, "answerTypeID": 11,
              "quizName": "Հայոց լեզու և հայ գրականություն",
              "quizThemeName": "Հնչյունաբանություն",
              "questionText": "sss"
            }
          ];
        }
      }
    );
  }

  nextQuestion(){
    if(this.curQuest < this.questions.length-1) {
      // Checking if the answer is confirmed
      if (this.examResults[this.questions[this.curQuest].id]){
        // this.answerTypes[0] = [false, false, false, false];
        this.resetAnswers();
        this.curQuest++;
        /* TODO: This is an hardcode, should be replaced */
      
        this.curAnsType = Math.floor(Math.random() * Math.floor(3));
        console.log(this.curAnsType );
      } else {
        // If question anser is not confirmed, we can't go forward
      }
      
    }
  }

  selectAnswer(ev, answer:number, row:number = 0, answerType: number = 0) {
    this.answerTypes[answerType][answer] = ev.target.checked;
  }

  confirmAnswer(answerId: number) {
    if (!this.examResults[this.questions[this.curQuest].id]) {
      let answer: any = '';
      switch (this.curAnsType) {
        //case 0:
        // Same as default case  
        //break;
        case 1:
          answer = this.answerTypes[this.curAnsType];
          break;
        //case 2:
        // Same as default case
        //  break;
        case 3:

          break;
        default:
          answer = this.answerTypes[this.curAnsType].map((x, i) => { 
            if (x) return i+1; 
          }).filter(x => x != undefined).join();
          break;
      }
      this.examResults[this.questions[this.curQuest].id] = answer;
      
      this.nbAnswered++;
      this.api.isAnswerCorrect(this.questions[this.curQuest].id).subscribe(
        (data) => {
          
          /* TODO: should be fixed when the back-end part is ready 
          this.currentAnswer = data;*/
          this.currentAnswer = Math.random() >= 0.5;
          console.log(this.currentAnswer);
          if (this.currentAnswer) {
            this.nbCorrectAnswers++;
          }
        }
      );
      
    
    } else {
      // The question is already answered, someone is trying to cheat
    }
    
  }

  makeArray(n:number = 0, value:any = false){
    if(value == 'range'){
      return Array.from(Array(n).keys())
    } else {
      return Array(n).fill(value, 0);
    }
  }
  

  saveAnser(answerId: number) {
    console.log(answerId);
  }

  startExam() {
    // Resetting all necessary params
    this.examFinished = false;
    this.examStarted = true;
    this.examResults = {};
    this.curQuest = 0;
    this.nbAnswered = 0;
    

  }

  resetAnswers() {
    this.answerTypes = [
      this.makeArray(this.allAnswerTypes[0].description.count),
      "",
      this.makeArray(this.allAnswerTypes[2].description.count),
      []
    ];
  }

  finishExam(){
    this.examFinished = true;
    this.examStarted = false;
  }

  showErrors(){
    // Hello
  }

}
