import { Link } from "react-router-dom";

function DeveloperCard({ developer }) {
  const initials = developer.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-dev-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-dev-green/40 hover:shadow-xl">

      {/* Accent line */}
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-dev-green transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex items-start gap-4">

        {/* Avatar */}
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-dev-navy text-sm font-black text-dev-green shadow-sm">
          {initials}
        </div>

        {/* Developer info */}
        <div className="min-w-0 flex-1">

          <h3 className="truncate text-lg font-bold text-dev-navy">
            {developer.name}
          </h3>

          <p className="mt-1 truncate text-sm font-medium text-dev-blue-light">
            {developer.role}
          </p>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-dev-text-muted">
            <span className="text-dev-green">●</span>
            {developer.location}
          </p>

        </div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-dev-border" />

      {/* Profile link */}
      <Link
        to={`/developers/${encodeURIComponent(developer.name)}`}
        className="flex items-center justify-between text-sm font-bold text-dev-navy transition-colors group-hover:text-dev-green-dark"
      >
        <span>View profile</span>

        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </article>
  );
}

export default DeveloperCard;