export interface Question {
  id: number;
  text: string;
  choices: string[];
  correctAnswer: number; // Index of the correct answer in choices array
}

export interface Exam {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  createdBy: number; // User ID of the admin who created the exam
  createdAt: Date;
}

export interface ExamResult {
  id: number;
  examId: number;
  userId: number;
  score: number;
  totalQuestions: number;
  answers: number[]; // Array of selected answer indices
  submittedAt: Date;
} 