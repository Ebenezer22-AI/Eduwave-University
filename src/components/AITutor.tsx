import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const AITutor = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: 'Hello! I am your Eduwave AI Tutor. How can I help you with your studies today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await geminiService.chat(messages, userMessage);
      setMessages(prev => [...prev, { role: 'model', content: response || "I'm sorry, I couldn't process that." }]);
    } catch (error: any) {
      console.error(error);
      const errMsg = error?.message || "There was an error connecting to the AI service.";
      setMessages(prev => [...prev, { role: 'model', content: `⚠️ **AI Service Error:**\n\n${errMsg}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
      <div className="p-4 border-bottom border-zinc-100 bg-indigo-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Bot size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-indigo-900">Eduwave AI Tutor</h2>
            <p className="text-[10px] text-indigo-600 flex items-center gap-1">
              <Sparkles size={10} /> Powered by Gemini
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-zinc-200 text-zinc-600' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-zinc-50 text-zinc-800 border border-zinc-100 rounded-tl-none'
                }`}>
                  <div className="markdown-body">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 animate-pulse">
                <Bot size={16} />
              </div>
              <div className="bg-zinc-50 p-4 rounded-2xl rounded-tl-none border border-zinc-100">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-zinc-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about your courses..."
            className="w-full pl-4 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-zinc-400 mt-2 text-center">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};
