import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { searchDevelopers } from "../services/api";
import DeveloperCard from "../components/DeveloperCard";

function SearchResults() {
  const [searchParams] = useSearchParams();

  const skill = searchParams.get("skill") || "";

  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const search = async () => {
      if (!skill.trim()) {
        setDevelopers([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchDevelopers(skill);

        setDevelopers(data.developers || []);
      } catch (err) {
        setError("Unable to search developers.");
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [skill]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-[90%] max-w-7xl py-12 md:py-16">

        <Link
          to="/"
          className="text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          ← Back to developers
        </Link>

        <section className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Search Results
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
            Developers with{" "}
            <span className="text-slate-500">
              {skill}
            </span>
          </h1>

          {!loading && !error && (
            <p className="mt-3 text-slate-500">
              {developers.length} developer
              {developers.length !== 1 ? "s" : ""} found
            </p>
          )}
        </section>

        {loading && (
          <div className="py-16 text-center text-slate-500">
            Searching developers...
          </div>
        )}

        {error && (
          <div className="py-16 text-center text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && developers.length === 0 && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              No developers found
            </h2>

            <p className="mt-2 text-slate-500">
              No developers currently have the{" "}
              <strong>{skill}</strong> skill.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
            >
              Browse developers
            </Link>
          </div>
        )}

        {!loading && !error && developers.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {developers.map((developer) => (
              <DeveloperCard
                key={developer.id}
                developer={developer}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default SearchResults;