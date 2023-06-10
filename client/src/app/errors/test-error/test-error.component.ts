/* This is an Angular component that sends HTTP requests to a local API to test error handling. */
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

  /**
   * This function sends an HTTP GET request to a non-existent endpoint and logs the error if it
   * occurs.
   */
  get404error()
  {
    this.https.get(this.baseUrl+'buggy/not-found').subscribe({
      next: response => console.log(response),
      error: error=> console.error(error)
    })
  }

  /**
   * This function sends an HTTP GET request to a buggy endpoint that returns a 400 error and logs the
   * error to the console.
   */
  get400error()
  {
    this.https.get(this.baseUrl+'buggy/bad-request').subscribe({
      next: response => console.log(response),
      error: error=> console.error(error)
    })
  }

  /**
   * This function sends an HTTP GET request to a server endpoint and logs the response or error to the
   * console.
   */
  get500error()
  {
    this.https.get(this.baseUrl+'buggy/server-error').subscribe({
      next: response => console.log(response),
      error: error=> console.error(error)
    })
  }

  /**
   * This function sends an HTTP GET request to a buggy authentication endpoint and logs the response
   * or error.
   */
  get401error()
  {
    this.https.get(this.baseUrl+'buggy/auth').subscribe({
      next: response => console.log(response),
      error: error=> console.error(error)
    })
  }

  /**
   * This function sends an HTTP GET request to the specified URL and logs the response or error to the
   * console.
   */
  get400validationerror()
  {
    this.https.get(this.baseUrl+'account/register',{}).subscribe({
      next: response => console.log(response),
      error: error=> console.error(error)
    })
  }
}
