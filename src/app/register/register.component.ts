import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  get form() {
    return this.registerForm.controls;
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.register();
  }

  register() {
    const email = this.form.email.value;
    const displayName = this.form.displayName.value;
    const password = this.form.password.value;

    this.authenticationService
      .register(email, displayName, password)
      .subscribe((data) => {
        if (data.error) {
          return console.log(data.message);
        }
        return this.router.navigate(['/login']);
      });
  }
}
