const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'courses', label: 'Courses', icon: '📚' },
  { id: 'tasks', label: 'Tasks', icon: '✅' },
  { id: 'grades', label: 'Grades', icon: '🎓' },
  { id: 'announcements', label: 'Announcements', icon: '📢' },
];

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">SD</div>
        <div>
          <h1 className="sidebar__title">Student Portal</h1>
          <p className="sidebar__subtitle">Academic Dashboard</p>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar__link ${activeTab === item.id ? 'sidebar__link--active' : ''}`}
            onClick={() => onTabChange(item.id)}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <span className="sidebar__icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar__profile">
        <div className="sidebar__avatar">A</div>
        <div>
          <p className="sidebar__name">Abdullah</p>
          <p className="sidebar__role">Computer Science · Junior</p>
        </div>
      </div>
    </aside>
  );
}
