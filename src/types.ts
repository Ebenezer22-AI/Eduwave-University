export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  grade?: string;
  progress: number;
  color: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  priority: 'low' | 'medium' | 'high';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  courseId: string;
  startTime: string;
  endTime: string;
  location: string;
  dayOfWeek: number; // 0-6
}

export interface DailyProblem {
  id: string;
  subject: string;
  question: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  description: string;
  questions: QuizQuestion[];
  durationMinutes: number;
}
