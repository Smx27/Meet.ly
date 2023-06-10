import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() userFromHome:any;
  @Output() OutputFromReg= new EventEmitter;
  model:any = {}
  registerAlert:boolean=false;
  constructor(public accountServices:AccountService,private toster:ToastrService) { }

  ngOnInit(): void {
  }

 /**
  * The function registers a user account and handles any errors that may occur.
  */
  register()
  {
    this.accountServices.register(this.model).subscribe({
      next: response=>{
        this.cancle()
      },
      error: error=> {
        this.toster.error(error.error)
        this.registerAlert = false;
      }
    })
  }

  /**
   * The function cancels an output from a registration and emits a false value while logging a
   * message.
   */
  cancle()
  {
    this.OutputFromReg.emit(false);
    console.log('Canclled');
  }

}
