import StatCard from './StatCard';
import { stats } from '../data/mockData';

export default function StatsSection() {
  return (
    <section className="stats-section" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="section-title">
        Quick Overview
      </h2>
      <div className="stats-grid">
        <StatCard label="Current GPA" value={stats.gpa.toFixed(1)} icon="⭐" accent="#6366f1" />
        <StatCard
          label="Total Credits Earned"
          value={stats.creditsEarned}
          icon="📜"
          accent="#0ea5e9"
        />
        <StatCard
          label="Enrolled Courses"
          value={stats.enrolledCourses}
          icon="📖"
          accent="#10b981"
        />
        <StatCard
          label="Upcoming Assignments"
          value={stats.upcomingAssignments}
          icon="📅"
          accent="#f59e0b"
        />
      </div>
    </section>
  );
}
