import { grades } from '../data/mockData';

export default function GradeAnalytics({ compact = false }) {
  const displayGrades = compact ? grades.slice(0, 3) : grades;

  return (
    <section className="grade-analytics" aria-labelledby="grades-heading">
      <h2 id="grades-heading" className="section-title">
        Grade Analytics
      </h2>

      <div className="grade-table">
        <div className="grade-table__header">
          <span>Course</span>
          <span>Letter Grade</span>
          <span>Percentage</span>
          <span>Progress</span>
        </div>

        {displayGrades.map((grade) => (
          <div key={grade.id} className="grade-row">
            <span className="grade-row__course">{grade.course}</span>
            <span className="grade-row__letter">{grade.letter}</span>
            <span className="grade-row__percent">{grade.percentage}%</span>
            <div className="grade-row__bar-wrap">
              <div
                className="grade-row__bar"
                style={{
                  width: `${grade.percentage}%`,
                  backgroundColor: grade.color,
                }}
                role="progressbar"
                aria-valuenow={grade.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${grade.course}: ${grade.percentage}%`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
