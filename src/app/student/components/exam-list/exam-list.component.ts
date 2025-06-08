import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from '../../../shared/services/exam.service';
import { Exam } from '../../../shared/models/exam.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li *ngFor="let exam of exams">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-gray-900 truncate">
                  {{ exam.title }}
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ exam.description }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Questions: {{ exam.questions.length }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0">
                <button
                  (click)="startExam(exam.id)"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Exam
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `
})
export class ExamListComponent implements OnInit {
  exams: Exam[] = [];

  constructor(
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    this.examService.getExams().subscribe({
      next: (exams) => {
        this.exams = exams;
      },
      error: (error) => {
        console.error('Error loading exams:', error);
        // Handle error (show message to user)
      }
    });
  }

  startExam(examId: number): void {
    this.router.navigate(['/student/exams', examId]);
  }
} 