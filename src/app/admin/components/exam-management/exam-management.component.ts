import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../../shared/services/exam.service';
import { Exam } from '../../../shared/models/exam.model';

@Component({
  selector: 'app-exam-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Manage Exams
        </h3>
        <button
          (click)="createExam()"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create New Exam
        </button>
      </div>

      <div class="border-t border-gray-200">
        <ul class="divide-y divide-gray-200">
          <li *ngFor="let exam of exams" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <h4 class="text-lg font-medium text-gray-900 truncate">
                  {{ exam.title }}
                </h4>
                <p class="mt-1 text-sm text-gray-500">
                  {{ exam.description }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Questions: {{ exam.questions.length }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex space-x-4">
                <button
                  (click)="editExam(exam.id)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Edit
                </button>
                <button
                  (click)="deleteExam(exam.id)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class ExamManagementComponent implements OnInit {
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

  createExam(): void {
    this.router.navigate(['/admin/exams/create']);
  }

  editExam(id: number): void {
    this.router.navigate(['/admin/exams', id, 'edit']);
  }

  deleteExam(id: number): void {
    if (confirm('Are you sure you want to delete this exam?')) {
      this.examService.deleteExam(id).subscribe({
        next: (success) => {
          if (success) {
            this.loadExams();
          }
        },
        error: (error) => {
          console.error('Error deleting exam:', error);
          // Handle error (show message to user)
        }
      });
    }
  }
} 