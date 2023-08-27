import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';



/* This is a module definition in Angular. It imports and configures two external modules:
`BsDropdownModule` from `ngx-bootstrap/dropdown` and `ToastrModule` from `ngx-toastr`. It also
imports `CommonModule` from `@angular/common`. The `declarations` array is empty, which means there
are no components, directives, or pipes declared in this module. The `exports` array makes the
`BsDropdownModule` and `ToastrModule` available for use in other modules that import `SharedModule`. */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    })
  ],
  exports:[
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
