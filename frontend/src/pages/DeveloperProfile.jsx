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
        setRelatedDevelopers(related.related_developers || []);
      } catch (err) {
        setError("Unable to load developer profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [name]);

  {/* LOADING STATE */}

  if (loading) {
    return (
      <main className="min-h-screen bg-dev-background">
        <div className="mx-auto w-[92%] max-w-6xl py-12 md:py-16">
          <ProfileSkeleton />
        </div>
      </main>
    );
  }

  {/* ERROR STATE */}

  if (error || !developer) {
    return (
      <main className="min-h-screen bg-dev-background">
        <div className="mx-auto flex min-h-[70vh] w-[92%] max-w-6xl items-center justify-center">
          <div className="w-full max-w-lg rounded-3xl border border-dev-border bg-white p-10 text-center shadow-sm">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-red-50 text-2xl text-red-600">
              !
            </div>

            <h1 className="mt-5 text-2xl font-black text-dev-navy">
              Developer not found
            </h1>

            <p className="mt-2 text-sm leading-6 text-dev-text-muted">
              {error || "We couldn't find this developer profile."}
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex rounded-xl bg-dev-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-dev-blue"
            >
              ← Back to developers
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const initials = developer.name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-dev-background">

      <div className="mx-auto w-[92%] max-w-6xl py-8 md:py-12">

        {/* BACK LINK */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-dev-text-muted transition hover:text-dev-green-dark"
        >
          <span>←</span>
          Back to developers
        </Link>


        {/* PROFILE HEADER */}

        <section className="relative mt-6 overflow-hidden rounded-3xl bg-dev-navy text-white shadow-xl">

          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-dev-green/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-dev-blue-light/30 blur-3xl" />
          </div>

          <div className="relative p-7 sm:p-9 md:p-12">

            <div className="flex flex-col gap-7 sm:flex-row sm:items-center">

              {/* Avatar */}
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl border border-dev-green/30 bg-dev-green text-3xl font-black text-dev-navy shadow-lg sm:h-28 sm:w-28 sm:text-4xl">
                {initials}
              </div>

              <div className="min-w-0">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-dev-green/20 bg-dev-green/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-dev-green" />

                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-dev-green-light">
                    Developer Profile
                  </span>
                </div>

                <h1 className="wrap-break-word text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                  {developer.name}
                </h1>

                <p className="mt-2 text-base font-medium text-slate-300 sm:text-lg">
                  {developer.role}
                </p>

                <p className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-dev-green">●</span>
                  {developer.location}
                </p>

              </div>
            </div>
          </div>
        </section>


        {/* SKILLS */}

        <section className="mt-6 rounded-3xl border border-dev-border bg-white p-7 shadow-sm sm:p-8">

          <SectionHeading
            eyebrow="Expertise"
            title="Skills"
          />

          {developer.skills?.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {developer.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full border border-dev-green/20 bg-dev-green/10 px-4 py-2 text-sm font-bold text-dev-green-dark transition hover:border-dev-green/40 hover:bg-dev-green/15"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          ) : (
            <EmptySection message="No skills listed." />
          )}

        </section>


        {/* PROJECTS */}

        <section className="mt-6 rounded-3xl border border-dev-border bg-white p-7 shadow-sm sm:p-8">

          <SectionHeading
            eyebrow="Experience"
            title="Projects"
          />

          {developer.projects?.length > 0 ? (
            <div className="mt-6 grid gap-4">

              {developer.projects.map((project) => (
                <article
                  key={project.id}
                  className="group rounded-2xl border border-dev-border bg-dev-background/60 p-5 transition duration-200 hover:border-dev-green/30 hover:bg-white hover:shadow-md"
                >

                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                    <div className="min-w-0">

                      <h3 className="text-lg font-bold text-dev-navy">
                        {project.name}
                      </h3>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-dev-text-muted">
                        {project.description}
                      </p>

                    </div>

                    <ProjectStatus status={project.status} />

                  </div>
                </article>
              ))}

            </div>
          ) : (
            <EmptySection message="No projects listed." />
          )}

        </section>


        {/* TECHNOLOGIES */}

        <section className="mt-6 rounded-3xl border border-dev-border bg-white p-7 shadow-sm sm:p-8">

          <SectionHeading
            eyebrow="Tech Stack"
            title="Technologies"
          />

          {developer.technologies?.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">

              {developer.technologies.map((technology) => (
                <div
                  key={technology.id}
                  className="group rounded-2xl border border-dev-border bg-dev-background/60 p-5 transition duration-200 hover:border-dev-green/30 hover:bg-white hover:shadow-md"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <p className="font-bold text-dev-navy">
                        {technology.name}
                      </p>

                      <p className="mt-1 text-xs font-medium text-dev-text-muted">
                        {technology.category}
                      </p>
                    </div>

                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-dev-navy text-xs font-black text-dev-green transition group-hover:bg-dev-green group-hover:text-dev-navy">
                      &lt;/&gt;
                    </div>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <EmptySection message="No technologies listed." />
          )}

        </section>


        {/* RELATED DEVELOPERS */}

        <section className="mt-6 rounded-3xl border border-dev-border bg-white p-7 shadow-sm sm:p-8">

          <SectionHeading
            eyebrow="Network"
            title="Related Developers"
          />

          <p className="mt-2 text-sm leading-6 text-dev-text-muted">
            Developers connected through shared projects,
            skills, or other relationships in the graph.
          </p>

          {relatedDevelopers.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-dev-border bg-dev-background/50 p-8 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-dev-navy text-dev-green">
                ◇
              </div>

              <p className="mt-4 text-sm font-semibold text-dev-navy">
                No related developers found
              </p>

              <p className="mt-1 text-xs text-dev-text-muted">
                This developer currently has no matching
                connections in the graph.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {relatedDevelopers.map((related) => {

                const relatedInitials = related.name
                  .split(" ")
                  .map((part) => part.charAt(0))
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <Link
                    key={related.name}
                    to={`/developers/${encodeURIComponent(
                      related.name
                    )}`}
                    className="group rounded-2xl border border-dev-border bg-dev-background/60 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-dev-green/30 hover:bg-white hover:shadow-md"
                  >

                    <div className="flex items-center gap-4">

                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-dev-navy text-xs font-black text-dev-green">
                        {relatedInitials}
                      </div>

                      <div className="min-w-0 flex-1">

                        <h3 className="truncate font-bold text-dev-navy">
                          {related.name}
                        </h3>

                        <p className="mt-1 truncate text-sm text-dev-text-muted">
                          {related.role}
                        </p>

                        <p className="mt-2 text-xs text-dev-text-muted">
                          <span className="mr-1 text-dev-green">
                            ●
                          </span>
                          {related.location}
                        </p>

                      </div>

                      <span className="text-lg text-dev-text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-dev-green">
                        →
                      </span>

                    </div>

                  </Link>
                );
              })}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-dev-green-dark">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-2xl font-black tracking-tight text-dev-navy">
        {title}
      </h2>
    </div>
  );
}

function ProjectStatus({ status }) {
  const completed =
    status?.toLowerCase() === "completed";

  return (
    <span
      className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
        completed
          ? "bg-dev-green/10 text-dev-green-dark"
          : "bg-dev-blue/10 text-dev-blue-light"
      }`}
    >
      {status}
    </span>
  );
}

function EmptySection({ message }) {
  return (
    <p className="mt-5 text-sm text-dev-text-muted">
      {message}
    </p>
  );
}

function ProfileSkeleton() {
  return (
    <div className="animate-pulse">

      <div className="h-5 w-36 rounded bg-slate-200" />

      <div className="mt-6 rounded-3xl bg-white p-10">
        <div className="flex items-center gap-6">
          <div className="h-28 w-28 rounded-3xl bg-slate-200" />

          <div>
            <div className="h-3 w-32 rounded bg-slate-200" />
            <div className="mt-3 h-9 w-64 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-40 rounded bg-slate-200" />
          </div>
        </div>
      </div>

      <div className="mt-6 h-40 rounded-3xl bg-white" />
      <div className="mt-6 h-56 rounded-3xl bg-white" />
      <div className="mt-6 h-40 rounded-3xl bg-white" />

    </div>
  );
}


export default DeveloperProfile;