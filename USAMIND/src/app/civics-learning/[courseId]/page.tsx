'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { NeuralBackground } from '@/holographic-ui/components';
import { civicsCourses, type CivicsCourse, type CivicsLesson } from '@/data/civicsCourses';

function lessonIcon(type: CivicsLesson['type']) {
  switch (type) {
    case 'video':
      return 'fas fa-play-circle text-blue-400';
    case 'text':
      return 'fas fa-file-alt text-green-400';
    case 'quiz':
      return 'fas fa-question-circle text-purple-400';
    case 'interactive':
      return 'fas fa-mouse-pointer text-yellow-400';
    default:
      return 'fas fa-circle text-gray-400';
  }
}

function CourseNotFound() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-white">
      <NeuralBackground intensity="medium" />
      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Course not found</h1>
          <p className="text-gray-400">
            Return to{' '}
            <Link href="/civics-learning" className="text-cyan-400 hover:underline">
              Civics Learning Center
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CourseDetail() {
  const params = useParams<{ courseId: string }>();
  const courseId = params?.courseId;

  const [course, setCourse] = useState<CivicsCourse | null>(null);
  const [activeLesson, setActiveLesson] = useState<CivicsLesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [userProgress, setUserProgress] = useState(0);

  const totalLessons = useMemo(() => course?.lessons.length ?? 0, [course]);

  const updateGlobalProgress = (progressValue: number) => {
    if (typeof window === 'undefined' || !courseId) return;
    const saved = localStorage.getItem('civics-progress');
    const map = saved ? (JSON.parse(saved) as Record<string, number>) : {};
    localStorage.setItem('civics-progress', JSON.stringify({ ...map, [courseId]: progressValue }));
  };

  useEffect(() => {
    if (!courseId) return;

    const foundCourse = civicsCourses.find((c) => c.id === courseId) ?? null;
    setCourse(foundCourse);
    if (!foundCourse) return;

    const saved = typeof window !== 'undefined'
      ? localStorage.getItem(`course-${courseId}-completed`)
      : null;

    let initialCompleted: Set<string>;
    try {
      initialCompleted = saved
        ? new Set<string>(JSON.parse(saved))
        : new Set(foundCourse.lessons.filter((lesson) => lesson.completed).map((lesson) => lesson.id));
    } catch (err) {
      console.error('Failed to parse saved lessons', err);
      initialCompleted = new Set(foundCourse.lessons.filter((lesson) => lesson.completed).map((lesson) => lesson.id));
    }

    setCompletedLessons(initialCompleted);

    const initialProgress = Math.round((initialCompleted.size / foundCourse.lessons.length) * 100);
    setUserProgress(initialProgress);
    updateGlobalProgress(initialProgress);

    const firstActive = foundCourse.lessons.find((lesson) => !initialCompleted.has(lesson.id)) ?? foundCourse.lessons[0];
    setActiveLesson(firstActive);
  }, [courseId]);

  const persistCompletion = (updated: Set<string>) => {
    if (!courseId || !course) return;
    localStorage.setItem(`course-${courseId}-completed`, JSON.stringify([...updated]));

    const progressValue = totalLessons > 0 ? Math.round((updated.size / totalLessons) * 100) : 0;
    setUserProgress(progressValue);
    updateGlobalProgress(progressValue);
  };

  const markLessonComplete = (lessonId: string) => {
    const updated = new Set(completedLessons);
    updated.add(lessonId);
    setCompletedLessons(updated);
    persistCompletion(updated);
  };

  if (!course) {
    return <CourseNotFound />;
  }

  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <NeuralBackground intensity="medium" />
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{course.emoji}</div>
                <div>
                  <h1 className="text-3xl font-bold electric-blue">{course.title}</h1>
                  <p className="text-gray-300">{course.description}</p>
                </div>
              </div>
              <Link
                href="/civics-learning"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <i className="fas fa-arrow-left" aria-hidden />
                Back to courses
              </Link>
            </div>

            <div className="glass-morphism rounded-lg p-6 mt-6 border border-white/10">
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <i className="fas fa-chart-line text-cyan-400" aria-hidden />
                  <div>
                    <div className="text-sm text-gray-400">Progress</div>
                    <div className="text-xl font-bold">{userProgress.toFixed(0)}%</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <i className="fas fa-clock text-yellow-400" aria-hidden />
                  <div>
                    <div className="text-sm text-gray-400">Duration</div>
                    <div className="text-xl font-bold">{course.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <i className="fas fa-book text-green-400" aria-hidden />
                  <div>
                    <div className="text-sm text-gray-400">Lessons</div>
                    <div className="text-xl font-bold">{course.lessons.length}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <i className="fas fa-graduation-cap text-purple-400" aria-hidden />
                  <div>
                    <div className="text-sm text-gray-400">Level</div>
                    <div className="text-xl font-bold">{course.difficulty}</div>
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 progress-bar"
                  style={{ width: `${userProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="glass-morphism rounded-lg p-6 sticky top-24 border border-white/10">
                <h3 className="text-lg font-semibold mb-4 electric-blue">Course Lessons</h3>
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left p-3 rounded-lg transition-colors border ${
                        activeLesson?.id === lesson.id
                          ? 'bg-cyan-500/15 border-cyan-500/30'
                          : 'border-transparent hover:bg-white/5'
                      } ${completedLessons.has(lesson.id) ? 'opacity-80' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              completedLessons.has(lesson.id)
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-white/10 text-gray-300'
                            }`}
                          >
                            {completedLessons.has(lesson.id) ? (
                              <i className="fas fa-check text-xs" aria-hidden />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{lesson.title}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <i className={lessonIcon(lesson.type)} aria-hidden />
                              <span>{lesson.duration} min</span>
                            </div>
                          </div>
                        </div>

                        {completedLessons.has(lesson.id) && (
                          <i className="fas fa-check-circle text-green-400" aria-hidden />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      if (activeLesson && !completedLessons.has(activeLesson.id)) {
                        markLessonComplete(activeLesson.id);
                      }
                    }}
                    disabled={!activeLesson || completedLessons.has(activeLesson?.id ?? '')}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors mb-3 ${
                      activeLesson && completedLessons.has(activeLesson.id)
                        ? 'bg-green-500/20 text-green-300 cursor-not-allowed'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-white'
                    }`}
                  >
                    {activeLesson && completedLessons.has(activeLesson.id)
                      ? '✓ Lesson Completed'
                      : 'Mark Lesson Complete'}
                  </button>

                  {userProgress === 100 ? (
                    <div className="text-center p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <i className="fas fa-trophy text-yellow-400 mb-2 text-xl" aria-hidden />
                      <div className="font-semibold">Course Complete! 🎉</div>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-400">
                      {completedLessons.size} of {course.lessons.length} lessons completed
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {activeLesson ? (
                <div className="glass-morphism rounded-lg p-6 border border-white/10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-semibold electric-blue">{activeLesson.title}</h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                          <i className="fas fa-clock" aria-hidden />
                          {activeLesson.duration} minutes
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            activeLesson.type === 'video'
                              ? 'bg-blue-500/20 text-blue-300'
                              : activeLesson.type === 'text'
                                ? 'bg-green-500/20 text-green-300'
                                : activeLesson.type === 'quiz'
                                  ? 'bg-purple-500/20 text-purple-300'
                                  : 'bg-yellow-500/20 text-yellow-300'
                          }`}
                        >
                          {activeLesson.type.charAt(0).toUpperCase() + activeLesson.type.slice(1)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => markLessonComplete(activeLesson.id)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        completedLessons.has(activeLesson.id)
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200'
                      }`}
                    >
                      {completedLessons.has(activeLesson.id) ? (
                        <span className="flex items-center gap-2">
                          <i className="fas fa-check" aria-hidden />
                          Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <i className="fas fa-check-circle" aria-hidden />
                          Mark Complete
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="lesson-content">
                    {activeLesson.type === 'video' && (
                      <div className="mb-6">
                        <div className="aspect-video bg-black/30 rounded-lg mb-4 flex items-center justify-center">
                          <div className="text-center">
                            <i className="fas fa-play-circle text-6xl text-cyan-400 mb-2" aria-hidden />
                            <div className="text-gray-300">Video Lesson</div>
                            <div className="text-sm text-gray-400">Duration: {activeLesson.duration} minutes</div>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">
                          This video lesson covers key concepts related to {activeLesson.title.toLowerCase()}.
                          Watch the presentation and take notes on important points.
                        </p>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-300 mb-2">Learning Objectives</h4>
                          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li>Understand the key principles</li>
                            <li>Identify real-world applications</li>
                            <li>Recognize historical context</li>
                            <li>Apply knowledge to current events</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeLesson.type === 'text' && (
                      <div className="mb-6">
                        <div className="prose prose-invert max-w-none">
                          <h4 className="text-lg font-semibold mb-3">Reading Material</h4>
                          <div className="bg-white/5 rounded-lg p-6 mb-4">
                            <p className="text-gray-300 mb-4">
                              This lesson provides detailed text content about {activeLesson.title.toLowerCase()}.
                              Read carefully and make note of key terms and concepts.
                            </p>

                            <div className="space-y-4">
                              <div>
                                <h5 className="font-semibold text-cyan-300 mb-2">Key Concepts</h5>
                                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                  <li>Foundational principles and theories</li>
                                  <li>Historical development and context</li>
                                  <li>Contemporary applications and debates</li>
                                  <li>Relevance to current political discourse</li>
                                </ul>
                              </div>

                              <div>
                                <h5 className="font-semibold text-cyan-300 mb-2">Important Terms</h5>
                                <div className="flex flex-wrap gap-2">
                                  {['Democracy', 'Republic', 'Federalism', 'Checks and Balances', 'Separation of Powers'].map((term) => (
                                    <span key={term} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                      {term}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeLesson.type === 'quiz' && (
                      <div className="mb-6">
                        <QuizComponent lessonId={activeLesson.id} onComplete={() => markLessonComplete(activeLesson.id)} />
                      </div>
                    )}

                    {activeLesson.type === 'interactive' && (
                      <div className="mb-6">
                        <InteractiveComponent lessonId={activeLesson.id} onComplete={() => markLessonComplete(activeLesson.id)} />
                      </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-white/10">
                      <h4 className="font-semibold mb-3 text-gray-300">Your Notes</h4>
                      <textarea
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
                        rows={3}
                        placeholder="Take notes on this lesson..."
                      />
                      <div className="flex justify-end mt-2">
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
                          Save Notes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-morphism rounded-lg p-12 text-center border border-white/10">
                  <i className="fas fa-book-open text-5xl text-gray-400 mb-4" aria-hidden />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">Select a Lesson</h3>
                  <p className="text-gray-400">Choose a lesson from the sidebar to begin learning.</p>
                </div>
              )}

              {activeLesson && (
                <div className="flex flex-col md:flex-row justify-between gap-3 mt-6">
                  <button
                    onClick={() => {
                      const currentIndex = course.lessons.findIndex((l) => l.id === activeLesson.id);
                      if (currentIndex > 0) {
                        setActiveLesson(course.lessons[currentIndex - 1]);
                      }
                    }}
                    disabled={course.lessons.findIndex((l) => l.id === activeLesson.id) === 0}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-arrow-left mr-2" aria-hidden />
                    Previous Lesson
                  </button>

                  <button
                    onClick={() => {
                      const currentIndex = course.lessons.findIndex((l) => l.id === activeLesson.id);
                      if (currentIndex < course.lessons.length - 1) {
                        setActiveLesson(course.lessons[currentIndex + 1]);
                      }
                    }}
                    disabled={course.lessons.findIndex((l) => l.id === activeLesson.id) === course.lessons.length - 1}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Lesson
                    <i className="fas fa-arrow-right ml-2" aria-hidden />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizComponent({ lessonId, onComplete }: { lessonId: string; onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: 'What is the primary purpose of the legislative branch?',
      options: ['To enforce laws', 'To interpret laws', 'To make laws', 'To review laws'],
      correct: 2,
    },
    {
      question: 'How many chambers are in the U.S. Congress?',
      options: ['One', 'Two', 'Three', 'Four'],
      correct: 1,
    },
    {
      question: 'Which article of the Constitution establishes the legislative branch?',
      options: ['Article I', 'Article II', 'Article III', 'Article IV'],
      correct: 0,
    },
  ];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizComplete(true);
      onComplete();
    }
  };

  if (quizComplete) {
    return (
      <div className="bg-white/5 rounded-lg p-6 text-center">
        <i className="fas fa-trophy text-5xl text-yellow-400 mb-4" aria-hidden />
        <h4 className="text-xl font-semibold mb-2">Quiz Complete!</h4>
        <p className="text-gray-300 mb-4">
          You scored {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
        </p>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setQuizComplete(false);
          }}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h4 className="text-lg font-semibold mb-4">Knowledge Check</h4>
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <h5 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h5>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={option}
              onClick={() => handleAnswer(index)}
              className="quiz-option w-full p-4 text-left bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div>Score: {score} correct</div>
        <div>
          Progress: {currentQuestion + 1}/{questions.length}
        </div>
      </div>
    </div>
  );
}

function InteractiveComponent({ lessonId, onComplete }: { lessonId: string; onComplete: () => void }) {
  const [interactiveComplete, setInteractiveComplete] = useState(false);

  const renderContent = () => {
    if (lessonId.includes('bl-')) {
      return (
        <div className="space-y-6">
          <h4 className="text-lg font-semibold mb-4">Legislative Process Simulation</h4>
          <p className="text-gray-300 mb-4">Drag and drop the steps of how a bill becomes law in the correct order:</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-cyan-300">Available Steps</h5>
              <div className="space-y-2">
                {['Bill Introduction', 'Committee Review', 'Floor Debate', 'Presidential Signature'].map((step) => (
                  <div key={step} className="p-3 bg-white/10 rounded cursor-move" draggable>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-green-400">Correct Order</h5>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="drop-zone p-3 bg-green-500/10 rounded border border-green-500/20">
                    {num}. Drop step here
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (lessonId.includes('c-')) {
      return (
        <div>
          <h4 className="text-lg font-semibold mb-4">Constitutional Amendments Matching</h4>
          <p className="text-gray-300 mb-4">Match the amendment with its description:</p>
          <div className="grid md:grid-cols-2 gap-3">
            {['1st Amendment', '2nd Amendment', '4th Amendment', '14th Amendment'].map((item) => (
              <div key={item} className="p-4 rounded-lg bg-white/5 border border-white/10">
                {item}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <i className="fas fa-puzzle-piece text-5xl text-yellow-400 mb-4" aria-hidden />
        <h4 className="text-lg font-semibold mb-2">Interactive Activity</h4>
        <p className="text-gray-300 mb-6">Complete the interactive exercise to reinforce your learning.</p>
      </div>
    );
  };

  return (
    <div className="bg-white/5 rounded-lg p-6">
      {renderContent()}

      {!interactiveComplete ? (
        <button
          onClick={() => {
            setInteractiveComplete(true);
            onComplete();
          }}
          className="w-full mt-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-lg transition-colors"
        >
          Complete Interactive Activity
        </button>
      ) : (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-3">
            <i className="fas fa-check-circle text-green-400 text-xl" aria-hidden />
            <div>
              <div className="font-semibold text-green-300">Activity Complete!</div>
              <div className="text-sm text-gray-300">You've successfully completed the interactive exercise.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
