import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Question } from '../../models/quiz.model';
import { FormControl, FormControlName } from '@angular/forms';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  questions: Question[] = [];
  currentQuestion = 0;
  nbAnswered = 0;
  answerTypes = {
    "1": [false, false, false, false],
    "2": [],
    "3": [],
    "4": []
  };
  @Input() quizId: number;
  @Input() quizThemeIDs: string;
  @Input() examStarted: boolean;

  examResults : object = {};

  constructor(
    private api: APIService
  ) { }

  ngOnInit() {
    this.api.getAllQuestionsByQuizThemes(this.quizId, this.quizThemeIDs).subscribe(
      (data) => {
        console.log(this.quizId, data);
        this.questions = data;
      }
    );
  }

  nextQuestion(){
    if(this.currentQuestion < this.questions.length-1) {
      // Checking if the answer is confirmed
      if (this.examResults[this.questions[this.currentQuestion].id]){
        this.answerTypes[1] = [false, false, false, false];
        this.currentQuestion++;
      } else {
        // If question anser is not confirmed, we can't go forward
      }
      
    }
  }

  selectAnswer(ev, answer:number) {
    this.answerTypes[1][answer] = ev.target.checked;
  }

  confirmAnswer(answerId: number) {
    if (!this.examResults[this.questions[this.currentQuestion].id]) {
      this.examResults[this.questions[this.currentQuestion].id] = this.answerTypes[1];
      this.nbAnswered++;
    } else {
      // The question is already answered, someone is trying to cheat
    }
    
  }

  saveAnser(answerId: number) {
    console.log(answerId);
  }

}
