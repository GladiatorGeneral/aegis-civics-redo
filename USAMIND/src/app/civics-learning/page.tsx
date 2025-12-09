'use client';

/**
 * Civics Learning Page
 * Educational resources for civic engagement
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  progress?: number;
  category: string;
}

const COURSES: Course[] = [
  {
    id: '1',
    title: 'How a Bill Becomes Law',
    description: 'Learn the complete legislative process from introduction to presidential signature.',
    icon: '📜',
    level: 'beginner',
    duration: '45 min',
    lessons: 8,
    progress: 0,
    category: 'Legislative Process'
  },
  {
    id: '2',
    title: 'Understanding the Constitution',
    description: 'Deep dive into the founding document and its amendments.',
    icon: '⚖️',
    level: 'beginner',
    duration: '2 hours',
    lessons: 12,
    progress: 25,
    category: 'Foundations'
  },
  {
    id: '3',
    title: 'The Electoral System',
    description: 'How elections work from local to federal level, including the Electoral College.',
    icon: '🗳️',
    level: 'intermediate',
    duration: '1.5 hours',
    lessons: 10,
    progress: 0,
    category: 'Elections'
  },
  {
    id: '4',
    title: 'State vs Federal Powers',
    description: 'Understand federalism and how powers are divided between state and federal government.',
    icon: '🏛️',
    level: 'intermediate',
    duration: '1 hour',
    lessons: 6,
    progress: 0,
    category: 'Foundations'
  },
  {
    id: '5',
    title: 'Civic Participation Toolkit',
    description: 'Practical guide to engaging with your representatives and making your voice heard.',
    icon: '📢',
    level: 'beginner',
    duration: '30 min',
    lessons: 5,
    progress: 100,
    category: 'Participation'
  },
  {
    id: '6',
    title: 'Policy Analysis 101',
    description: 'Learn to analyze proposed legislation and understand its potential impacts.',
    icon: '📊',
    level: 'advanced',
    duration: '3 hours',
    lessons: 15,
    progress: 0,
    category: 'Advanced'
  }
];

const LEVEL_CONFIG = {
  beginner: { label: 'Beginner', color: 'bg-emerald-500/20 text-emerald-400' },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-500/20 text-yellow-400' },
  advanced: { label: 'Advanced', color: 'bg-red-500/20 text-red-400' }
};

function CourseCard({ course, index }: { course: Course; index: number }) {
  const level = LEVEL_CONFIG[course.level];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-emerald-500/30 transition-all group cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-3xl">
          {course.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded-full text-xs ${level.color}`}>
              {level.label}
            </span>
            <span className="text-white/40 text-xs">{course.duration}</span>
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
            {course.title}
          </h3>
          <p className="text-white/60 text-sm mb-4">{course.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs">{course.lessons} lessons</span>
            {course.progress !== undefined && course.progress > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-emerald-400 text-xs">{course.progress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CivicsLearningPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', ...new Set(COURSES.map(c => c.category))];
  const filteredCourses = selectedCategory === 'all' 
    ? COURSES 
    : COURSES.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="text-emerald-400">📚</span>
              <span className="text-emerald-400 text-sm font-medium">Civics Learning</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Empower Your Civic Knowledge
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Interactive courses designed to make you an informed and engaged citizen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Stats */}
      <section className="py-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Courses Available', value: '24', icon: '📖' },
              { label: 'Total Lessons', value: '186', icon: '🎯' },
              { label: 'Certificates Earned', value: '0', icon: '🏆' },
              { label: 'Learning Time', value: '0h', icon: '⏱️' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800/50 text-white/60 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Courses' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-emerald-400 text-sm font-medium">Featured Resource</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
                  Interactive Constitution Explorer
                </h2>
                <p className="text-white/60 mb-6">
                  Navigate through the Constitution with AI-powered explanations, historical context, and modern interpretations for every article and amendment.
                </p>
                <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
                  Explore Now →
                </button>
              </div>
              <div className="text-center">
                <div className="text-9xl opacity-50">📜</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Put Knowledge Into Action?
          </h2>
          <p className="text-white/60 mb-8">
            Track real legislation and connect with your representatives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/congressional-tracker"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              Track Congress →
            </Link>
            <Link
              href="/leaders"
              className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Find Your Reps
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
