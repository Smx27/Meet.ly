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

  cancle()
  {
    this.OutputFromReg.emit(false);
    console.log('Canclled');
  }

}
