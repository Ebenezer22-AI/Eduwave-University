import React from 'react';
import { COURSES, ASSIGNMENTS } from '../constants';
import { BookOpen, Clock, CheckCircle2, AlertCircle, TrendingUp, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

import { useLanguage } from '../contexts/LanguageContext';

export const Dashboard = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-display font-bold text-zinc-900">{t('welcome')}, Explorer</h1>
        <p className="text-zinc-500 mt-1">You have 3 assignments due this week. Stay focused!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Current GPA', value: '3.8', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Credits Earned', value: '84', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Courses', value: '4', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Attendance', value: '96%', icon: CheckCircle2, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm"
          >
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-zinc-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-zinc-900">Current Courses</h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COURSES.map((course) => (
              <div key={course.id} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm hover:border-indigo-200 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white ${course.color}`}>
                    {course.code}
                  </div>
                  <BookOpen size={16} className="text-zinc-300 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-1 group-hover:text-indigo-600 transition-colors">{course.name}</h3>
                <p className="text-xs text-zinc-500 mb-4">{course.instructor}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-medium">
                    <span className="text-zinc-400">Progress</span>
                    <span className="text-zinc-900">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${course.color} transition-all duration-1000`} 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-display font-bold text-zinc-900">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {ASSIGNMENTS.map((assignment) => (
              <div key={assignment.id} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex items-start gap-4">
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  assignment.priority === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {assignment.priority === 'high' ? <AlertCircle size={18} /> : <Clock size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-zinc-900 truncate">{assignment.title}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Due {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors">
            Open Planner
          </button>
        </div>
      </div>
    </div>
  );
};
