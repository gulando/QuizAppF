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
  private quizId = 0;
  private typeSub;
  private examType = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: APIService
  ) { }

  ngOnInit() {

    this.typeSub = this.route.queryParams.subscribe(params => {
      this.examType = params['examType'] || 0;
      console.log("examType ", this.examType);
      if (!this.examType) {
        // this.router.navigate(['product-list'], { queryParams: { page: this.page + 1 } });
        this.router.navigate(['chooseExamType/'], { queryParams: { quizId: this.quizId, link: link, 
          //quizName: this.quizName 
        }, skipLocationChange: true });
      }
    });
  }

  ngOnDestroy() {
    this.typeSub.unsubscribe();
  }

}
