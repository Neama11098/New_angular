import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../../shared/services/exam.service';
import { ExamResult, Exam } from '../../../shared/models/exam.model';

@Component({
  selector: 'app-results-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Exam Results
        </h3>
      </div>

      <div class="border-t border-gray-200">
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div class="text-sm font-medium text-gray-500">Exam</div>
          <div class="text-sm font-medium text-gray-500">Student</div>
          <div class="text-sm font-medium text-gray-500">Score</div>
        </div>

        <div class="bg-white divide-y divide-gray-200">
          <div *ngFor="let result of results" class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div class="text-sm text-gray-900">
              {{ getExamTitle(result.examId) }}
            </div>
            <div class="text-sm text-gray-900">
              Student ID: {{ result.userId }}
            </div>
            <div class="text-sm text-gray-900">
              {{ result.score }} / {{ result.totalQuestions }}
              ({{ (result.score / result.totalQuestions) * 100 | number:'1.0-0' }}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ResultsManagementComponent implements OnInit {
  results: ExamResult[] = [];
  exams: Exam[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.loadResults();
    this.loadExams();
  }

  loadResults(): void {
    this.examService.getExams().subscribe({
      next: (exams) => {
        this.exams = exams;
        // Load results for each exam
        exams.forEach(exam => {
          this.examService.getResultsByExam(exam.id).subscribe({
            next: (results) => {
              this.results = [...this.results, ...results];
            },
            error: (error) => {
              console.error('Error loading results:', error);
              // Handle error (show message to user)
            }
          });
        });
      },
      error: (error) => {
        console.error('Error loading exams:', error);
        // Handle error (show message to user)
      }
    });
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

  getExamTitle(examId: number): string {
    const exam = this.exams.find(e => e.id === examId);
    return exam ? exam.title : 'Unknown Exam';
  }
} 