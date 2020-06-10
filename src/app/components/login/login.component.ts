import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/surveys']);
    }
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

    const user: Parameters<AuthenticationService['login']>[0] = {
      email,
      password,
    };

    this.authenticationService.login(user).subscribe((data) => {
      if (data.error) {
        // Display error
        return console.log('Error: ', data.message);
      }
      this.router.navigate(['/surveys']);
    });
  }
}
