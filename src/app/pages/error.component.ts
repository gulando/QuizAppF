import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `<div class="row">
  <div class="col-md-8 offset-md-2 blurred">
    <div class="text-center">
      <h4>
          Ներողություն, տեղի է ունեցել ծրագրային սխալ։
      </h4>
      <p>Խնդրում ենք վերադառնալ ավելի ուշ</p>
    </div>
  </div>
</div>`
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
