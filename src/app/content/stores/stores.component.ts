import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api.service';
import { QuizTheme } from '../../models/quiz.model';

@Component({
  selector: 'app-store',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  private quizSub;
  private typeSub;
  private examType = 0;
  private quizId = 0;
  private quizName = '';
  private quizThemes: QuizTheme[] = [];
  private quizThemeCheckboxes = {};
  private selectAllText = 'Ընտրել թեման';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api : APIService
  ) { }

  ngOnInit() {
    // this.route.snapshot.paramMap.get("id");
    this.quizSub = this.route.queryParams.subscribe(params => {
      this.quizId = params['quizId'] || 0;
      this.quizName = params['quizName'] || '';
    });

    this.typeSub = this.route.queryParams.subscribe(params => {
      this.examType = params['examType'] || 0;
      console.log("examType ", this.examType);
      if(!this.examType){
        // this.router.navigate(['product-list'], { queryParams: { page: this.page + 1 } });
        this.router.navigate(['chooseExamType/'], { queryParams: { quizId: this.quizId, link: 'stores', quizName: this.quizName }, skipLocationChange: true });
      }

      this.api.getQuizThemeByID(this.quizId).subscribe(
        (data: QuizTheme[]) => {
        this.quizThemes = data;
        if(!this.quizThemes) {
          
        }
      },
      (error) => {
        this.quizThemes = [
          { "id": 7, "quizID": 5, "quizThemeName": "Հնչյունաբանություն", "quizName": "Հայոց լեզու և հայ գրականություն" },
          { "id": 8, "quizID": 5, "quizThemeName": "Բառագիտություն", "quizName": "Հայոց լեզու և հայ գրականություն" },
          { "id": 9, "quizID": 5, "quizThemeName": "Ձևաբանություն", "quizName": "Հայոց լեզու և հայ գրականություն" },
          { "id": 10, "quizID": 5, "quizThemeName": "Շարահյուսություն", "quizName": "Հայոց լեզու և հայ գրականություն" },
          { "id": 11, "quizID": 5, "quizThemeName": "Կետադրություն", "quizName": "Հայոց լեզու և հայ գրականություն" },
          { "id": 12, "quizID": 5, "quizThemeName": "Կապակցված խոսք", "quizName": "Հայոց լեզու և հայ գրականություն" },
          { "id": 13, "quizID": 5, "quizThemeName": "Ոճագիտություն", "quizName": "Հայոց լեզու և հայ գրականություն" },
          { "id": 14, "quizID": 5, "quizThemeName": "Ընդհանուր գիտելիքներ", "quizName": "Հայոց լեզու և հայ գրականություն" }, { "id": 15, "quizID": 5, "quizThemeName": "Գրականություն", "quizName": "Հայոց լեզու և հայ գրականություն" }, { "id": 16, "quizID": 5, "quizThemeName": "Պնդումների փունջ", "quizName": "Հայոց լեզու և հայ գրականություն" }
        ];
        this.quizThemes.map((el) => {
          this.quizThemeCheckboxes[el.id] = false;
        });
      }
      );
    });
  }

  selectAll(ev) {
    if (ev.target.checked){
      this.selectAllText = 'Ընտրել բոլորը'
    } else {
      this.selectAllText = 'Ընտրել թեման'
    }
    Object.keys(this.quizThemeCheckboxes).map(id => this.quizThemeCheckboxes[id] = ev.target.checked);
  }

  startExam() {
    console.log("Here we go!");
  }

  ngOnDestroy() {
    this.typeSub.unsubscribe();
    this.quizSub.unsubscribe();
  }
}

