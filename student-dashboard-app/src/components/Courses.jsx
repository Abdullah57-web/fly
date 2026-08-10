import { courses } from '../data/mockData';

export default function Courses() {
  return (
    <section className="courses" aria-labelledby="courses-heading">
      <h2 id="courses-heading" className="section-title">
        My Courses
      </h2>

      <div className="courses__grid">
        {courses.map((course) => (
          <article key={course.id} className="course-card">
            <div className="course-card__header">
              <span className="course-card__code">{course.code}</span>
              <span className="course-card__credits">{course.credits} credits</span>
            </div>
            <h3 className="course-card__name">{course.name}</h3>
            <p className="course-card__instructor">{course.instructor}</p>
            <p className="course-card__schedule">{course.schedule}</p>
            <div className="course-card__progress">
              <div className="course-card__progress-label">
                <span>Course progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="course-card__progress-bar">
                <div
                  className="course-card__progress-fill"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
