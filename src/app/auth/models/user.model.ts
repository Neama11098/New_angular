export interface User {
  id: number;
  username: string;
  email: string;
  role: 'student' | 'admin';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  confirmPassword: string;
} 