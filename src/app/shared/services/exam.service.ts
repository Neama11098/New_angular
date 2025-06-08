import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exam, Question, ExamResult } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private exams: Exam[] = [
    {
      id: 1,
      title: 'JavaScript Basics',
      description: 'Test your knowledge of JavaScript fundamentals',
      questions: [
        {
          id: 1,
          text: 'What is the correct way to declare a variable in JavaScript?',
          choices: [
            'var x = 5;',
            'variable x = 5;',
            'v x = 5;',
            'let x = 5;'
          ],
          correctAnswer: 3
        },
        {
          id: 2,
          text: 'Which of the following is not a JavaScript data type?',
          choices: [
            'String',
            'Boolean',
            'Integer',
            'Object'
          ],
          correctAnswer: 2
        }
      ],
      createdBy: 1,
      createdAt: new Date()
    }
  ];

  private results: ExamResult[] = [];

  constructor() {}

  getExams(): Observable<Exam[]> {
    return of(this.exams);
  }

  getExamById(id: number): Observable<Exam | undefined> {
    return of(this.exams.find(exam => exam.id === id));
  }

  createExam(exam: Omit<Exam, 'id' | 'createdAt'>): Observable<Exam> {
    const newExam: Exam = {
      ...exam,
      id: this.exams.length + 1,
      createdAt: new Date()
    };
    this.exams.push(newExam);
    return of(newExam);
  }

  updateExam(id: number, exam: Partial<Exam>): Observable<Exam | undefined> {
    const index = this.exams.findIndex(e => e.id === id);
    if (index !== -1) {
      this.exams[index] = { ...this.exams[index], ...exam };
      return of(this.exams[index]);
    }
    return of(undefined);
  }

  deleteExam(id: number): Observable<boolean> {
    const index = this.exams.findIndex(e => e.id === id);
    if (index !== -1) {
      this.exams.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  submitExam(examId: number, userId: number, answers: number[]): Observable<ExamResult> {
    const exam = this.exams.find(e => e.id === examId);
    if (!exam) {
      throw new Error('Exam not found');
    }

    let score = 0;
    exam.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    const result: ExamResult = {
      id: this.results.length + 1,
      examId,
      userId,
      score,
      totalQuestions: exam.questions.length,
      answers,
      submittedAt: new Date()
    };

    this.results.push(result);
    return of(result);
  }

  getResultsByUser(userId: number): Observable<ExamResult[]> {
    return of(this.results.filter(result => result.userId === userId));
  }

  getResultsByExam(examId: number): Observable<ExamResult[]> {
    return of(this.results.filter(result => result.examId === examId));
  }
} 