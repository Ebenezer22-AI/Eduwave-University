import React from 'react';
import { User, Mail, Book, Award, Calendar, MapPin, Shield, Bell, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

export const Profile = () => {
  const user = {
    name: 'Explorer',
    email: 'explorer@eduwave.edu',
    major: 'Computer Science & Physics',
    year: 'Junior (Year 3)',
    studentId: 'EW-2024-0892',
    gpa: '3.85',
    credits: '84 / 120',
    location: 'San Francisco, CA',
    joined: 'September 2024'
  };

  const stats = [
    { label: 'Completed Courses', value: '22', icon: Book, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Certificates', value: '5', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Study Hours', value: '1,240', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-display font-bold text-zinc-900">My Profile</h1>
        <p className="text-zinc-500 mt-1">Manage your personal information and academic records.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                  <div className="w-full h-full rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-3xl font-bold">
                    EX
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full" />
              </div>
              
              <h2 className="text-xl font-bold text-zinc-900">{user.name}</h2>
              <p className="text-sm text-zinc-500">{user.major}</p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <Mail size={16} className="text-zinc-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <MapPin size={16} className="text-zinc-400" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <Calendar size={16} className="text-zinc-400" />
                  <span>Joined {user.joined}</span>
                </div>
              </div>

              <button className="w-full mt-8 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-zinc-900">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 text-sm text-zinc-600 transition-colors">
                <Shield size={18} />
                <span>Privacy Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 text-sm text-zinc-600 transition-colors">
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 text-sm text-rose-600 transition-colors">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Academic Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-zinc-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100">
              <h3 className="font-bold text-zinc-900">Academic Overview</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Student ID</p>
                  <p className="font-mono text-sm font-semibold text-zinc-900">{user.studentId}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Current GPA</p>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-display font-bold text-zinc-900">{user.gpa}</p>
                    <p className="text-sm text-emerald-600 font-medium mb-1">Top 5%</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Academic Year</p>
                  <p className="text-sm font-semibold text-zinc-900">{user.year}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Degree Progress</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-500">{user.credits} Credits</span>
                      <span className="text-zinc-900">70%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6">
            <h3 className="font-bold text-zinc-900 mb-6">Recent Achievements</h3>
            <div className="space-y-4">
              {[
                { title: 'Dean\'s List', date: 'Fall 2025', desc: 'Recognized for outstanding academic performance.' },
                { title: 'AI Research Grant', date: 'January 2026', desc: 'Awarded for excellence in neural network studies.' },
                { title: 'Hackathon Winner', date: 'November 2025', desc: 'First place in the annual University Code Jam.' },
              ].map((ach, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-amber-500 shadow-sm">
                    <Award size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-900">{ach.title}</h4>
                      <span className="text-[10px] font-medium text-zinc-400 uppercase">{ach.date}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
