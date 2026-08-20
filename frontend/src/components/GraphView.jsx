import { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

import { getGraphData } from "../services/api";

function GraphView() {
  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });

  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGraph = async () => {
      try {
        const data = await getGraphData();

        setGraphData(data);
      } catch (err) {
        setError("Unable to load graph data.");
      } finally {
        setLoading(false);
      }
    };

    loadGraph();
  }, []);

  const getNodeColor = (type) => {
    switch (type) {
      case "Developer":
        return "#22c55e";

      case "Skill":
        return "#38bdf8";

      case "Project":
        return "#a78bfa";

      case "Technology":
        return "#f59e0b";

      default:
        return "#94a3b8";
    }
  };

  const getNodeSize = (type) => {
    switch (type) {
      case "Developer":
        return 9;

      case "Project":
        return 7;

      default:
        return 6;
    }
  };

  /* LOADING STATE */

  if (loading) {
    return (
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-dev-navy p-10 shadow-xl">
        <div className="flex min-h-125 flex-col items-center justify-center text-center">

          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-dev-green" />

          <h2 className="mt-6 text-lg font-black text-white">
            Building developer graph
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Loading relationships from CognoDB...
          </p>

        </div>
      </div>
    );
  }


  /* ERROR STATE */

  if (error) {
    return (
      <div className="overflow-hidden rounded-3xl border border-red-400/20 bg-dev-navy p-10 shadow-xl">
        <div className="flex min-h-125 flex-col items-center justify-center text-center">

          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-red-500/10 text-2xl font-black text-red-400">
            !
          </div>

          <h2 className="mt-5 text-xl font-black text-white">
            Graph unavailable
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            {error}
          </p>

        </div>
      </div>
    );
  }


  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-dev-navy shadow-xl">

      <div className="border-b border-white/10 p-6 sm:p-8">

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-dev-green/20 bg-dev-green/10 px-3 py-1.5">

              <span className="h-1.5 w-1.5 rounded-full bg-dev-green" />

              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-dev-green-light">
                Knowledge Graph
              </span>

            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Developer Connections
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Explore relationships between developers,
              skills, projects, and technologies in the
              DevConnect network.
            </p>

          </div>


          {/* STATISTICS */}

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

            <GraphStat
              label="Nodes"
              value={graphData.nodes.length}
            />

            <GraphStat
              label="Relationships"
              value={graphData.links.length}
            />

            <GraphStat
              label="Developers"
              value={
                graphData.nodes.filter(
                  (node) => node.type === "Developer"
                ).length
              }
            />

          </div>

        </div>

      </div>


      {/* GRAPH */}

      <div className="relative h-150 overflow-hidden bg-[#041321] sm:h-170">

        <ForceGraph2D
          graphData={graphData}

          backgroundColor="#041321"

          nodeLabel={(node) =>
            `${node.name} (${node.type})`
          }

          nodeColor={(node) =>
            getNodeColor(node.type)
          }

          nodeVal={(node) =>
            getNodeSize(node.type)
          }

          linkLabel={(link) =>
            link.relationship || ""
          }

          linkColor={() =>
            "rgba(148, 163, 184, 0.35)"
          }

          linkWidth={1.5}

          linkDirectionalArrowLength={5}

          linkDirectionalArrowRelPos={1}

          cooldownTicks={100}

          onNodeClick={(node) => {
            setSelectedNode(node);
          }}
        />


        {/* GRAPH LABEL */}

        <div className="pointer-events-none absolute left-5 top-5">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-dev-green">
            Live Graph
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Click a node to inspect it
          </p>

        </div>


        {/* LEGEND */}

        <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-dev-blue/95 p-4 shadow-xl backdrop-blur">

          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Node Types
          </p>

          <div className="grid grid-cols-2 gap-x-5 gap-y-2">

            <LegendItem
              color="#22c55e"
              label="Developer"
            />

            <LegendItem
              color="#38bdf8"
              label="Skill"
            />

            <LegendItem
              color="#a78bfa"
              label="Project"
            />

            <LegendItem
              color="#f59e0b"
              label="Technology"
            />

          </div>

        </div>


        {/* SELECTED NODE */}

        {selectedNode && (
          <div className="absolute right-5 top-5 w-[calc(100%-2.5rem)] max-w-xs rounded-2xl border border-white/10 bg-dev-blue/95 p-5 shadow-2xl backdrop-blur">

            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0">

                <div className="flex items-center gap-2">

                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        getNodeColor(selectedNode.type),
                    }}
                  />

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {selectedNode.type}
                  </p>

                </div>

                <h3 className="mt-2 wrap-break-word text-lg font-black text-white">
                  {selectedNode.name}
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                aria-label="Close selected node"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>

            </div>


            <div className="mt-5">

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Node ID
              </p>

              <p className="mt-2 break-all rounded-xl bg-black/20 p-3 font-mono text-xs leading-5 text-slate-400">
                {selectedNode.id}
              </p>

            </div>

          </div>
        )}

      </div>


      {/* FOOTER */}

      <div className="border-t border-white/10 bg-dev-blue px-6 py-4 sm:px-8">

        <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            Powered by{" "}
            <span className="font-semibold text-slate-300">
              CognoDB
            </span>
          </p>

          <p>
            Click and drag nodes to explore the network
          </p>

        </div>

      </div>

    </div>
  );
}


/* GRAPH STAT */

function GraphStat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center">

      <p className="text-lg font-black text-white">
        {value}
      </p>

      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

    </div>
  );
}


/* LEGEND ITEM */

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">

      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />

      <span className="text-xs font-medium text-slate-300">
        {label}
      </span>

    </div>
  );
}

export default GraphView;