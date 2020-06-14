import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Survey } from '../../../models/survey';
import { SurveyService } from '../../../services/survey.service';

@Component({
  selector: 'app-details-survey',
  templateUrl: './details-survey.component.html',
  styleUrls: ['./details-survey.component.css'],
})
export class DetailsSurveyComponent implements OnInit {
  private id: string;
  survey: Survey;
  error: any;
  surveyQrText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });

    this.surveyService.get(this.id).subscribe((data) => {
      if (data.error) {
        // Display error
        return this.error = data.error;
      }
      this.survey = data;
      this.surveyQrText = `{
        "type":"survey",
        "_id":"${this.id}"
      }`
    });
  }
}
