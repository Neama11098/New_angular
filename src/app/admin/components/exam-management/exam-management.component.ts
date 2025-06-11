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
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
      <!-- Header Section -->
      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Manage Exams
                </h3>
                <p class="text-gray-500 mt-1">Create, edit, and manage your exams</p>
              </div>
            </div>
            <button
              (click)="createExam()"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create New Exam
            </button>
          </div>
        </div>

        <!-- Exams Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let exam of exams" 
               class="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-200 hover:shadow-xl">
            <!-- Exam Header -->
            <div class="p-6">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h4 class="text-xl font-semibold text-gray-900 mb-2">
                    {{ exam.title }}
                  </h4>
                  <p class="text-gray-600 text-sm line-clamp-2 mb-4">
                    {{ exam.description }}
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {{ exam.questions.length }} Questions
                  </span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mt-4">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" 
                       [style.width.%]="(exam.questions.length / 20) * 100">
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-1">Question Coverage</p>
              </div>

              <!-- Action Buttons -->
              <div class="mt-6 flex space-x-3">
                <button
                  (click)="editExam(exam.id)"
                  class="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit
                </button>
                <button
                  (click)="deleteExam(exam.id)"
                  class="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="exams.length === 0" class="text-center py-12">
          <div class="w-24 h-24 mx-auto mb-4 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900">No exams available</h3>
          <p class="mt-2 text-gray-500">Get started by creating a new exam</p>
          <button
            (click)="createExam()"
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Your First Exam
          </button>
        </div>
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