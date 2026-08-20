import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { searchDevelopers } from "../services/api";
import DeveloperCard from "../components/DeveloperCard";
import SearchBar from "../components/SearchBar";

function SearchResults() {
  const [searchParams] = useSearchParams();

  const skill = searchParams.get("skill") || "";

  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (!skill.trim()) {
        setDevelopers([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await searchDevelopers(skill);

        setDevelopers(data.developers || []);
      } catch (err) {
        console.error("Search error:", err);

        setError("Unable to complete the search.");
        setDevelopers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [skill]);

  return (
    <main className="min-h-screen bg-dev-background">

      {/* HEADER */}

      <section className="bg-dev-navy text-white">

        <div className="mx-auto w-[92%] max-w-7xl py-10 md:py-14">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-dev-green-light"
          >
            <span>←</span>
            Back to developers
          </Link>

          <div className="mt-7">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-dev-green">
              Developer Search
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Find developers by skill
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Search the DevConnect network and discover
              developers with the skills you're looking for.
            </p>

          </div>

          <SearchBar />

        </div>

      </section>


      {/* RESULTS */}

      <section className="mx-auto w-[92%] max-w-7xl py-10 md:py-14">

        {/* Search information */}

        {!loading && !error && skill && (
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm text-dev-text-muted">
                Search results for
              </p>

              <h2 className="mt-1 text-2xl font-black text-dev-navy">
                "{skill}"
              </h2>

            </div>

            <div className="w-fit rounded-full border border-dev-border bg-white px-4 py-2 text-sm font-semibold text-dev-text-muted shadow-sm">
              {developers.length}{" "}
              {developers.length === 1
                ? "developer found"
                : "developers found"}
            </div>

          </div>
        )}


        {/* LOADING */}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {Array.from({ length: 6 }).map((_, index) => (
              <SearchSkeleton key={index} />
            ))}

          </div>
        )}


        {/* IF ERROR */}

        {!loading && error && (
          <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-xl font-black text-red-600">
              !
            </div>

            <h2 className="mt-5 text-xl font-black text-dev-navy">
              Search unavailable
            </h2>

            <p className="mt-2 text-sm leading-6 text-dev-text-muted">
              {error}
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl bg-dev-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-dev-blue"
            >
              Return home
            </Link>

          </div>
        )}


        {/* IF NO RESULTS */}

        {!loading &&
          !error &&
          skill &&
          developers.length === 0 && (
            <div className="mx-auto max-w-2xl rounded-3xl border border-dev-border bg-white p-10 text-center shadow-sm sm:p-14">

              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-dev-green/10 text-2xl">
                🔎
              </div>

              <h2 className="mt-6 text-2xl font-black text-dev-navy">
                No developers found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-dev-text-muted">
                We couldn't find any developers with the
                skill{" "}
                <strong className="font-bold text-dev-navy">
                  "{skill}"
                </strong>
                .
              </p>

              <Link
                to="/"
                className="mt-7 inline-flex rounded-xl bg-dev-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-dev-blue"
              >
                Browse all developers
              </Link>

            </div>
          )}


        {/* RESULTS */}

        {!loading &&
          !error &&
          developers.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {developers.map((developer) => (
                <DeveloperCard
                  key={developer.id}
                  developer={developer}
                />
              ))}

            </div>
          )}

      </section>

    </main>
  );
}

function SearchSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-dev-border bg-white p-6">

      <div className="flex gap-4">

        <div className="h-14 w-14 rounded-2xl bg-slate-200" />

        <div className="flex-1">

          <div className="h-4 w-32 rounded bg-slate-200" />

          <div className="mt-3 h-3 w-24 rounded bg-slate-200" />

          <div className="mt-3 h-3 w-20 rounded bg-slate-200" />

        </div>

      </div>

      <div className="my-5 h-px bg-slate-100" />

      <div className="h-3 w-24 rounded bg-slate-200" />

    </div>
  );
}

export default SearchResults;