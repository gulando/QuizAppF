import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-under-construction',
  template: `<div class="row">
  <div class="col-md-6 offset-md-3 blurred">
    <div class="text-center">
      <h4>
        Էջը գտնվում է մշակման փուլում
      </h4>
      <p>Խնդրում ենք վերադառնալ ավելի ուշ</p>
    </div>
  </div>
</div>`
})
export class UnderConstructionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  

}
