import React, { useState } from 'react';
import { QUIZZES } from '../constants';
import { Quiz, QuizQuestion } from '../types';
import { BookOpen, Clock, ChevronRight, CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuizView = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  const handleAnswerSelect = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (!selectedQuiz) return;
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    if (!selectedQuiz) return 0;
    let correct = 0;
    selectedQuiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  if (isFinished && selectedQuiz) {
    const score = calculateScore();
    const total = selectedQuiz.questions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto"
        >
          <Trophy size={48} />
        </motion.div>
        
        <div>
          <h2 className="text-3xl font-display font-bold text-zinc-900">Quiz Completed!</h2>
          <p className="text-zinc-500 mt-2">Great effort on the {selectedQuiz.title} quiz.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm inline-block min-w-[300px]">
          <p className="text-sm text-zinc-400 uppercase tracking-widest font-bold">Your Score</p>
          <p className="text-6xl font-display font-bold text-zinc-900 mt-2">{percentage}%</p>
          <p className="text-zinc-500 mt-1">{score} out of {total} correct</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleStartQuiz(selectedQuiz)}
            className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all"
          >
            Try Again
          </button>
          <button 
            onClick={() => setSelectedQuiz(null)}
            className="w-full py-4 bg-white border border-zinc-200 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-50 transition-all"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <button 
              onClick={() => setSelectedQuiz(null)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 mb-2 block"
            >
              ← Back to Quizzes
            </button>
            <h1 className="text-2xl font-display font-bold text-zinc-900">{selectedQuiz.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Question</p>
            <p className="text-xl font-display font-bold text-zinc-900">
              {currentQuestionIndex + 1} / {selectedQuiz.questions.length}
            </p>
          </div>
        </header>

        <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <motion.div 
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8 space-y-8"
        >
          <h2 className="text-xl font-semibold text-zinc-900 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              const isSelected = answers[question.id] === option;
              return (
                <button
                  key={i}
                  onClick={() => handleAnswerSelect(question.id, option)}
                  className={`w-full p-5 rounded-2xl text-left border-2 transition-all flex items-center justify-between group ${
                    isSelected 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-900' 
                      : 'bg-zinc-50 border-transparent hover:border-zinc-200 text-zinc-700'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected 
                      ? 'bg-indigo-500 border-indigo-500 text-white' 
                      : 'border-zinc-300 group-hover:border-zinc-400'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={!answers[question.id]}
            className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-display font-bold text-zinc-900">Offline Quizzes</h1>
        <p className="text-zinc-500 mt-1">Test your knowledge with curated academic assessments.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUIZZES.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest rounded">
                  {quiz.subject}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-medium">
                  <Clock size={12} />
                  <span>{quiz.durationMinutes} min</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">{quiz.title}</h3>
              <p className="text-sm text-zinc-500 line-clamp-2">{quiz.description}</p>
            </div>
            <div className="px-6 pb-6 pt-0">
              <button 
                onClick={() => handleStartQuiz(quiz)}
                className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
              >
                Start Quiz
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
