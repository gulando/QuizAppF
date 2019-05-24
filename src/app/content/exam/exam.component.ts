import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Question, AnswerType } from '../../models/quiz.model';
// import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  questions: Question[] = [];
  examResults: object = {};
  curQuest = 0;
  currentAnswer:number = 0;
  curAnsType:number = 0; // Contains the index of the answerType
  nbCorrectAnswers = 0;
  nbAnswered = 0;
  nbUnits = 0;
  allAnswerTypes: AnswerType[] = [];
  labels = ['ՃԻՇՏ Է', 'ՍԽԱԼ Է', 'ՉԳԻՏԵՄ'];
  inputTypes= ['checkbox', 'input', 'checkbox', 'checkbox'];
  /* None = 0, CheckBox = 1, Input = 2, RadioGroup = 3 */

  answerTypes = [];
  @Input() quizId: number;
  @Input() quizThemeIDs: string = "";
  @Input() examStarted: boolean;
  examFinished: boolean = false;

  constructor( private api: APIService, private ngxLoader: NgxUiLoaderService ) {
    this.api.getAllAnswerTypes().subscribe(
      (data) => {
        this.allAnswerTypes = data || [];
        this.resetAnswers();
      }
    )
  }

  getIndex(answerId:number){
    switch (answerId) {
      case 11: // ԸՆՏՐՈՎԻ ՊԱՏԱՍԽԱՆՈՂ ԱՌԱՋԱԴՐԱՆՔՆԵՐ
        return 0; break;
      case 12: // ԿԱՐՃ ՊԱՏԱՍԽԱՆՈՎ ԱՌԱՋԱԴՐԱՆՔՆԵՐ, 1-ԻՆ ՏԵՍԱԿ
        return 1; break;
      case 13: // ԿԱՐՃ ՊԱՏԱՍԽԱՆՈՎ ԱՌԱՋԱԴՐԱՆՔՆԵՐ, 2-ՐԴ ՏԵՍԱԿ
        return 2; break;
      case 14: // ՊՆԴՈՒՄՆԵՐԻ ՓՈՒՆՋ
        return 3; break;
      default: return 0;
    }
  }

  ngOnInit() {
    this.ngxLoader.startLoader('exam_loader');
    this.api.getAllQuestionsByQuizThemes(this.quizId, this.quizThemeIDs).subscribe(
      (data) => {
        this.questions = data || [];
        this.curAnsType = this.getIndex(this.questions[this.curQuest].answerTypeID);
        this.ngxLoader.stopLoader('exam_loader');
      }
    );
  }

  nextQuestion(){
    if(this.curQuest < this.questions.length-1) {
      // Checking if the answer is confirmed
      //if (this.examResults[this.questions[this.curQuest].id]){
        this.resetAnswers();
        this.curQuest++;
        /* TODO: This is an hardcode, should be replaced */
        //this.curAnsType = this.getIndex(this.questions[this.curQuest].answerTypeID);
        this.curAnsType = Math.floor(Math.random() * Math.floor(4));

     /* } else {
        // If question anser is not confirmed, we can't go forward
      }*/
    }
  }

  selectAnswer(ev, answer: number, answerType: number = 0, row: number = undefined) {
    if(row != undefined){
      this.answerTypes[answerType][row][answer] = ev.target.checked;
    } else {
      this.answerTypes[answerType][answer] = ev.target.checked;
    }
  }

  confirmAnswer(answerId: number) {
    let answersList = '';
    if (!this.examResults[this.questions[this.curQuest].id]) {
      let answer: any = '';
      if (this.curAnsType == 1){
        answer = this.answerTypes[this.curAnsType];
      } else {
        answer = this.answerTypes[this.curAnsType].map((rowArr, row) => {
          return this.answerTypes[this.curAnsType][row].map((x, i) => {
            if (x) return i + 1;
          }).filter(x => x != undefined).join();
        });
      }

      if (typeof answer == "object" && answer.length > 1 ) {
        this.examResults[this.questions[this.curQuest].id] = answer;
        answersList = answer.map(val => {
          return "&answers=" + val;
        }).join('');
      } else if (typeof answer != "object"){
        this.examResults[this.questions[this.curQuest].id] = answer;
        answersList = '&answers=' + answer;
      } else {
        this.examResults[this.questions[this.curQuest].id] = answer[0];
        answersList = '&answers=' + answer[0];
      }

      this.nbAnswered++;

      this.api.isAnswerCorrect(this.questions[this.curQuest].id, answersList).subscribe(
        (data) => {
          /* TODO: should be fixed when the back-end part is ready */
          this.currentAnswer = data;
          this.currentAnswer = Math.floor(Math.random() * Math.floor(6));
          //this.currentAnswer = Math.random() >= 0.5;
          if (this.currentAnswer > 0 && this.curQuest < this.questions.length - 1) {
            this.nbCorrectAnswers++;
          }
          this.nbUnits += this.currentAnswer;
        }
      );
      // 
      // console.log(this.currentAnswer);
      // if (this.currentAnswer && this.curQuest < this.questions.length - 1) {
      //   this.nbCorrectAnswers++;
      // }
    } else {
      // The question is already answered, someone is trying to cheat
    }
  }

  makeArray(n:number = 0, value:any = false, rows:number = undefined){
    let finalArray = [];
    let fakeRow = rows || 1;

    for (let row = 0; row < fakeRow; row++){
      if (value == 'range') {
        finalArray.push(Array.from(Array(n).keys()))
      } else {
        finalArray.push(Array(n).fill(value, 0));
      }
    }
    if (rows == undefined){
      return finalArray[0];
    } else {
      return finalArray;
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
    this.nbCorrectAnswers = 0;
    this.nbUnits = 0;
    this.resetAnswers();
  }

 // (n: number = 0, value: any = false, rows: number = 1)
  resetAnswers() {
    this.answerTypes = [
      // this.makeArray(this.allAnswerTypes[0].answerTypeConfiguration.count),
      this.makeArray(this.allAnswerTypes[0].answerTypeConfiguration.count, false, this.allAnswerTypes[0].answerTypeConfiguration.rowCount),
      "",
     // [this.makeArray(this.allAnswerTypes[2].answerTypeConfiguration.count)],
      this.makeArray(this.allAnswerTypes[2].answerTypeConfiguration.count, false, this.allAnswerTypes[2].answerTypeConfiguration.rowCount),
      this.makeArray(this.allAnswerTypes[3].answerTypeConfiguration.count,false,this.allAnswerTypes[3].answerTypeConfiguration.rowCount)
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
