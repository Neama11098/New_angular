import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../../shared/services/exam.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Exam } from '../../../shared/models/exam.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div *ngIf="exam" class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ exam.title }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {{ exam.description }}
        </p>
      </div>

      <form [formGroup]="examForm" (ngSubmit)="onSubmit()" class="px-4 py-5 sm:p-6">
        <div *ngFor="let question of exam.questions; let i = index" class="mb-8">
          <h4 class="text-lg font-medium text-gray-900 mb-4">
            Question {{ i + 1 }}: {{ question.text }}
          </h4>
          <div class="space-y-4">
            <div *ngFor="let choice of question.choices; let j = index" class="flex items-center">
              <input
                type="radio"
                [id]="'q' + i + 'c' + j"
                [formControlName]="'q' + i"
                [value]="j"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label [for]="'q' + i + 'c' + j" class="ml-3 block text-sm font-medium text-gray-700">
                {{ choice }}
              </label>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            [disabled]="examForm.invalid"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Exam
          </button>
        </div>
      </form>
    </div>
  `
})
export class TakeExamComponent implements OnInit {
  exam: Exam | null = null;
  examForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private authService: AuthService
  ) {
    this.examForm = this.fb.group({});
  }

  ngOnInit(): void {
    const examId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadExam(examId);
  }

  loadExam(examId: number): void {
    this.examService.getExamById(examId).subscribe({
      next: (exam) => {
        if (exam) {
          this.exam = exam;
          this.initializeForm();
        } else {
          this.router.navigate(['/student/exams']);
        }
      },
      error: (error) => {
        console.error('Error loading exam:', error);
        // Handle error (show message to user)
      }
    });
  }

  initializeForm(): void {
    if (this.exam) {
      const group: { [key: string]: any } = {};
      this.exam.questions.forEach((_, index) => {
        group[`q${index}`] = [''];
      });
      this.examForm = this.fb.group(group);
    }
  }

  onSubmit(): void {
    if (this.examForm.valid && this.exam) {
      const user = this.authService.getCurrentUser();
      if (!user) {
        this.router.navigate(['/auth/login']);
        return;
      }

      const formValues = this.examForm.value;
      const answers: number[] = Object.keys(formValues).map(key => {
        const value = formValues[key];
        return value === '' ? -1 : Number(value);
      });

      this.examService.submitExam(this.exam.id, user.id, answers).subscribe({
        next: (result) => {
          this.router.navigate(['/student/results']);
        },
        error: (error) => {
          console.error('Error submitting exam:', error);
          // Handle error (show message to user)
        }
      });
    }
  }
} 