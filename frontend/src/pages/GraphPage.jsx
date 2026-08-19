import { Link } from "react-router-dom";

import GraphView from "../components/GraphView";

function GraphPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-[90%] max-w-7xl py-10 md:py-16">

        <Link
          to="/"
          className="text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          ← Back to developers
        </Link>

        <section className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Graph Explorer
          </p>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950">
            Explore the developer network
          </h1>

          <p className="mt-4 max-w-2xl text-slate-500">
            Discover how developers connect through shared
            skills, projects and technologies.
          </p>
        </section>

        <section className="mt-8">
          <GraphView />
        </section>

      </div>
    </main>
  );
}

export default GraphPage;