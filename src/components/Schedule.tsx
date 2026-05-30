import React from 'react';
import { SCHEDULE, COURSES } from '../constants';
import { Clock, MapPin } from 'lucide-react';

export const Schedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-display font-bold text-zinc-900">Weekly Schedule</h1>
        <p className="text-zinc-500 mt-1">Spring Semester 2026</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {days.map((day, index) => {
          const dayEvents = SCHEDULE.filter(e => e.dayOfWeek === index + 1);
          
          return (
            <div key={day} className="space-y-4">
              <div className="bg-zinc-100 p-3 rounded-xl text-center">
                <span className="text-sm font-bold text-zinc-600 uppercase tracking-wider">{day}</span>
              </div>
              
              <div className="space-y-3">
                {dayEvents.length > 0 ? (
                  dayEvents.map(event => {
                    const course = COURSES.find(c => c.id === event.courseId);
                    return (
                      <div key={event.id} className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm hover:border-indigo-200 transition-all cursor-pointer">
                        <div className={`w-1 h-8 rounded-full mb-3 ${course?.color || 'bg-zinc-300'}`} />
                        <h4 className="text-sm font-bold text-zinc-900 leading-tight">{event.title}</h4>
                        <p className="text-[10px] text-zinc-500 mt-1 font-medium">{course?.code}</p>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                            <Clock size={12} />
                            <span>{event.startTime} - {event.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                            <MapPin size={12} />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="h-32 rounded-xl border border-dashed border-zinc-200 flex items-center justify-center">
                    <span className="text-[10px] text-zinc-300 font-medium italic">No classes</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
