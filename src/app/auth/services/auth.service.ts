import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User, LoginCredentials, RegisterData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Mock users data
  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin'
    },
    {
      id: 2,
      username: 'student',
      email: 'student@example.com',
      role: 'student'
    }
  ];

  constructor() {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<User> {
    // Mock login - in real app, this would be an HTTP call
    const user = this.users.find(u => u.email === credentials.email);
    if (user) {
      return of(user).pipe(
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
    }
    throw new Error('Invalid credentials');
  }

  register(data: RegisterData): Observable<User> {
    // Mock registration
    const newUser: User = {
      id: this.users.length + 1,
      username: data.username,
      email: data.email,
      role: 'student'
    };
    this.users.push(newUser);
    return of(newUser);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
} 