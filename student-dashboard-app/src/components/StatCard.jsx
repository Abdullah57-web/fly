export default function StatCard({ label, value, icon, accent }) {
  return (
    <article className="stat-card" style={{ '--accent': accent }}>
      <div className="stat-card__icon" aria-hidden="true">
        {icon}
      </div>
      <div>
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">{value}</p>
      </div>
    </article>
  );
}
