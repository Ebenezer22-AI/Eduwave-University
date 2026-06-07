import React, { useState, useEffect } from 'react';
import { BrainCircuit, CheckCircle2, XCircle, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { DailyProblem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const ProblemOfTheDay = () => {
  const [problem, setProblem] = useState<DailyProblem | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorDesc, setErrorDesc] = useState<string | null>(null);

  const fetchProblem = async () => {
    setIsLoading(true);
    setIsSubmitted(false);
    setSelectedOption(null);
    setErrorDesc(null);
    try {
      const data = await geminiService.generateDailyProblem();
      setProblem(data);
    } catch (err: any) {
      console.error("Failed to fetch problem:", err);
      setErrorDesc(err?.message || "Failed to load problem. Please verify your connection or refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
  };

  const isCorrect = selectedOption === problem?.correctAnswer;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-500 font-medium animate-pulse">Generating today's challenge...</p>
      </div>
    );
  }

  if (errorDesc || !problem) {
    return (
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto h-[60vh] text-center p-6 space-y-6">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center">
          <XCircle size={36} />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-zinc-900">Failed to Load Daily Problem</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            {errorDesc || "An unexpected error occurred while generating today's challenge."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button 
            onClick={fetchProblem}
            className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors text-sm shadow-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-zinc-900">Problem of the Day</h1>
          <p className="text-zinc-500 mt-1">Sharpen your skills with a daily academic challenge.</p>
        </div>
        <button 
          onClick={fetchProblem}
          className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
          title="Get a new problem"
        >
          <RefreshCw size={20} />
        </button>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden"
      >
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
              {problem.subject}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">
              Difficulty: Advanced
            </span>
          </div>

          <h2 className="text-xl font-semibold text-zinc-900 leading-relaxed">
            {problem.question}
          </h2>

          <div className="space-y-3">
            {problem.options?.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrectOption = isSubmitted && option === problem.correctAnswer;
              const isWrongSelection = isSubmitted && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isSubmitted}
                  className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between group ${
                    isCorrectOption 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900' 
                      : isWrongSelection
                      ? 'bg-rose-50 border-rose-500 text-rose-900'
                      : isSelected
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-900'
                      : 'bg-zinc-50 border-transparent hover:border-zinc-200 text-zinc-700'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isCorrectOption 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : isWrongSelection
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : isSelected
                      ? 'bg-indigo-500 border-indigo-500 text-white'
                      : 'border-zinc-300 group-hover:border-zinc-400'
                  }`}>
                    {isCorrectOption ? <CheckCircle2 size={14} /> : 
                     isWrongSelection ? <XCircle size={14} /> : 
                     isSelected ? <div className="w-2 h-2 bg-white rounded-full" /> : null}
                  </div>
                </button>
              );
            })}
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              Submit Answer
              <ChevronRight size={18} />
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`p-6 rounded-2xl ${isCorrect ? 'bg-emerald-50 border border-emerald-100' : 'bg-rose-50 border border-rose-100'}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                  {isCorrect ? <Sparkles size={18} /> : <AlertCircle size={18} />}
                </div>
                <h3 className={`font-bold ${isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                  {isCorrect ? 'Brilliant! That is correct.' : 'Not quite right this time.'}
                </h3>
              </div>
              <p className={`text-sm leading-relaxed ${isCorrect ? 'text-emerald-800/80' : 'text-rose-800/80'}`}>
                <span className="font-bold block mb-1">Explanation:</span>
                {problem.explanation}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const AlertCircle = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
