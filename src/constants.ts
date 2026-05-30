import { Course, Assignment, ScheduleEvent, Quiz } from './types';

export const COURSES: Course[] = [
  {
    id: '1',
    name: 'Advanced Quantum Mechanics',
    code: 'PHYS401',
    instructor: 'Dr. Sarah Chen',
    credits: 4,
    progress: 65,
    color: 'bg-indigo-500',
  },
  {
    id: '2',
    name: 'Macroeconomics Theory',
    code: 'ECON202',
    instructor: 'Prof. Robert Miller',
    credits: 3,
    progress: 42,
    color: 'bg-emerald-500',
  },
  {
    id: '3',
    name: 'Artificial Intelligence',
    code: 'CS305',
    instructor: 'Dr. James Wilson',
    credits: 4,
    progress: 88,
    color: 'bg-amber-500',
  },
  {
    id: '4',
    name: 'Modern World History',
    code: 'HIST110',
    instructor: 'Prof. Elena Rodriguez',
    credits: 3,
    progress: 25,
    color: 'bg-rose-500',
  },
];

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    courseId: '1',
    title: 'Problem Set 4: Schrödinger Equation',
    dueDate: '2026-02-25T23:59:59',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'a2',
    courseId: '3',
    title: 'Neural Network Implementation',
    dueDate: '2026-02-28T23:59:59',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'a3',
    courseId: '2',
    title: 'Market Equilibrium Essay',
    dueDate: '2026-02-22T23:59:59',
    status: 'pending',
    priority: 'high',
  },
];

export const SCHEDULE: ScheduleEvent[] = [
  {
    id: 'e1',
    title: 'Quantum Mechanics Lecture',
    courseId: '1',
    startTime: '10:00',
    endTime: '11:30',
    location: 'Science Hall 302',
    dayOfWeek: 1, // Monday
  },
  {
    id: 'e2',
    title: 'AI Lab Session',
    courseId: '3',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Tech Center 105',
    dayOfWeek: 2, // Tuesday
  },
  {
    id: 'e3',
    title: 'Macroeconomics Seminar',
    courseId: '2',
    startTime: '09:00',
    endTime: '10:30',
    location: 'Business Wing 201',
    dayOfWeek: 3, // Wednesday
  },
];

export const QUIZZES: Quiz[] = [
  {
    id: 'q1',
    title: 'Quantum Mechanics Fundamentals',
    subject: 'Physics',
    description: 'Test your knowledge of wave functions, operators, and the Schrödinger equation.',
    durationMinutes: 15,
    questions: [
      {
        id: 'q1-1',
        question: 'What does the square of the absolute value of the wave function represent?',
        options: [
          'Energy density',
          'Probability density',
          'Momentum density',
          'Charge density'
        ],
        correctAnswer: 'Probability density',
        explanation: 'In quantum mechanics, |ψ|² represents the probability density of finding a particle at a given point in space.'
      },
      {
        id: 'q1-2',
        question: 'Which principle states that it is impossible to simultaneously know the exact position and momentum of a particle?',
        options: [
          'Pauli Exclusion Principle',
          'Heisenberg Uncertainty Principle',
          'Aufbau Principle',
          'Hund\'s Rule'
        ],
        correctAnswer: 'Heisenberg Uncertainty Principle',
        explanation: 'The Heisenberg Uncertainty Principle states that ΔxΔp ≥ ħ/2.'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Introduction to Neural Networks',
    subject: 'Computer Science',
    description: 'A basic quiz covering neurons, activation functions, and backpropagation.',
    durationMinutes: 10,
    questions: [
      {
        id: 'q2-1',
        question: 'Which activation function is commonly used to introduce non-linearity in hidden layers?',
        options: [
          'Linear',
          'ReLU (Rectified Linear Unit)',
          'Step Function',
          'Identity'
        ],
        correctAnswer: 'ReLU (Rectified Linear Unit)',
        explanation: 'ReLU is the most widely used activation function in deep learning because it helps mitigate the vanishing gradient problem.'
      }
    ]
  }
];
