import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        setDevelopers(data.developers || []);
      } catch (err) {
        setError("Unable to load developers.");
      } finally {
        setLoading(false);
      }
    };

    loadDevelopers();
  }, []);

  return (
    <main className="min-h-screen bg-dev-background">

      {/* =========================
          HERO
      ========================= */}

      <section className="relative overflow-hidden bg-dev-navy text-white">

        {/* Decorative background */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-dev-green/10 blur-3xl" />

          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-dev-blue-light/20 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

        </div>


        {/* Hero content */}

        <div className="relative mx-auto w-[92%] max-w-7xl py-20 md:py-28">

          <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">

            {/* Left */}

            <div className="max-w-3xl">

              {/* Eyebrow */}

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-dev-green/30 bg-dev-green/10 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-dev-green shadow-[0_0_12px_rgba(34,197,94,0.8)]" />

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-dev-green-light">
                  Developer Network
                </span>

              </div>


              {/* Heading */}

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">

                Discover developers.

                <br />

                <span className="text-dev-green">
                  Explore connections.
                </span>

              </h1>


              {/* Description */}

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Discover developers and explore how their skills,
                projects, and technologies connect through a
                developer knowledge graph.
              </p>


              {/* Search */}

              <SearchBar />


              {/* Graph button */}

              <div className="mt-5 flex flex-wrap items-center gap-4">

                <Link
                  to="/graph"
                  className="inline-flex items-center gap-2 rounded-xl bg-dev-green px-5 py-3 text-sm font-bold text-dev-navy shadow-lg shadow-dev-green/10 transition hover:bg-dev-green-light hover:shadow-xl active:scale-[0.98]"
                >
                  Explore the knowledge graph

                  <span>→</span>
                </Link>

                <span className="text-xs text-slate-400">
                  Powered by CognoDB
                </span>

              </div>


              {/* Quick information */}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">

                <span className="flex items-center gap-2">
                  <span className="text-dev-green">✓</span>
                  Explore developer profiles
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-dev-green">✓</span>
                  Discover shared skills
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-dev-green">✓</span>
                  Explore relationships
                </span>

              </div>

            </div>


            {/* Right — Graph preview */}

            <div className="hidden lg:block">

              <GraphPreview />

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          NETWORK OVERVIEW
      ========================= */}

      <section className="border-b border-dev-border bg-white">

        <div className="mx-auto grid w-[92%] max-w-7xl grid-cols-2 md:grid-cols-4">

          <Stat
            value={loading ? "—" : developers.length}
            label="Developers"
          />

          <Stat
            value="Skills"
            label="Developer capabilities"
          />

          <Stat
            value="Projects"
            label="Shared experiences"
          />

          <Stat
            value="Graph"
            label="Connected knowledge"
          />

        </div>

      </section>


      {/* =========================
          DEVELOPERS
      ========================= */}

      <section className="mx-auto w-[92%] max-w-7xl py-16 md:py-20">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-dev-green-dark">
              Community
            </p>

            <h2 className="text-3xl font-black tracking-tight text-dev-navy md:text-4xl">
              Meet the developers
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-dev-text-muted">
              Browse developers and discover their skills,
              projects, and connections.
            </p>

          </div>


          {!loading && !error && (
            <div className="w-fit rounded-full border border-dev-border bg-white px-4 py-2 text-sm font-semibold text-dev-text-muted shadow-sm">
              {developers.length}{" "}
              {developers.length === 1
                ? "developer"
                : "developers"}
            </div>
          )}

        </div>


        {/* Loading */}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {Array.from({ length: 6 }).map((_, index) => (
              <DeveloperSkeleton key={index} />
            ))}

          </div>
        )}


        {/* Error */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-100 text-red-600">
              !
            </div>

            <h3 className="mt-4 font-bold text-red-900">
              Something went wrong
            </h3>

            <p className="mt-2 text-sm text-red-700">
              {error}
            </p>

          </div>
        )}


        {/* Empty */}

        {!loading && !error && developers.length === 0 && (
          <div className="rounded-2xl border border-dev-border bg-white p-12 text-center shadow-sm">

            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-dev-green/10 text-2xl">
              👨‍💻
            </div>

            <h3 className="mt-5 text-xl font-bold text-dev-navy">
              No developers yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-dev-text-muted">
              There are currently no developers available
              in the network.
            </p>

          </div>
        )}


        {/* Developers */}

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


      {/* =========================
          GRAPH CTA
      ========================= */}

      <section className="mx-auto w-[92%] max-w-7xl pb-16 md:pb-20">

        <div className="relative overflow-hidden rounded-3xl bg-dev-navy p-8 text-white sm:p-10 md:p-12">

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-dev-green/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-dev-green">
                Knowledge Graph
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                See how the network connects.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Explore relationships between developers,
                skills, projects, and technologies in an
                interactive graph.
              </p>

            </div>


            <Link
              to="/graph"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-dev-green px-6 py-3.5 text-sm font-bold text-dev-navy transition hover:bg-dev-green-light active:scale-[0.98]"
            >
              Open Graph Explorer
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================
   STAT
========================= */

function Stat({ value, label }) {
  return (
    <div className="border-r border-dev-border px-4 py-7 text-center last:border-r-0 sm:px-6">

      <p className="text-xl font-black text-dev-navy sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium leading-5 text-dev-text-muted">
        {label}
      </p>

    </div>
  );
}


/* =========================
   GRAPH PREVIEW
========================= */

function GraphPreview() {
  const nodes = [
    { x: 55, y: 105, label: "Developer", main: true },
    { x: 190, y: 55, label: "React" },
    { x: 210, y: 155, label: "Python" },
    { x: 330, y: 95, label: "Project" },
    { x: 335, y: 190, label: "PostgreSQL" },
  ];

  const lines = [
    [55, 105, 190, 55],
    [55, 105, 210, 155],
    [190, 55, 330, 95],
    [210, 155, 335, 190],
    [330, 95, 335, 190],
  ];

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/4 shadow-2xl">

      <div className="absolute left-6 top-6">

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-dev-green">
          Knowledge Graph
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Connected developer data
        </p>

      </div>


      <svg
        viewBox="0 0 400 260"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >

        {/* Connections */}

        {lines.map((line, index) => (
          <line
            key={index}
            x1={line[0]}
            y1={line[1]}
            x2={line[2]}
            y2={line[3]}
            stroke="rgba(74, 222, 128, 0.25)"
            strokeWidth="1.5"
          />
        ))}


        {/* Nodes */}

        {nodes.map((node, index) => (
          <g key={index}>

            <circle
              cx={node.x}
              cy={node.y}
              r={node.main ? 16 : 11}
              fill={
                node.main
                  ? "#22c55e"
                  : "rgba(255,255,255,0.12)"
              }
              stroke={
                node.main
                  ? "#86efac"
                  : "rgba(255,255,255,0.25)"
              }
              strokeWidth="2"
            />

            <text
              x={node.x}
              y={node.y + 30}
              textAnchor="middle"
              fill="rgba(255,255,255,0.65)"
              fontSize="9"
              fontWeight="600"
            >
              {node.label}
            </text>

          </g>
        ))}

      </svg>


      <div className="absolute bottom-5 left-6 rounded-xl border border-white/10 bg-black/20 px-3 py-2 backdrop-blur">

        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Powered by
        </p>

        <p className="mt-0.5 text-xs font-bold text-white">
          CognoDB
        </p>

      </div>

    </div>
  );
}


/* =========================
   LOADING SKELETON
========================= */

function DeveloperSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-dev-border bg-white p-6">

      <div className="flex gap-4">

        <div className="h-14 w-14 shrink-0 rounded-full bg-slate-200" />

        <div className="flex-1">

          <div className="h-4 w-32 rounded bg-slate-200" />

          <div className="mt-3 h-3 w-24 rounded bg-slate-200" />

          <div className="mt-3 h-3 w-20 rounded bg-slate-200" />

        </div>

      </div>

      <div className="mt-6 h-3 w-28 rounded bg-slate-200" />

    </div>
  );
}


export default Home;