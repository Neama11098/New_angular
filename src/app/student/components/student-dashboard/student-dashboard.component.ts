import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../../shared/services/exam.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Top Navigation Bar -->
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-xl font-bold text-gray-900">Student Dashboard</h1>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  routerLink="exams"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Available Exams
                </a>
                <a
                  routerLink="results"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  My Results
                </a>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-sm text-gray-700">
                Welcome, {{ currentUser?.username }}
              </div>
              <button
                (click)="logout()"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="py-10">
        <main>
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <!-- Stats Overview -->
            <div class="mb-8">
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <!-- Total Exams Card -->
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="p-5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                      </div>
                      <div class="ml-5 w-0 flex-1">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">Total Exams</dt>
                          <dd class="text-lg font-medium text-gray-900">{{ totalExams }}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Completed Exams Card -->
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="p-5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div class="ml-5 w-0 flex-1">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">Completed Exams</dt>
                          <dd class="text-lg font-medium text-gray-900">{{ completedExams }}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Average Score Card -->
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="p-5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                        </svg>
                      </div>
                      <div class="ml-5 w-0 flex-1">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">Average Score</dt>
                          <dd class="text-lg font-medium text-gray-900">{{ averageScore }}%</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content Area -->
            <div class="bg-white shadow rounded-lg">
              <router-outlet></router-outlet>
            </div>
          </div>
        </main>
      </div>
    </div>
  `
})
export class StudentDashboardComponent implements OnInit {
  currentUser: any;
  totalExams: number = 0;
  completedExams: number = 0;
  averageScore: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    if (this.currentUser) {
      // Load total exams
      this.examService.getExams().subscribe({
        next: (exams) => {
          this.totalExams = exams.length;
        },
        error: (error) => {
          console.error('Error loading exams:', error);
        }
      });

      // Load completed exams and calculate average score
      this.examService.getResultsByUser(this.currentUser.id).subscribe({
        next: (results) => {
          this.completedExams = results.length;
          if (results.length > 0) {
            const totalScore = results.reduce((sum, result) => {
              return sum + (result.score / result.totalQuestions) * 100;
            }, 0);
            this.averageScore = Math.round(totalScore / results.length);
          }
        },
        error: (error) => {
          console.error('Error loading results:', error);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 