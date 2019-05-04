import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresComponent } from './content/stores/stores.component';
import { StatisticsComponent } from './content/statistics/statistics.component';
import { ErrorsComponent } from './content/errors/errors.component';
import { TestsComponent } from './content/tests/tests.component';
import { ExamTypesComponent } from './content/exam-types/exam-types.component';

const routes: Routes = [{ path: 'stores', component: StoresComponent },
{ path: 'tests', component: TestsComponent },
{ path: 'errors', component: ErrorsComponent },
{ path: 'statistics', component: StatisticsComponent },
{ path: 'chooseExamType', component: ExamTypesComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
