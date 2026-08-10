import { announcements } from '../data/mockData';

export default function Announcements({ compact = false }) {
  const items = compact ? announcements.slice(0, 2) : announcements;

  return (
    <section className="announcements" aria-labelledby="announcements-heading">
      <h2 id="announcements-heading" className="section-title">
        Announcements
      </h2>

      <div className="announcements__grid">
        {items.map((item) => (
          <article
            key={item.id}
            className={`announcement-card ${item.urgent ? 'announcement-card--urgent' : ''}`}
          >
            <div className="announcement-card__header">
              <span className="announcement-card__category">{item.category}</span>
              {item.urgent && <span className="announcement-card__badge">Important</span>}
            </div>
            <h3 className="announcement-card__title">{item.title}</h3>
            <p className="announcement-card__body">{item.body}</p>
            <time className="announcement-card__date" dateTime={item.date}>
              {item.date}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
}
