import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSurveyComponent } from './details-survey.component';

describe('DetailsSurveyComponent', () => {
  let component: DetailsSurveyComponent;
  let fixture: ComponentFixture<DetailsSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
