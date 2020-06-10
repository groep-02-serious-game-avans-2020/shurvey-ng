import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
})
export class CreateSurveyComponent implements OnInit {
  surveyForm: FormGroup;
  questions: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private surveyService: SurveyService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  get form() {
    return this.surveyForm.controls;
  }

  createForm() {
    this.surveyForm = this.formBuilder.group({
      title: ['', Validators.required],
      questions: this.formBuilder.array([this.createQuestion()]),
      // answers: ['', Validators.required],
    });
  }

  createQuestion() {
    return this.formBuilder.group({
      questionNumber: ['', Validators.required],
      question: ['', Validators.required],
      textAnswer: ['', Validators.required],
    });
  }

  addQuestion() {
    this.questions = this.surveyForm.get('questions') as FormArray;
    this.questions.push(this.createQuestion());
  }

  // onSubmit() {
  //   if (this.surveyForm.invalid) {
  //     return;
  //   }
  //   this.createSurvey();
  // }

  // createSurvey() {
  //   const title = this.form.title.value;
  //   const questions = this.form.questions.value;
  //   const answers = this.form.answers.value;

  //   const survey: Parameters<SurveyService['create']>[0] = {
  //     title,
  //     questions,
  //     answers,
  //   };

  //   this.surveyService.create(survey).subscribe((data) => {
  //     if (data.error) {
  //       // Display error
  //       return console.log('Error: ', data.message);
  //     }
  //     this.router.navigate(['surveys']);
  //   });
  // }
}
