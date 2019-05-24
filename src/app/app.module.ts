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
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'white',
  overlayColor: "rgba(43, 40, 42, .9)",
  fgsColor: "#D4D4DD", // "#140700", // Foreground (icon) color
  //bgsPosition: POSITION.bottomCenter,
  // bgsSize: 40,
  blur: 150,
  //bgsType: SPINNER.cubeGrid, // background spinner type
  fgsType: SPINNER.cubeGrid, // foreground spinner type
  pbColor: "white", // Progress bar color
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 3, // progress bar thickness
};

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
    HttpClientModule,
 // import NgxUiLoaderRouterModule. By default, it will show foreground loader.
    // If you need to show background spinner, do as follow:
    // NgxUiLoaderRouterModule.forRoot({ showForeground: false })
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    // NgxUiLoaderHttpModule.forRoot({ showForeground: true, loaderId: 'exam_loader' })
  ],
  providers: [HttpErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
