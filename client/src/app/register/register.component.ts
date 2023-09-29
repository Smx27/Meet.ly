import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, EmailValidator, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() userFromHome:any;
  @Output() OutputFromReg= new EventEmitter;
  registerAlert:boolean=false;
  registerForm : FormGroup = new FormGroup({});
  maxdate: Date = new Date;
  validationErrors: string[] | undefined;

  constructor(public accountServices:AccountService,
    private toster:ToastrService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
    this.maxdate.setFullYear(this.maxdate.getFullYear() - 18);
  }

  initForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['',Validators.required],
      knownAs: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
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
    const dob = this.getdateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, dateOfBirth: dob};
    this.accountServices.register(values).subscribe({
      next: response=>{
        this.router.navigateByUrl('/members');
      },
      error: error=> {
        this.validationErrors = error;
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

  private getdateOnly(dob: string | undefined){
    if(!dob) return;

    let date = new Date(dob);
    return new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()))
                .toISOString().slice(0,10);
  }
}
