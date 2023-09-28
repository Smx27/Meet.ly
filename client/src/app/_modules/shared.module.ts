import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';


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
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }),
    NgxGalleryModule,
    NgxSpinnerModule.forRoot({
      type:'pacman'
    }),
    FileUploadModule
  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule
  ]
})
export class SharedModule { }
