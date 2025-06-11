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
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics and core concepts',
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
        },
        {
          id: 3,
          text: 'What is the output of console.log(typeof [])?',
          choices: [
            'array',
            'object',
            'list',
            'undefined'
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          text: 'Which method is used to add an element to the end of an array?',
          choices: [
            'push()',
            'append()',
            'add()',
            'insert()'
          ],
          correctAnswer: 0
        },
        {
          id: 5,
          text: 'What is the purpose of the "use strict" directive?',
          choices: [
            'To enable strict mode in JavaScript',
            'To enforce type checking',
            'To prevent variable hoisting',
            'To enable async/await'
          ],
          correctAnswer: 0
        }
      ],
      createdBy: 1,
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'HTML5 & CSS3 Mastery',
      description: 'Test your knowledge of modern HTML5 and CSS3 features',
      questions: [
        {
          id: 1,
          text: 'Which HTML5 element is used for playing video files?',
          choices: [
            '<media>',
            '<video>',
            '<movie>',
            '<play>'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: 'What is the correct way to create a CSS class?',
          choices: [
            '.classname',
            '#classname',
            '@classname',
            '*classname'
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          text: 'Which CSS property is used to create rounded corners?',
          choices: [
            'border-radius',
            'corner-radius',
            'round-corners',
            'border-round'
          ],
          correctAnswer: 0
        },
        {
          id: 4,
          text: 'What is the purpose of the HTML5 <canvas> element?',
          choices: [
            'To display images',
            'To create animations',
            'To draw graphics',
            'To play videos'
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          text: 'Which CSS property is used to create a flexbox layout?',
          choices: [
            'display: flex',
            'layout: flex',
            'position: flex',
            'float: flex'
          ],
          correctAnswer: 0
        },
        {
          id: 6,
          text: 'What is the purpose of the HTML5 <section> element?',
          choices: [
            'To create a navigation menu',
            'To define a section of content',
            'To create a sidebar',
            'To define a header'
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          text: 'Which CSS property is used to create a gradient background?',
          choices: [
            'background-gradient',
            'gradient',
            'background-image',
            'linear-gradient'
          ],
          correctAnswer: 3
        },
        {
          id: 8,
          text: 'What is the purpose of the HTML5 <article> element?',
          choices: [
            'To create a blog post',
            'To define independent content',
            'To create a sidebar',
            'To define a footer'
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          text: 'Which CSS property is used to create a transition effect?',
          choices: [
            'animation',
            'transition',
            'transform',
            'effect'
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: 'What is the purpose of the HTML5 <nav> element?',
          choices: [
            'To create a navigation menu',
            'To define a section',
            'To create a header',
            'To define a footer'
          ],
          correctAnswer: 0
        },
        {
          id: 11,
          text: 'Which CSS property is used to create a grid layout?',
          choices: [
            'display: grid',
            'layout: grid',
            'position: grid',
            'float: grid'
          ],
          correctAnswer: 0
        },
        {
          id: 12,
          text: 'What is the purpose of the HTML5 <header> element?',
          choices: [
            'To create a navigation menu',
            'To define a header section',
            'To create a sidebar',
            'To define a footer'
          ],
          correctAnswer: 1
        }
      ],
      createdBy: 1,
      createdAt: new Date()
    },
    {
      id: 3,
      title: 'Angular Framework',
      description: 'Test your knowledge of Angular framework and its core concepts',
      questions: [
        {
          id: 1,
          text: 'What is the purpose of Angular decorators?',
          choices: [
            'To style components',
            'To add metadata to classes',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: 'Which decorator is used to create a component?',
          choices: [
            '@Component',
            '@Directive',
            '@Injectable',
            '@NgModule'
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          text: 'What is the purpose of Angular services?',
          choices: [
            'To style components',
            'To share data between components',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          text: 'Which property is used for two-way data binding?',
          choices: [
            '{{}}',
            '[]',
            '()',
            '[()]'
          ],
          correctAnswer: 3
        },
        {
          id: 5,
          text: 'What is the purpose of Angular pipes?',
          choices: [
            'To create animations',
            'To transform data',
            'To handle routing',
            'To style components'
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          text: 'Which decorator is used to create a service?',
          choices: [
            '@Component',
            '@Directive',
            '@Injectable',
            '@NgModule'
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          text: 'What is the purpose of Angular guards?',
          choices: [
            'To style components',
            'To protect routes',
            'To create animations',
            'To handle data binding'
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          text: 'Which property is used for event binding?',
          choices: [
            '{{}}',
            '[]',
            '()',
            '[()]'
          ],
          correctAnswer: 2
        },
        {
          id: 9,
          text: 'What is the purpose of Angular interceptors?',
          choices: [
            'To style components',
            'To handle HTTP requests',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: 'Which decorator is used to create a module?',
          choices: [
            '@Component',
            '@Directive',
            '@Injectable',
            '@NgModule'
          ],
          correctAnswer: 3
        },
        {
          id: 11,
          text: 'What is the purpose of Angular resolvers?',
          choices: [
            'To style components',
            'To pre-fetch data before route activation',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 12,
          text: 'Which property is used for property binding?',
          choices: [
            '{{}}',
            '[]',
            '()',
            '[()]'
          ],
          correctAnswer: 1
        },
        {
          id: 13,
          text: 'What is the purpose of Angular directives?',
          choices: [
            'To style components',
            'To extend HTML with custom attributes',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 14,
          text: 'Which decorator is used to create a pipe?',
          choices: [
            '@Component',
            '@Directive',
            '@Pipe',
            '@NgModule'
          ],
          correctAnswer: 2
        },
        {
          id: 15,
          text: 'What is the purpose of Angular forms?',
          choices: [
            'To style components',
            'To handle user input',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        }
      ],
      createdBy: 1,
      createdAt: new Date()
    },
    {
      id: 4,
      title: 'TypeScript Essentials',
      description: 'Test your knowledge of TypeScript programming language',
      questions: [
        {
          id: 1,
          text: 'What is the purpose of TypeScript?',
          choices: [
            'To style web pages',
            'To add static typing to JavaScript',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: 'How do you declare a type in TypeScript?',
          choices: [
            'type: string',
            'let: string',
            'const: string',
            'var: string'
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          text: 'What is an interface in TypeScript?',
          choices: [
            'A class',
            'A type definition',
            'A function',
            'A variable'
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          text: 'How do you declare an optional property in an interface?',
          choices: [
            'property?: type',
            'property: type?',
            'optional property: type',
            'property: optional type'
          ],
          correctAnswer: 0
        },
        {
          id: 5,
          text: 'What is a generic type in TypeScript?',
          choices: [
            'A specific type',
            'A reusable type',
            'A basic type',
            'A complex type'
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          text: 'How do you declare an enum in TypeScript?',
          choices: [
            'enum Name {}',
            'type Name = enum {}',
            'const Name = enum {}',
            'let Name = enum {}'
          ],
          correctAnswer: 0
        },
        {
          id: 7,
          text: 'What is a union type in TypeScript?',
          choices: [
            'A single type',
            'Multiple types combined',
            'A basic type',
            'A complex type'
          ],
          correctAnswer: 1
        }
      ],
      createdBy: 1,
      createdAt: new Date()
    },
    {
      id: 5,
      title: 'Web Development Best Practices',
      description: 'Test your knowledge of web development best practices and patterns',
      questions: [
        {
          id: 1,
          text: 'What is the purpose of semantic HTML?',
          choices: [
            'To style web pages',
            'To improve accessibility',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: 'What is the purpose of CSS preprocessors?',
          choices: [
            'To style web pages',
            'To add programming features to CSS',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          text: 'What is the purpose of responsive design?',
          choices: [
            'To style web pages',
            'To create animations',
            'To adapt to different screen sizes',
            'To handle routing'
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          text: 'What is the purpose of minification?',
          choices: [
            'To style web pages',
            'To reduce file size',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          text: 'What is the purpose of lazy loading?',
          choices: [
            'To style web pages',
            'To improve performance',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          text: 'What is the purpose of code splitting?',
          choices: [
            'To style web pages',
            'To improve performance',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          text: 'What is the purpose of caching?',
          choices: [
            'To style web pages',
            'To improve performance',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          text: 'What is the purpose of error handling?',
          choices: [
            'To style web pages',
            'To handle errors gracefully',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          text: 'What is the purpose of testing?',
          choices: [
            'To style web pages',
            'To ensure code quality',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: 'What is the purpose of version control?',
          choices: [
            'To style web pages',
            'To track code changes',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 11,
          text: 'What is the purpose of code documentation?',
          choices: [
            'To style web pages',
            'To improve code maintainability',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 12,
          text: 'What is the purpose of code reviews?',
          choices: [
            'To style web pages',
            'To ensure code quality',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
        },
        {
          id: 13,
          text: 'What is the purpose of continuous integration?',
          choices: [
            'To style web pages',
            'To automate the build process',
            'To create animations',
            'To handle routing'
          ],
          correctAnswer: 1
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