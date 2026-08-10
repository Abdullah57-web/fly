export const stats = {
  gpa: 3.8,
  creditsEarned: 45,
  enrolledCourses: 4,
  upcomingAssignments: 3,
};

export const courses = [
  {
    id: 1,
    name: 'Computer Science',
    code: 'CS 301',
    instructor: 'Dr. Sarah Chen',
    schedule: 'Mon, Wed, Fri · 10:00 AM',
    credits: 3,
    progress: 72,
  },
  {
    id: 2,
    name: 'Calculus II',
    code: 'MATH 202',
    instructor: 'Prof. James Rivera',
    schedule: 'Tue, Thu · 1:30 PM',
    credits: 4,
    progress: 65,
  },
  {
    id: 3,
    name: 'Technical Writing',
    code: 'ENG 210',
    instructor: 'Dr. Emily Watson',
    schedule: 'Mon, Wed · 3:00 PM',
    credits: 3,
    progress: 80,
  },
  {
    id: 4,
    name: 'Data Structures',
    code: 'CS 250',
    instructor: 'Dr. Michael Park',
    schedule: 'Tue, Thu · 11:00 AM',
    credits: 4,
    progress: 58,
  },
];

export const grades = [
  { id: 1, course: 'Computer Science', letter: 'A', percentage: 94, color: '#10b981' },
  { id: 2, course: 'Calculus II', letter: 'B+', percentage: 88, color: '#3b82f6' },
  { id: 3, course: 'Technical Writing', letter: 'A-', percentage: 91, color: '#8b5cf6' },
  { id: 4, course: 'Data Structures', letter: 'B', percentage: 85, color: '#f59e0b' },
];

export const announcements = [
  {
    id: 1,
    title: 'Library hours extended for finals week',
    body: 'The campus library will remain open until midnight from Dec 10–17 to support students during finals preparation.',
    date: 'Aug 8, 2026',
    category: 'Campus Life',
    urgent: false,
  },
  {
    id: 2,
    title: 'System maintenance on student portal this Sunday',
    body: 'The student portal will be unavailable from 2:00 AM to 6:00 AM on Sunday for scheduled maintenance. Plan accordingly.',
    date: 'Aug 7, 2026',
    category: 'IT Notice',
    urgent: true,
  },
  {
    id: 3,
    title: 'Fall registration opens next week',
    body: 'Priority registration for returning students begins Monday at 8:00 AM. Check your registration window in the portal.',
    date: 'Aug 5, 2026',
    category: 'Academic',
    urgent: false,
  },
];

export const initialTasks = [
  {
    id: 1,
    title: 'Submit CS 301 project proposal',
    dueDate: '2026-08-15',
    priority: 'High',
    completed: false,
  },
  {
    id: 2,
    title: 'Complete Calculus problem set 7',
    dueDate: '2026-08-18',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Read Technical Writing chapter 4',
    dueDate: '2026-08-20',
    priority: 'Low',
    completed: true,
  },
];
