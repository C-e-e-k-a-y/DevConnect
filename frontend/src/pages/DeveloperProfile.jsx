import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getDeveloperProfile,
  getRelatedDevelopers,
} from "../services/api";

function DeveloperProfile() {
  const { name } = useParams();

  const [developer, setDeveloper] = useState(null);
  const [relatedDevelopers, setRelatedDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const decodedName = decodeURIComponent(name);

        const [profile, related] = await Promise.all([
          getDeveloperProfile(decodedName),
          getRelatedDevelopers(decodedName),
        ]);

        setDeveloper(profile);
        setRelatedDevelopers(related.related_developers);
      } catch (err) {
        setError("Unable to load developer profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [name]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto w-[90%] max-w-7xl py-20">
          <p className="text-slate-500">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  if (error || !developer) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto w-[90%] max-w-7xl py-20">
          <p className="text-red-600">
            {error || "Developer not found."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-block font-semibold text-slate-900 hover:underline"
          >
            ← Back to developers
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-[90%] max-w-5xl px-0 py-10 md:py-16">

        {/* Back */}
        <Link
          to="/"
          className="text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          ← Back to developers
        </Link>

        {/* Profile Header */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-slate-900 text-4xl font-extrabold text-white">
              {developer.name.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Developer Profile
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
                {developer.name}
              </h1>

              <p className="mt-2 text-lg text-slate-500">
                {developer.role}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                📍 {developer.location}
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Skills
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {developer.skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Projects
          </p>

          <div className="mt-5 grid gap-4">
            {developer.projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {project.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {project.description}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Technologies
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {developer.technologies.map((technology) => (
              <div
                key={technology.id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <p className="font-semibold text-slate-900">
                  {technology.name}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {technology.category}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Developers */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Related Developers
          </p>

          {relatedDevelopers.length === 0 ? (
            <p className="mt-5 text-sm text-slate-500">
              No related developers found.
            </p>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {relatedDevelopers.map((related) => (
                <Link
                  key={related.name}
                  to={`/developers/${encodeURIComponent(
                    related.name
                  )}`}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-slate-400 hover:shadow-sm"
                >
                  <h3 className="font-bold text-slate-900">
                    {related.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {related.role}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    📍 {related.location}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

export default DeveloperProfile;