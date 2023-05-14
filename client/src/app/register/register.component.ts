import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() userFromHome:any;
  model:any = {}

  constructor(public accountServices:AccountService) { }

  ngOnInit(): void {
  }

  register()
  {
    this.accountServices.register(this.model).subscribe({
      next: response=>{
        console.log(response);
      },
      error: error=> console.log(error)
    })
  }

  cancle()
  {
    console.log('Canclled');
  }

}
