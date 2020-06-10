import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { SurveyComponent } from './components/survey/survey.component';
import { CreateSurveyComponent } from './components/survey/create-survey/create-survey.component';
import { DetailsSurveyComponent } from './components/survey/details-survey/details-survey.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, SurveyComponent, CreateSurveyComponent, DetailsSurveyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
