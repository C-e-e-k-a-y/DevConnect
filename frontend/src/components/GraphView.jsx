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
        return "#2563eb";

      case "Skill":
        return "#16a34a";

      case "Project":
        return "#9333ea";

      case "Technology":
        return "#ea580c";

      default:
        return "#64748b";
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10">
        <p className="text-slate-500">
          Loading graph...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-white p-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

      {/* Header */}
      <div className="border-b border-slate-200 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Knowledge Graph
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
          Developer Connections
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Explore relationships between developers,
          skills, projects and technologies.
        </p>

        {/* Statistics */}
        <div className="mt-5 flex flex-wrap gap-3">
          <div className="rounded-xl bg-slate-50 px-4 py-2">
            <span className="text-xs text-slate-400">
              Nodes
            </span>

            <p className="font-bold text-slate-900">
              {graphData.nodes.length}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 px-4 py-2">
            <span className="text-xs text-slate-400">
              Relationships
            </span>

            <p className="font-bold text-slate-900">
              {graphData.links.length}
            </p>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="relative h-162 bg-slate-50">

        <ForceGraph2D
          graphData={graphData}

          nodeLabel={(node) =>
            `${node.name} (${node.type})`
          }

          nodeColor={(node) =>
            getNodeColor(node.type)
          }

          nodeVal={(node) =>
            node.type === "Developer" ? 8 : 5
          }

          linkLabel={(link) =>
            link.relationship
          }

          linkDirectionalArrowLength={5}

          linkDirectionalArrowRelPos={1}

          cooldownTicks={100}

          onNodeClick={(node) => {
            setSelectedNode(node);
          }}
        />

        {/* Legend */}
        <div className="absolute bottom-5 left-5 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Node Types
          </p>

          <div className="space-y-2 text-sm">
            <LegendItem
              color="#2563eb"
              label="Developer"
            />

            <LegendItem
              color="#16a34a"
              label="Skill"
            />

            <LegendItem
              color="#9333ea"
              label="Project"
            />

            <LegendItem
              color="#ea580c"
              label="Technology"
            />
          </div>
        </div>

        {/* Selected Node */}
        {selectedNode && (
          <div className="absolute right-5 top-5 w-64 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {selectedNode.type}
                </p>

                <h3 className="mt-1 font-bold text-slate-900">
                  {selectedNode.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              ID
            </p>

            <p className="mt-1 break-all text-sm text-slate-600">
              {selectedNode.id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />

      <span className="text-slate-600">
        {label}
      </span>
    </div>
  );
}

export default GraphView;