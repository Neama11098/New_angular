import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../shared/services/exam.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ExamResult } from '../../../shared/models/exam.model';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-exam-results',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Academic Performance
          </h2>
          <p class="mt-3 text-xl text-gray-500">
            Track your progress and achievements
          </p>
        </div>

        <!-- Overall Performance Card -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div class="px-6 py-8 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-white mb-2">Overall Performance</h3>
              <div class="flex justify-center items-center space-x-8">
                <div class="text-center transform hover:scale-110 transition-transform duration-200">
                  <p class="text-4xl font-bold text-white">{{ totalScore }}</p>
                  <p class="text-sm text-indigo-100">Total Score</p>
                </div>
                <div class="text-center transform hover:scale-110 transition-transform duration-200">
                  <p class="text-4xl font-bold text-white">{{ totalQuestions }}</p>
                  <p class="text-sm text-indigo-100">Total Questions</p>
                </div>
                <div class="text-center transform hover:scale-110 transition-transform duration-200">
                  <p class="text-4xl font-bold text-white">{{ (totalScore / totalQuestions) * 100 | number:'1.0-0' }}%</p>
                  <p class="text-sm text-indigo-100">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
      </div>

        <!-- Individual Results Section -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h3 class="text-xl font-semibold text-gray-900">Exam History</h3>
          </div>
          <div class="divide-y divide-gray-200">
            <div *ngFor="let result of results" 
                 class="p-6 hover:bg-gray-50 transition-all duration-200 transform hover:translate-x-2">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shadow-md">
                        <span class="text-indigo-600 font-bold">{{ (result.score / result.totalQuestions) * 100 | number:'1.0-0' }}%</span>
                      </div>
                    </div>
                    <div>
                      <h4 class="text-lg font-medium text-gray-900">
                  Score: {{ result.score }} / {{ result.totalQuestions }}
                      </h4>
                <p class="text-sm text-gray-500">
                        Submitted on {{ result.submittedAt | date:'medium' }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="w-32 bg-gray-200 rounded-full h-2.5 shadow-inner">
                    <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500" 
                         [style.width.%]="(result.score / result.totalQuestions) * 100">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="results.length === 0" class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-4 shadow-md">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900">No Exam Results Yet</h3>
          <p class="mt-2 text-sm text-gray-500">Start taking exams to see your results here.</p>
        </div>
      </div>
    </div>
  `
})
export class ExamResultsComponent implements OnInit {
  results: ExamResult[] = [];
  totalScore: number = 0;
  totalQuestions: number = 0;

  constructor(
    private examService: ExamService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.examService.getResultsByUser(user.id).subscribe({
        next: (results) => {
          this.results = results;
          this.calculateTotalScore();
        },
        error: (error) => {
          console.error('Error loading results:', error);
          // Handle error (show message to user)
        }
      });
    }
  }

  private calculateTotalScore(): void {
    this.totalScore = this.results.reduce((sum, result) => sum + result.score, 0);
    this.totalQuestions = this.results.reduce((sum, result) => sum + result.totalQuestions, 0);
  }
} 