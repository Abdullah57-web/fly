import { useState } from 'react';
import Sidebar from './components/Sidebar';
import StatsSection from './components/StatsSection';
import TaskList from './components/TaskList';
import GradeAnalytics from './components/GradeAnalytics';
import Announcements from './components/Announcements';
import Courses from './components/Courses';
import './App.css';

const pageTitles = {
  dashboard: 'Dashboard',
  courses: 'Courses',
  tasks: 'Tasks',
  grades: 'Grades',
  announcements: 'Announcements',
};

const pageDescriptions = {
  dashboard: 'Welcome back! Here is your academic overview for this semester.',
  courses: 'View and track all your enrolled courses.',
  tasks: 'Manage assignments, deadlines, and priorities.',
  grades: 'Review your current grades and academic performance.',
  announcements: 'Stay updated with the latest campus notices.',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main">
        <header className="main__header">
          <div>
            <h1 className="main__title">{pageTitles[activeTab]}</h1>
            <p className="main__subtitle">{pageDescriptions[activeTab]}</p>
          </div>
          <p className="main__date">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </header>

        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            <StatsSection />
            <div className="dashboard-grid__two-col">
              <GradeAnalytics compact />
              <Announcements compact />
            </div>
            <TaskList compact />
          </div>
        )}

        {activeTab === 'courses' && <Courses />}
        {activeTab === 'tasks' && <TaskList />}
        {activeTab === 'grades' && <GradeAnalytics />}
        {activeTab === 'announcements' && <Announcements />}
      </main>
    </div>
  );
}
