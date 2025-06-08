import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ExamManagementComponent } from './components/exam-management/exam-management.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { EditExamComponent } from './components/edit-exam/edit-exam.component';
import { ResultsManagementComponent } from './components/results-management/results-management.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'exams', pathMatch: 'full' },
      { path: 'exams', component: ExamManagementComponent },
      { path: 'exams/create', component: CreateExamComponent },
      { path: 'exams/:id/edit', component: EditExamComponent },
      { path: 'results', component: ResultsManagementComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    AdminDashboardComponent,
    ExamManagementComponent,
    CreateExamComponent,
    EditExamComponent,
    ResultsManagementComponent
  ]
})
export class AdminModule { } 