import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, EmailValidator, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';


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
  registerForm : FormGroup = new FormGroup({});


  constructor(public accountServices:AccountService,
    private toster:ToastrService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.registerForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',[Validators.required,
        Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required,this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: ()=> this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  /**
   * The function `matchValues` returns a validator function that checks if the value of a control
   * matches the value of another control specified by the `matchTo` parameter.
   * @param {string} matchTo - The `matchTo` parameter is a string that represents the name of the
   * control that you want to compare the current control's value to.
   * @returns a ValidatorFn, which is a function that takes an AbstractControl as an argument and
   * returns either null (if the validation passes) or an object with a validation error (if the
   * validation fails).
   */
  matchValues(matchTo:string):ValidatorFn{
    return (control: AbstractControl)=>{
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching:true}
    }
  }
 /**
  * The function registers a user account and handles any errors that may occur.
  */
  register()
  {
    console.log(this.registerForm?.value)
    // this.accountServices.register(this.model).subscribe({
    //   next: response=>{
    //     this.cancle()
    //   },
    //   error: error=> {
    //     this.toster.error(error.error)
    //     this.registerAlert = false;
    //   }
    // })
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
