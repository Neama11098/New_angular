import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { TakeExamComponent } from './components/take-exam/take-exam.component';
import { ExamResultsComponent } from './components/exam-results/exam-results.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
    children: [
      { path: '', redirectTo: 'exams', pathMatch: 'full' },
      { path: 'exams', component: ExamListComponent },
      { path: 'exams/:id', component: TakeExamComponent },
      { path: 'results', component: ExamResultsComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    StudentDashboardComponent,
    ExamListComponent,
    TakeExamComponent,
    ExamResultsComponent
  ]
})
export class StudentModule { } 