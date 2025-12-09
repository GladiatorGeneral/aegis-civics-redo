'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { NeuralBackground } from '@/holographic-ui/components';
import { civicsCourses, type CivicsCourse } from '@/data/civicsCourses';

function difficultyStyles(difficulty: CivicsCourse['difficulty']) {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    case 'Intermediate':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'Advanced':
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
}

function colorStyles(color: string) {
  const palette: Record<string, string> = {
    blue: 'bg-blue-500/20 border-blue-500/30',
    purple: 'bg-purple-500/20 border-purple-500/30',
    green: 'bg-green-500/20 border-green-500/30',
    orange: 'bg-orange-500/20 border-orange-500/30',
    red: 'bg-red-500/20 border-red-500/30',
    teal: 'bg-teal-500/20 border-teal-500/30',
  };

  return palette[color] ?? 'bg-white/5 border-white/10';
}

function courseProgress(progressMap: Record<string, number>, course: CivicsCourse) {
  return progressMap[course.id] ?? course.progress;
}

function CourseCard({ course, progress }: { course: CivicsCourse; progress: number }) {
  return (
    <Link href={`/civics-learning/${course.id}`} className="block h-full">
      <div
        className={`glass-morphism rounded-lg p-6 border-2 hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col ${colorStyles(course.color)}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{course.emoji}</div>
            <div>
              <h3 className="text-lg font-semibold electric-blue">{course.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyStyles(course.difficulty)}`}>
                  {course.difficulty}
                </span>
                <span className="text-xs text-gray-400">{course.duration}</span>
              </div>
            </div>
          </div>
          <i className={`fas ${course.icon} text-lg text-gray-400`} aria-hidden />
        </div>

        <p className="text-gray-300 text-sm mb-4 flex-grow">{course.description}</p>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <i className="fas fa-book text-gray-400" aria-hidden />
              <span className="text-gray-400">{course.lessonCount} lessons</span>
            </div>

            {progress === 100 ? (
              <span className="flex items-center gap-1 text-green-400">
                <i className="fas fa-check-circle" aria-hidden />
                Completed
              </span>
            ) : progress > 0 ? (
              <span className="flex items-center gap-1 text-yellow-400">
                <i className="fas fa-spinner animate-spin" aria-hidden />
                Continue
              </span>
            ) : (
              <span className="flex items-center gap-1 text-cyan-300">
                <i className="fas fa-play-circle" aria-hidden />
                Start Course
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CivicsLearningPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('civics-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, number>;
        setProgressMap(parsed);
      } catch (err) {
        console.error('Failed to parse progress map', err);
      }
    }
  }, []);

  const coursesWithProgress = useMemo(() => {
    return civicsCourses.map((course) => ({
      ...course,
      progress: courseProgress(progressMap, course),
    }));
  }, [progressMap]);

  const filteredCourses = useMemo(() => {
    return coursesWithProgress.filter((course) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'in-progress' && course.progress > 0 && course.progress < 100) ||
        (filter === 'completed' && course.progress === 100) ||
        (filter === 'not-started' && course.progress === 0) ||
        filter === course.difficulty.toLowerCase();

      const matchesSearch =
        searchTerm.trim() === '' ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [coursesWithProgress, filter, searchTerm]);

  const overallProgress = useMemo(() => {
    if (coursesWithProgress.length === 0) return 0;
    const total = coursesWithProgress.reduce((acc, course) => acc + course.progress, 0);
    return total / coursesWithProgress.length;
  }, [coursesWithProgress]);

  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <NeuralBackground intensity="medium" />
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gradient">Civics Learning Center</h1>
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
              Master American government and civic engagement through interactive courses and lessons.
            </p>

            <div className="glass-morphism rounded-lg p-6 mb-8 max-w-3xl mx-auto border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Learning Progress</h3>
                <span className="text-2xl font-bold electric-blue">{overallProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 progress-bar"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{coursesWithProgress.filter((c) => c.progress === 100).length} courses completed</span>
                <span>
                  {coursesWithProgress.filter((c) => c.progress > 0 && c.progress < 100).length} in progress
                </span>
              </div>
            </div>
          </div>

          <div className="glass-morphism rounded-lg p-6 mb-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Filter Courses</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm"
                >
                  <option value="all">All Courses</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="not-started">Not Started</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Search Courses</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm placeholder-gray-400"
                  />
                  <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      aria-label="Clear search"
                    >
                      <i className="fas fa-times" aria-hidden />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filter === 'all' ? 'bg-cyan-500 text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                All ({coursesWithProgress.length})
              </button>
              <button
                onClick={() => setFilter('in-progress')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filter === 'in-progress' ? 'bg-yellow-500 text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                In Progress ({coursesWithProgress.filter((c) => c.progress > 0 && c.progress < 100).length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filter === 'completed' ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Completed ({coursesWithProgress.filter((c) => c.progress === 100).length})
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} progress={course.progress} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="glass-morphism rounded-lg p-12 text-center border border-white/10">
              <i className="fas fa-search text-5xl text-gray-400 mb-4" aria-hidden />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No courses found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search term.</p>
              <button
                onClick={() => {
                  setFilter('all');
                  setSearchTerm('');
                }}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg transition-colors text-white"
              >
                Reset Filters
              </button>
            </div>
          )}

          <div className="glass-morphism rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 electric-blue">Learning Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold electric-blue mb-1">{coursesWithProgress.length}</div>
                <div className="text-sm text-gray-400">Total Courses</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {coursesWithProgress.filter((c) => c.progress === 100).length}
                </div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  {coursesWithProgress.reduce((acc, course) => acc + course.lessons.length, 0)}
                </div>
                <div className="text-sm text-gray-400">Total Lessons</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {coursesWithProgress.reduce((acc, course) => {
                    const totalMinutes = course.lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
                    return acc + totalMinutes;
                  }, 0)}
                </div>
                <div className="text-sm text-gray-400">Total Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
