import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Survey } from '../../models/survey';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  surveys: Survey[];
  error: any;

  constructor(private router: Router, private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.surveyService.getAll().subscribe((data) => {
      if (data.error) {
        // Display error
        return this.error = data.error;
      }
      this.surveys = data;
    });
  }

  createSurvey() {
    this.router.navigate(['create-survey']);
  }

  deleteSurvey(survey: Survey) {
    this.surveyService.delete(survey._id).subscribe((data) => {
      if (data.error) {
        // Display error
        return this.error = data.error;
      }
      this.surveys = this.surveys.filter((s) => s !== survey);
    });
  }
}
