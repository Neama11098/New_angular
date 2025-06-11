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
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Available Exams
          </h2>
          <p class="mt-3 text-xl text-gray-500">
            Test your knowledge and track your progress
          </p>
        </div>

        <!-- Exams Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let exam of exams" 
               class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <!-- Card Header with Gradient -->
            <div class="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <!-- Card Content -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900">
                  {{ exam.title }}
                </h3>
                <span class="px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                  {{ exam.questions.length }} Questions
                </span>
              </div>

              <p class="text-gray-600 mb-6 line-clamp-2">
                {{ exam.description }}
              </p>

              <!-- Progress Bar -->
              <div class="mb-6">
                <div class="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Difficulty Level</span>
                  <span>{{ exam.questions.length > 10 ? 'Advanced' : 'Basic' }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                       [style.width.%]="(exam.questions.length / 20) * 100">
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <button
                (click)="startExam(exam.id)"
                class="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Start Exam</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="exams.length === 0" class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-4 shadow-md">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900">No Exams Available</h3>
          <p class="mt-2 text-sm text-gray-500">Check back later for new exams.</p>
        </div>
      </div>
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