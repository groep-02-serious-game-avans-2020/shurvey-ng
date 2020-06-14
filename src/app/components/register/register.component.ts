import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: any;

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

    const user: Parameters<AuthenticationService['register']>[0] = {
      email,
      displayName,
      password,
    };

    this.authenticationService.register(user).subscribe((data) => {
      if (data.error) {
        // Display error
        return this.error = data.error;
      }
      this.router.navigate(['/login']);
    });
  }
}
