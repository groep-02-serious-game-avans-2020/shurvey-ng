import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Survey } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  surveys: Survey[];

  constructor(private router: Router, private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.surveyService.getAll().subscribe((surveys) => {
      this.surveys = surveys;
      console.log(surveys);
    });
  }

  createSurvey() {
    this.router.navigate(['create-survey']);
  }

  deleteSurvey(survey: Survey) {
    this.surveyService.delete(survey._id).subscribe((data) => {
      this.surveys = this.surveys.filter((s) => s !== survey);
    });
  }
}
