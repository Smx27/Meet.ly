import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  baseUrl='https://localhost:5001/api/'
  constructor(private https: HttpClient) { }

  ngOnInit(): void {
  }

  get404error()
  {
    this.https.get(this.baseUrl+'buggy/not-found').subscribe({
      next: response => console.log(response),
      error: error=> console.error(error)
    })
  }

  get400error()
  {
    this.https.get(this.baseUrl+'buggy/bad-request').subscribe({
      next: response => console.log(response),
      error: error=> console.error(error)
    })
  }

  get500error()
  {
    this.https.get(this.baseUrl+'buggy/server-error').subscribe({
      next: response => console.log(response),
      error: error=> console.error(error)
    })
  }

  get401error()
  {
    this.https.get(this.baseUrl+'buggy/auth').subscribe({
      next: response => console.log(response),
      error: error=> console.error(error)
    })
  }

  get400validationerror()
  {
    this.https.get(this.baseUrl+'account/register',{}).subscribe({
      next: response => console.log(response),
      error: error=> console.error(error)
    })
  }
}
