import { useEffect, useState } from "react";

import { getDevelopers } from "../services/api";
import DeveloperCard from "../components/DeveloperCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDevelopers = async () => {
      try {
        const data = await getDevelopers();
        setDevelopers(data.developers);
      } catch (err) {
        setError("Unable to load developers.");
      } finally {
        setLoading(false);
      }
    };

    loadDevelopers();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-[90%] max-w-7xl">
        
        <section className="py-20 md:py-28 flex flex-col items-center text-center">
          <p className="mb-3 text-xs md:text-lg font-bold uppercase tracking-[0.2em] text-slate-500">
            Developer Network
          </p>

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-950 md:text-7xl">
            Discover developers,
            <br />
            skills and connections.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-500">
            Explore developers and discover connections
            through skills, projects and technologies.
          </p>

          <SearchBar />
        </section>

        {/* Developers */}
        <section className="pb-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Community
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Developers
              </h2>
            </div>

            <span className="text-sm text-slate-500">
              {developers.length} developers
            </span>
          </div>

          {loading && (
            <p className="py-10 text-slate-500">
              Loading developers...
            </p>
          )}

          {error && (
            <p className="py-10 text-red-600">
              {error}
            </p>
          )}

          {!loading && !error && (
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
      </div>
    </main>
  );
}

export default Home;