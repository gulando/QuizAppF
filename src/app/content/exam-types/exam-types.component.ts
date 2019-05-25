import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamType } from '../../models/quiz.model';
import { ThrowStmt } from '@angular/compiler';
import { APIService } from '../../services/api.service';
@Component({
  selector: 'app-exam-types',
  template: `<div class="row">
  <div class="col-md-4 offset-md-4" *ngIf="quizId==5; else underConstruction">
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
  <ng-template #underConstruction>
    <div class="col-md-8 offset-md-2 blurred" *ngIf="inited">
      <div class="text-center ">
          <h4>{{quizName}}</h4>
          <p>թեստը գտնվում է մշակման փուլում</p>
          <p>Խնդրում ենք վերադառնալ ավելի ուշ</p>
      </div>
    </div>
    </ng-template>
</div>`
})
export class ExamTypesComponent implements OnInit {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  
  private inited: boolean = false;
  private examTypeSub;
  private examTypes: ExamType[] = [];
  public quizId;
  private quizName;
  private link;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: APIService
  ) {
    this.examTypeSub = this.route.queryParams.subscribe(params => {
      this.inited = false;
      this.quizId = params['quizId'] || 0;
      this.quizName = params['quizName'] || '';
      this.link = params['link'] || '/';

        this.api.getAllExamTypes().subscribe((data: ExamType[]) => {
          this.examTypes = data;
        });
      
      // if (this.examTypes.length <= 0) {
      //   this.examTypes = [
      //     { "id": 1, "examTypeName": "Ավարտական" },
      //     { "id": 2, "examTypeName": "Միասնական" }
      //   ];
      // }
      this.inited = true;
    });

    
  }

  selectExamType(examTypeId: number) {
    this.router.navigate([this.link], { queryParams: { quizId: this.quizId, examType: examTypeId, quizName: this.quizName }, skipLocationChange: true });
  }

  ngOnInit() {
    

  }

}
