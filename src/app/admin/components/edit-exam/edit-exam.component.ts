import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../../shared/services/exam.service';
import { Exam } from '../../../shared/models/exam.model';

@Component({
  selector: 'app-edit-exam',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Edit Exam
        </h3>
      </div>

      <form *ngIf="exam" [formGroup]="examForm" (ngSubmit)="onSubmit()" class="px-4 py-5 sm:p-6">
        <div class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              formControlName="title"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              formControlName="description"
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div formArrayName="questions">
            <div class="flex justify-between items-center mb-4">
              <h4 class="text-lg font-medium text-gray-900">Questions</h4>
              <button
                type="button"
                (click)="addQuestion()"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Add Question
              </button>
            </div>

            <div *ngFor="let question of questions.controls; let i = index" [formGroupName]="i" class="mb-8 p-4 border rounded-lg">
              <div class="flex justify-between items-center mb-4">
                <h5 class="text-md font-medium text-gray-900">Question {{ i + 1 }}</h5>
                <button
                  type="button"
                  (click)="removeQuestion(i)"
                  class="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                >
                  Remove
                </button>
              </div>

              <div class="space-y-4">
                <div>
                  <label [for]="'question' + i" class="block text-sm font-medium text-gray-700">Question Text</label>
                  <input
                    type="text"
                    [id]="'question' + i"
                    formControlName="text"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div formArrayName="choices">
                  <div class="flex justify-between items-center mb-2">
                    <label class="block text-sm font-medium text-gray-700">Choices</label>
                    <button
                      type="button"
                      (click)="addChoice(i)"
                      class="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    >
                      Add Choice
                    </button>
                  </div>

                  <div *ngFor="let choice of getChoices(i).controls; let j = index" [formGroupName]="j" class="flex items-center space-x-2 mb-2">
                    <input
                      type="radio"
                      [name]="'correct' + i"
                      [value]="j"
                      formControlName="isCorrect"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <input
                      type="text"
                      formControlName="text"
                      class="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      (click)="removeChoice(i, j)"
                      class="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            [disabled]="examForm.invalid"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Exam
          </button>
        </div>
      </form>
    </div>
  `
})
export class EditExamComponent implements OnInit {
  exam: Exam | null = null;
  examForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {
    this.examForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      questions: this.fb.array([])
    });
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
          this.router.navigate(['/admin/exams']);
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
      this.examForm.patchValue({
        title: this.exam.title,
        description: this.exam.description
      });

      this.exam.questions.forEach(question => {
        const questionGroup = this.fb.group({
          text: [question.text, Validators.required],
          choices: this.fb.array([])
        });

        question.choices.forEach((choice, index) => {
          const choiceGroup = this.fb.group({
            text: [choice, Validators.required],
            isCorrect: [index === question.correctAnswer]
          });
          (questionGroup.get('choices') as FormArray).push(choiceGroup);
        });

        this.questions.push(questionGroup);
      });
    }
  }

  get questions() {
    return this.examForm.get('questions') as FormArray;
  }

  getChoices(questionIndex: number) {
    return this.questions.at(questionIndex).get('choices') as FormArray;
  }

  addQuestion() {
    const question = this.fb.group({
      text: ['', Validators.required],
      choices: this.fb.array([])
    });
    this.questions.push(question);
    this.addChoice(this.questions.length - 1);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  addChoice(questionIndex: number) {
    const choices = this.getChoices(questionIndex);
    const choice = this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false]
    });
    choices.push(choice);
  }

  removeChoice(questionIndex: number, choiceIndex: number) {
    const choices = this.getChoices(questionIndex);
    choices.removeAt(choiceIndex);
  }

  onSubmit() {
    if (this.examForm.valid && this.exam) {
      const formValue = this.examForm.value;
      const updatedExam = {
        ...this.exam,
        title: formValue.title,
        description: formValue.description,
        questions: formValue.questions.map((q: any) => ({
          text: q.text,
          choices: q.choices.map((c: any) => c.text),
          correctAnswer: q.choices.findIndex((c: any) => c.isCorrect)
        }))
      };

      this.examService.updateExam(this.exam.id, updatedExam).subscribe({
        next: () => {
          this.router.navigate(['/admin/exams']);
        },
        error: (error) => {
          console.error('Error updating exam:', error);
          // Handle error (show message to user)
        }
      });
    }
  }
} 