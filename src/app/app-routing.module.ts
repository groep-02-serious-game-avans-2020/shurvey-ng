import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SurveyComponent } from './components/survey/survey.component';
import { CreateSurveyComponent } from './components/survey/create-survey/create-survey.component';
import { DetailsSurveyComponent } from './components/survey/details-survey/details-survey.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'surveys',
    component: SurveyComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'create-survey',
    component: CreateSurveyComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'surveys/:id',
    component: DetailsSurveyComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: '**', component: SurveyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
