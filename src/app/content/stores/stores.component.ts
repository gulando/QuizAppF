import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api.service';
import { QuizTheme } from '../../models/quiz.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

const link = "stores";

@Component({
  selector: 'app-store',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  private quizSub;
  private inited = false;
  private examStarted = false;
  private quizId = 0;
  private quizThemeIDs = '';
  private quizName = '';
  private quizThemes: QuizTheme[] = [];

  private quizThemeCheckboxes = {};
  private selectAllText = 'Ընտրել թեման';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api : APIService,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.quizSub = this.route.queryParams.subscribe(params => {
      this.ngxLoader.startLoader(link + '_loader');
      this.quizId = params['quizId'] || 0;
      this.quizName = params['quizName'] || '';
      this.inited = false;
      this.api.getQuizThemeByID(this.quizId).subscribe(
        (data: QuizTheme[]) => {
          this.quizThemes = data || [];
          if (!this.quizThemes) {
            // Something bad happened
          }
          this.quizThemes.map((el) => {
            this.quizThemeCheckboxes[el.id] = false;
          });
          this.inited = true;
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

          this.inited = true;
          
        }
      );
      this.ngxLoader.stopLoader(link + '_loader');
    });
  }

  ngOnInit() {
    // this.ngxLoader.start();
    // this.ngxLoader.startLoader(link + '_loader');
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
    this.examStarted = true;
    this.quizThemeIDs = Object.keys(this.quizThemeCheckboxes).filter(id => this.quizThemeCheckboxes[id]).map(id => {
      if (this.quizThemeCheckboxes[id]) {
        return "&quizThemeIDs="+id;
      }
    }).join("");
  }

  ngAfterViewInit(): void {
    // this.ngxLoader.stop();
    // this.ngxLoader.stopLoader(link+'_loader');
  }

  ngOnDestroy() {
    this.quizSub.unsubscribe();
  }
}

