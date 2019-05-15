import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TestsComponent } from './content/tests/tests.component';
import { StoresComponent } from './content/stores/stores.component';
import { ErrorsComponent } from './content/errors/errors.component';
import { StatisticsComponent } from './content/statistics/statistics.component';
import { HttpClientModule } from '@angular/common/http';
import { ExamTypesComponent } from './content/exam-types/exam-types.component';
import { UnderConstructionComponent } from './pages/under-construction.component';
import { ExamComponent } from './content/exam/exam.component';
import { ErrorComponent } from './pages/error.component';
import { HttpErrorInterceptorProvider } from './services/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TestsComponent,
    StoresComponent,
    ErrorsComponent,
    StatisticsComponent,
    ExamTypesComponent,
    UnderConstructionComponent,
    ExamComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
