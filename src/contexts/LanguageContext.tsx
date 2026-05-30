import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    courses: 'Courses',
    tutor: 'AI Tutor',
    problem: 'Daily Problem',
    quizzes: 'Quizzes',
    schedule: 'Schedule',
    profile: 'Profile',
    language: 'Language',
    welcome: 'Welcome back',
    settings: 'Settings'
  },
  es: {
    dashboard: 'Tablero',
    courses: 'Cursos',
    tutor: 'Tutor IA',
    problem: 'Problema Diario',
    quizzes: 'Cuestionarios',
    schedule: 'Horario',
    profile: 'Perfil',
    language: 'Idioma',
    welcome: 'Bienvenido de nuevo',
    settings: 'Ajustes'
  },
  fr: {
    dashboard: 'Tableau de bord',
    courses: 'Cours',
    tutor: 'Tuteur IA',
    problem: 'Problème Quotidien',
    quizzes: 'Quiz',
    schedule: 'Emploi du temps',
    profile: 'Profil',
    language: 'Langue',
    welcome: 'Bon retour',
    settings: 'Paramètres'
  },
  de: {
    dashboard: 'Dashboard',
    courses: 'Kurse',
    tutor: 'KI-Tutor',
    problem: 'Tagesaufgabe',
    quizzes: 'Quiz',
    schedule: 'Stundenplan',
    profile: 'Profil',
    language: 'Sprache',
    welcome: 'Willkommen zurück',
    settings: 'Einstellungen'
  },
  zh: {
    dashboard: '仪表板',
    courses: '课程',
    tutor: 'AI 导师',
    problem: '每日一题',
    quizzes: '测验',
    schedule: '课程表',
    profile: '个人资料',
    language: '语言',
    welcome: '欢迎回来',
    settings: '设置'
  },
  ja: {
    dashboard: 'ダッシュボード',
    courses: 'コース',
    tutor: 'AIチューター',
    problem: '今日の問題',
    quizzes: 'クイズ',
    schedule: 'スケジュール',
    profile: 'プロフィール',
    language: '言語',
    welcome: 'おかえりなさい',
    settings: '設定'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
