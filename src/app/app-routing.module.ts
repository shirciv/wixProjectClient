import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import {FormBuilderComponent} from './form-builder/form-builder.component';
import {SubmitPageComponent} from './submit-page/submit-page.component';
import {SubmissionPageComponent} from './submission-page/submission-page.component';


const routes: Routes=[{path:'Forms', component:FormsComponent}, 
                      {path:'NewForm', component:FormBuilderComponent},
                      {path:'SubmitPage/:id', component:SubmitPageComponent},
                      {path:'SubmissionPage/:id', component:SubmissionPageComponent},
                      {path: '', redirectTo: '/Forms', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
