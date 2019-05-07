import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TestsComponent } from './content/tests/tests.component';
import { StoresComponent } from './content/stores/stores.component';
import { ErrorsComponent } from './content/errors/errors.component';
import { StatisticsComponent } from './content/statistics/statistics.component';
import { HttpClientModule } from '@angular/common/http';
import { ExamTypesComponent } from './content/exam-types/exam-types.component';
import { UnderConstructionComponent } from './content/under-construction/under-construction.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TestsComponent,
    StoresComponent,
    ErrorsComponent,
    StatisticsComponent,
    ExamTypesComponent,
    UnderConstructionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
