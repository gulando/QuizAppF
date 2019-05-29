import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})



export class AppComponent {
  title = 'shtemaran';
  constructor(
    // private http: HttpClient,
    ) { }

  ngOnInit() {
    // this.ngxLoader.start();
    //this.ngxLoader.startLoader('test_loader');
  //   // this.http.get(`https://api.npmjs.org/downloads/range/last-month/ngx-ui-loader`).subscribe((res: any) => {
  //   //   console.log(res);
  //   //   this.ngxLoader.stop();
  //   // });
  }
  // ngAfterViewInit(): void {
  //   // this.ngxLoader.stop();
  //   this.ngxLoader.stopLoader('test_loader');
  // //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //    //Add 'implements AfterViewInit' to the class.
    
  // }
}

