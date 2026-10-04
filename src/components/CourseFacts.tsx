import { courseFacts } from "@/lib/content";

export function CourseFacts() {
  return (
    <div className="course-facts">
      {courseFacts.map((fact) => (
        <span key={fact.strong}>
          <strong>{fact.strong}</strong>
          <span>{fact.span}</span>
        </span>
      ))}
    </div>
  );
}
