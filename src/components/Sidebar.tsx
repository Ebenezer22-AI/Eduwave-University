import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, MessageSquare, Calendar, Settings, GraduationCap, BrainCircuit, User, ClipboardList, Languages } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLanguage } from '../contexts/LanguageContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Sidebar = () => {
  const { t } = useLanguage();
  const navItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/' },
    { icon: BookOpen, label: t('courses'), path: '/courses' },
    { icon: MessageSquare, label: t('tutor'), path: '/tutor' },
    { icon: BrainCircuit, label: t('problem'), path: '/problem' },
    { icon: ClipboardList, label: t('quizzes'), path: '/quizzes' },
    { icon: Calendar, label: t('schedule'), path: '/schedule' },
    { icon: Languages, label: t('language'), path: '/language' },
    { icon: User, label: t('profile'), path: '/profile' },
  ];

  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 flex items-center justify-between px-8 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3 mr-8 shrink-0">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
          <GraduationCap size={24} />
        </div>
        <span className="font-display font-bold text-xl tracking-tight hidden lg:block">Eduwave</span>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                isActive 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" 
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              )
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-4 ml-8 shrink-0">
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-zinc-50 rounded-full border border-zinc-100">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-[10px]">
            EX
          </div>
          <span className="text-xs font-semibold text-zinc-700">Explorer</span>
        </div>
        <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};
