import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamType } from '../../models/quiz.model';
import { ThrowStmt } from '@angular/compiler';
import { APIService } from '../../services/api.service';
@Component({
  selector: 'app-exam-types',
  template: `<div class="row">
  <div class="col-md-4 offset-md-4">
    <div class="text-center">
      <p>{{quizName}}</p>
      <div class="row">
        <div class="col-md-8 offset-md-2 col-sm-12">
          <p *ngFor="let examType of examTypes">
            <button type="button" class="btn btn-sm sht btn-block" (click)="selectExamType(examType.id)">
              {{examType.examTypeName}}              
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>`
})
export class ExamTypesComponent implements OnInit {
  private examTypeSub;
  private examTypes: ExamType[] = [];
  private quizId;
  private quizName;
  private link;

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: APIService
  ) {
    this.api.getAllExamTypes().subscribe((data: ExamType[]) => {
      this.examTypes = data;

    });
    if (this.examTypes.length <= 0) {
      this.examTypes = [
        { "id": 1, "examTypeName": "Ավարտական" }, 
        { "id": 2, "examTypeName": "Միասնական" }
      ];
    }
  }

  selectExamType(examTypeId: number) {
    console.log(this.link, { quizId: this.quizId, examType: examTypeId, quizName: this.quizName});
    this.router.navigate([this.link], { queryParams: { quizId: this.quizId, examType: examTypeId, quizName: this.quizName }, skipLocationChange: true });
  }

  ngOnInit() {
    this.examTypeSub = this.route.queryParams.subscribe(params => {
      this.quizId = params['quizId'] || 0;
      this.quizName = params['quizName'] || '';
      this.link = params['link'] || '/';
      console.log("ExamType component", this.quizId, this.quizName, this.link);
      // if (!this.examType) {
      //   // this.router.navigate(['product-list'], { queryParams: { page: this.page + 1 } });
      //   this.router.navigate(['chooseExamType'], { queryParams: { page: 'stores' } });
      // }
    });
    
    
  }

}
