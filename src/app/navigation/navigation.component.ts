import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Quiz } from '../models/quiz.model';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  menu: Array<Object> = [
    { name: 'Շտեմարաններ', link: 'stores' },
    { name: 'Թեստեր', link: 'tests' },
    { name: 'Սխալներ', link: 'errors'},
    { name: 'Վիճակագրություն', link: 'statistics'}
  ];
  quizes: Quiz[] = [];
  submenuHided = false;
  selectedItem:String = '';

  constructor(private api: APIService) { }

  ngOnInit() {
    this.api.getQuizes().subscribe((data: Quiz[]) => {
      this.quizes = data;
      
    });
    if(this.quizes.length <=0){
      this.quizes = [{
        id: 1,
        quizName: "Հայոց լեզու և գրականություն",
        quizThemes: null,
        questionTypes: null,
        answerTypes: null,
        questions: null
      }];
    }
  }

  listClick(event, newValue) {
    this.submenuHided = false;
    this.selectedItem = newValue;
  }

  hideSubmenu() {this.submenuHided = true;}

}
