import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api.service';
import { QuizTheme } from '../../models/quiz.model';

const link= "tests";

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit, OnDestroy {
  private quizSub;
  private quizId = 0;
  private quizName = '';
  // private typeSub;
  public examType = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.quizSub = this.route.queryParams.subscribe(params => {
      this.quizId = params['quizId'] || 0;
      this.quizName = params['quizName'] || '';
      this.examType = params['examType'] || 0;

      if (!this.examType) {
        this.router.navigate(['chooseExamType/'], {
          queryParams: {
            quizId: this.quizId,
            quizName: this.quizName,
            link: link,
          }, skipLocationChange: true
        });
      }
    });
    
  }
  ngAfterViewInit(): void {
    // this.typeSub = this.route.queryParams.subscribe(params => {
    //   console.log(params);
      
    // });
    
  }

  ngOnDestroy() {
    this.quizSub.unsubscribe();
  }

}
