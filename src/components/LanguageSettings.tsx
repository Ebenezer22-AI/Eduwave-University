import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages, Check, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export const LanguageSettings = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { id: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
    { id: 'es', name: 'Spanish', native: 'Español', flag: 'es' },
    { id: 'fr', name: 'French', native: 'Français', flag: 'fr' },
    { id: 'de', name: 'German', native: 'Deutsch', flag: 'de' },
    { id: 'zh', name: 'Chinese', native: '中文', flag: 'cn' },
    { id: 'ja', name: 'Japanese', native: '日本語', flag: 'jp' },
  ] as const;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-display font-bold text-zinc-900">{t('language')}</h1>
        <p className="text-zinc-500 mt-1">Select your preferred language for the Eduwave interface.</p>
      </header>

      <div className="flex flex-col gap-3">
        {languages.map((lang) => (
          <motion.button
            key={lang.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setLanguage(lang.id)}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${
              language === lang.id 
                ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                : 'bg-white border-zinc-100 hover:border-zinc-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                language === lang.id ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-400'
              }`}>
                <Globe size={20} />
              </div>
              <div>
                <p className={`font-bold text-sm ${language === lang.id ? 'text-indigo-900' : 'text-zinc-900'}`}>
                  {lang.name}
                </p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{lang.native}</p>
              </div>
            </div>
            
            {language === lang.id && (
              <div className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                <Check size={12} />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-4">
        <div className="p-2 bg-indigo-600 text-white rounded-lg">
          <Languages size={20} />
        </div>
        <div>
          <h3 className="font-bold text-indigo-900">Translation Note</h3>
          <p className="text-sm text-indigo-800/70 mt-1 leading-relaxed">
            Changing the language will update the main navigation and interface elements. 
            Course content and AI Tutor responses will remain in their original language or adapt based on your interaction.
          </p>
        </div>
      </div>
    </div>
  );
};
