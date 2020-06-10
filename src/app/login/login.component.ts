import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  get form() {
    return this.loginForm.controls;
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.login();
  }

  login() {
    const email = this.form.email.value;
    const password = this.form.password.value;

    this.authenticationService
      .login(email, password)
      .subscribe((data) => {
        if (data.error) {
          // Display error
          return console.log(data.message);
        }
        return this.router.navigate(['/survey']);
      });
  }
}
