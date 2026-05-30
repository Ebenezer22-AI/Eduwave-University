import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AITutor } from './components/AITutor';
import { Schedule } from './components/Schedule';
import { ProblemOfTheDay } from './components/ProblemOfTheDay';
import { Profile } from './components/Profile';
import { QuizView } from './components/Quiz';
import { LanguageSettings } from './components/LanguageSettings';
import { BookOpen } from 'lucide-react';
import { COURSES } from './constants';

const CoursesPage = () => (
  <div className="space-y-8">
    <header>
      <h1 className="text-3xl font-display font-bold text-zinc-900">My Courses</h1>
      <p className="text-zinc-500 mt-1">Manage your academic progress and materials.</p>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {COURSES.map((course) => (
        <div key={course.id} className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className={`h-24 ${course.color} p-6 flex justify-between items-start`}>
            <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
              {course.code}
            </span>
            <BookOpen className="text-white/60" size={20} />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-zinc-900 mb-1">{course.name}</h3>
            <p className="text-sm text-zinc-500 mb-6">{course.instructor}</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Credits</span>
                <span className="font-semibold text-zinc-900">{course.credits} Units</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-medium">
                  <span className="text-zinc-400">Course Progress</span>
                  <span className="text-zinc-900">{course.progress}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${course.color} transition-all duration-1000`} 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2.5 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
              View Course Materials
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex relative">
        {/* Background Pattern Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
        />
        
        <Sidebar />
        <main className="flex-1 pt-28 pb-12 px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/tutor" element={<AITutor />} />
              <Route path="/problem" element={<ProblemOfTheDay />} />
              <Route path="/quizzes" element={<QuizView />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/language" element={<LanguageSettings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
