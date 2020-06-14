import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { SurveyService } from '../../../services/survey.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
})
export class CreateSurveyComponent implements OnInit {
  surveyForm: FormGroup;
  questions: FormArray;
  error: any;

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

  get questionForm() {
    return this.surveyForm.get('questions') as FormArray;
  }

  createForm() {
    this.surveyForm = this.formBuilder.group({
      title: ['', Validators.required],
      questions: this.formBuilder.array([this.createQuestion(0)]),
    });
  }

  createQuestion(index: number) {
    return this.formBuilder.group({
      questionNumber: [index, Validators.required],
      question: ['', Validators.required],
      textAnswer: [false],
    });
  }

  addQuestion(index: number) {
    this.questions = this.surveyForm.get('questions') as FormArray;
    this.questions.push(this.createQuestion(index + 1));
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  onSubmit() {
    if (this.surveyForm.invalid) {
      return;
    }
    this.createSurvey();
  }

  createSurvey() {
    const title = this.form.title.value;
    const questions = this.form.questions.value;

    const survey: Parameters<SurveyService['create']>[0] = {
      title,
      questions,
    };

    this.surveyService.create(survey).subscribe((data) => {
      if (data.error) {
        // Display error
        return this.error = data.error;
      }
      this.router.navigate(['surveys']);
    });
  }
}
