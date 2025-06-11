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
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          My Exam Results
        </h3>
        <div class="mt-4 bg-indigo-50 p-4 rounded-md">
          <h4 class="text-lg font-medium text-indigo-900">Total Score</h4>
          <p class="text-2xl font-bold text-indigo-600">
            {{ totalScore }} / {{ totalQuestions }}
          </p>
          <p class="text-sm text-indigo-500">
            Overall Percentage: {{ (totalScore / totalQuestions) * 100 | number:'1.0-0' }}%
          </p>
        </div>
      </div>

      <div class="border-t border-gray-200">
        <h4 class="px-4 py-3 text-lg font-medium text-gray-900 bg-gray-50">
          Individual Exam Results
        </h4>
        <ul class="divide-y divide-gray-200">
          <li *ngFor="let result of results" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  Score: {{ result.score }} / {{ result.totalQuestions }}
                </p>
                <p class="text-sm text-gray-500">
                  Percentage: {{ (result.score / result.totalQuestions) * 100 | number:'1.0-0' }}%
                </p>
                <p class="text-sm text-gray-500">
                  Submitted: {{ result.submittedAt | date:'medium' }}
                </p>
              </div>
            </div>
          </li>
        </ul>
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
          // Calculate total score and questions
          this.totalScore = results.reduce((sum, result) => sum + result.score, 0);
          this.totalQuestions = results.reduce((sum, result) => sum + result.totalQuestions, 0);
        },
        error: (error) => {
          console.error('Error loading results:', error);
          // Handle error (show message to user)
        }
      });
    }
  }
} 