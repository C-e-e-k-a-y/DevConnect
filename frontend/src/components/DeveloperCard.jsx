import { Link } from "react-router-dom";

function DeveloperCard({ developer }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex gap-4">
        <div className="grid h-13 w-13 shrink-0 place-items-center rounded-full bg-slate-100 text-lg font-bold text-slate-700">
          {developer.name.charAt(0)}
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-slate-900">
            {developer.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {developer.role}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            📍 {developer.location}
          </p>

          <Link
            to={`/developers/${encodeURIComponent(developer.name)}`}
            className="mt-4 inline-block text-sm font-bold text-slate-900 hover:underline"
          >
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeveloperCard;