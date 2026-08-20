import { Link } from "react-router-dom";

import GraphView from "../components/GraphView";

function GraphPage() {
  return (
    <main className="min-h-screen bg-dev-background">

      <div className="mx-auto w-[92%] max-w-7xl py-8 md:py-12">

        {/* BACK LINK */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-dev-text-muted transition hover:text-dev-green"
        >
          <span>←</span>
          Back to developers
        </Link>


        {/* PAGE HEADER */}

        <section className="mt-8 md:mt-10">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-dev-green/20 bg-dev-green/10 px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-dev-green" />

                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-dev-green">
                  Graph Explorer
                </span>

              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-dev-navy sm:text-4xl md:text-5xl">
                Explore the developer network
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-dev-text-muted sm:text-base">
                Discover how developers connect through shared
                skills, projects, and technologies using the
                DevConnect knowledge graph.
              </p>

            </div>


            {/* Graph indicator */}

            <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-dev-border bg-white px-4 py-3 shadow-sm sm:flex">

              <span className="relative flex h-3 w-3">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dev-green opacity-40" />

                <span className="relative inline-flex h-3 w-3 rounded-full bg-dev-green" />

              </span>

              <div>

                <p className="text-xs font-bold text-dev-navy">
                  Graph connected
                </p>

                <p className="text-[11px] text-dev-text-muted">
                  Live data from CognoDB
                </p>

              </div>

            </div>

          </div>

        </section>

        <section className="mt-8 md:mt-10">
          <GraphView />
        </section>


        {/* INFORMATION */}

        <section className="mt-8 grid gap-4 md:grid-cols-3">

          <InfoCard
            number="01"
            title="Developers"
            description="Explore developers and discover the skills and technologies they work with."
          />

          <InfoCard
            number="02"
            title="Relationships"
            description="See how developers connect through shared projects, skills, and technologies."
          />

          <InfoCard
            number="03"
            title="Knowledge Graph"
            description="Navigate the connected data model powered by CognoDB."
          />

        </section>

      </div>
    </main>
  );
}


{/* INFO CARD */}

function InfoCard({ number, title, description }) {
  return (
    <div className="group rounded-2xl border border-dev-border bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-center justify-between">

        <span className="text-xs font-black tracking-wider text-dev-green">
          {number}
        </span>

        <span className="h-px w-10 bg-dev-green/30 transition-all duration-200 group-hover:w-16" />

      </div>

      <h2 className="mt-5 text-lg font-black text-dev-navy">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-dev-text-muted">
        {description}
      </p>

    </div>
  );
}


export default GraphPage;