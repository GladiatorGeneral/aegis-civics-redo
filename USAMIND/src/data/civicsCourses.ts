export interface CivicsLesson {
  id: string;
  title: string;
  duration: number; // in minutes
  completed: boolean;
  type: 'video' | 'text' | 'quiz' | 'interactive';
}

export interface CivicsCourse {
  id: string;
  emoji: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonCount: number;
  progress: number; // 0-100
  lessons: CivicsLesson[];
  icon: string;
  color: string;
}

export const civicsCourses: CivicsCourse[] = [
  {
    id: 'bill-to-law',
    emoji: '📜',
    title: 'How a Bill Becomes Law',
    description: 'Learn the complete legislative process from introduction to presidential signature.',
    difficulty: 'Beginner',
    duration: '45 min',
    lessonCount: 8,
    progress: 0,
    icon: 'fas fa-file-contract',
    color: 'blue',
    lessons: [
      { id: 'bl-1', title: 'Introduction to Legislation', duration: 5, completed: false, type: 'video' },
      { id: 'bl-2', title: 'Bill Drafting Process', duration: 7, completed: false, type: 'text' },
      { id: 'bl-3', title: 'Committee Review', duration: 8, completed: false, type: 'interactive' },
      { id: 'bl-4', title: 'Floor Debate & Voting', duration: 10, completed: false, type: 'video' },
      { id: 'bl-5', title: 'Conference Committee', duration: 6, completed: false, type: 'text' },
      { id: 'bl-6', title: 'Presidential Action', duration: 5, completed: false, type: 'quiz' },
      { id: 'bl-7', title: 'Case Study: The ADA', duration: 12, completed: false, type: 'interactive' },
      { id: 'bl-8', title: 'Final Assessment', duration: 10, completed: false, type: 'quiz' }
    ]
  },
  {
    id: 'constitution',
    emoji: '⚖️',
    title: 'Understanding the Constitution',
    description: 'Deep dive into the founding document and its amendments.',
    difficulty: 'Beginner',
    duration: '2 hours',
    lessonCount: 12,
    progress: 0,
    icon: 'fas fa-scroll',
    color: 'purple',
    lessons: [
      { id: 'c-1', title: 'Preamble & Purpose', duration: 8, completed: false, type: 'video' },
      { id: 'c-2', title: 'Articles I-III: Branches', duration: 15, completed: false, type: 'text' },
      { id: 'c-3', title: 'Bill of Rights', duration: 20, completed: false, type: 'interactive' },
      { id: 'c-4', title: 'Amendments 11-27', duration: 25, completed: false, type: 'video' },
      { id: 'c-5', title: 'Commerce Clause', duration: 12, completed: false, type: 'text' },
      { id: 'c-6', title: 'Due Process', duration: 15, completed: false, type: 'quiz' },
      { id: 'c-7', title: 'Equal Protection', duration: 10, completed: false, type: 'interactive' },
      { id: 'c-8', title: '1st Amendment', duration: 18, completed: false, type: 'video' },
      { id: 'c-9', title: '2nd Amendment', duration: 15, completed: false, type: 'text' },
      { id: 'c-10', title: '4th Amendment', duration: 12, completed: false, type: 'quiz' },
      { id: 'c-11', title: '14th Amendment', duration: 20, completed: false, type: 'interactive' },
      { id: 'c-12', title: 'Supreme Court Review', duration: 15, completed: false, type: 'quiz' }
    ]
  },
  {
    id: 'electoral-system',
    emoji: '🗳️',
    title: 'The Electoral System',
    description: 'How elections work from local to federal level, including the Electoral College.',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    lessonCount: 10,
    progress: 25,
    icon: 'fas fa-vote-yea',
    color: 'green',
    lessons: [
      { id: 'es-1', title: 'Voter Registration', duration: 8, completed: true, type: 'video' },
      { id: 'es-2', title: 'Primaries & Caucuses', duration: 12, completed: true, type: 'text' },
      { id: 'es-3', title: 'Electoral College 101', duration: 15, completed: false, type: 'interactive' },
      { id: 'es-4', title: 'Campaign Finance', duration: 10, completed: false, type: 'video' },
      { id: 'es-5', title: 'Voting Methods', duration: 8, completed: false, type: 'text' },
      { id: 'es-6', title: 'Redistricting', duration: 12, completed: false, type: 'quiz' },
      { id: 'es-7', title: 'Election Security', duration: 10, completed: false, type: 'interactive' },
      { id: 'es-8', title: 'Case Study: 2000 Election', duration: 20, completed: false, type: 'video' },
      { id: 'es-9', title: 'Mail-in Voting', duration: 8, completed: false, type: 'text' },
      { id: 'es-10', title: 'Future of Elections', duration: 12, completed: false, type: 'quiz' }
    ]
  },
  {
    id: 'federalism',
    emoji: '🏛️',
    title: 'State vs Federal Powers',
    description: 'Understand federalism and how powers are divided between state and federal government.',
    difficulty: 'Intermediate',
    duration: '1 hour',
    lessonCount: 6,
    progress: 0,
    icon: 'fas fa-balance-scale',
    color: 'orange',
    lessons: [
      { id: 'f-1', title: 'Enumerated Powers', duration: 10, completed: false, type: 'video' },
      { id: 'f-2', title: 'Reserved Powers', duration: 8, completed: false, type: 'text' },
      { id: 'f-3', title: 'Concurrent Powers', duration: 7, completed: false, type: 'interactive' },
      { id: 'f-4', title: 'Supremacy Clause', duration: 12, completed: false, type: 'video' },
      { id: 'f-5', title: 'Case Study: Healthcare', duration: 15, completed: false, type: 'text' },
      { id: 'f-6', title: 'Modern Federalism', duration: 8, completed: false, type: 'quiz' }
    ]
  },
  {
    id: 'civic-toolkit',
    emoji: '📢',
    title: 'Civic Participation Toolkit',
    description: 'Practical guide to engaging with your representatives and making your voice heard.',
    difficulty: 'Beginner',
    duration: '30 min',
    lessonCount: 5,
    progress: 100,
    icon: 'fas fa-megaphone',
    color: 'red',
    lessons: [
      { id: 'ct-1', title: 'Finding Your Representatives', duration: 5, completed: true, type: 'video' },
      { id: 'ct-2', title: 'Writing Effective Letters', duration: 8, completed: true, type: 'text' },
      { id: 'ct-3', title: 'Phone Call Scripts', duration: 6, completed: true, type: 'interactive' },
      { id: 'ct-4', title: 'Town Hall Participation', duration: 7, completed: true, type: 'video' },
      { id: 'ct-5', title: 'Community Organizing', duration: 4, completed: true, type: 'quiz' }
    ]
  },
  {
    id: 'policy-analysis',
    emoji: '📊',
    title: 'Policy Analysis 101',
    description: 'Learn to analyze proposed legislation and understand its potential impacts.',
    difficulty: 'Advanced',
    duration: '3 hours',
    lessonCount: 15,
    progress: 25,
    icon: 'fas fa-chart-line',
    color: 'teal',
    lessons: [
      { id: 'pa-1', title: 'Policy Frameworks', duration: 12, completed: true, type: 'video' },
      { id: 'pa-2', title: 'Cost-Benefit Analysis', duration: 15, completed: true, type: 'text' },
      { id: 'pa-3', title: 'Stakeholder Mapping', duration: 10, completed: false, type: 'interactive' },
      { id: 'pa-4', title: 'Evidence-Based Policy', duration: 12, completed: false, type: 'video' },
      { id: 'pa-5', title: 'Reading Legislation', duration: 20, completed: false, type: 'text' },
      { id: 'pa-6', title: 'Fiscal Impact', duration: 15, completed: false, type: 'quiz' },
      { id: 'pa-7', title: 'Social Impact', duration: 12, completed: false, type: 'interactive' },
      { id: 'pa-8', title: 'Environmental Review', duration: 10, completed: false, type: 'video' },
      { id: 'pa-9', title: 'Case Study: Clean Air Act', duration: 25, completed: false, type: 'text' },
      { id: 'pa-10', title: 'Policy Implementation', duration: 15, completed: false, type: 'quiz' },
      { id: 'pa-11', title: 'Monitoring & Evaluation', duration: 12, completed: false, type: 'interactive' },
      { id: 'pa-12', title: 'International Comparisons', duration: 18, completed: false, type: 'video' },
      { id: 'pa-13', title: 'Ethical Considerations', duration: 15, completed: false, type: 'text' },
      { id: 'pa-14', title: 'Writing Policy Briefs', duration: 20, completed: false, type: 'interactive' },
      { id: 'pa-15', title: 'Final Project', duration: 25, completed: false, type: 'quiz' }
    ]
  }
];
