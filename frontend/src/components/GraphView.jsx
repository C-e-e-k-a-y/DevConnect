import { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

import { getGraphData } from "../services/api";

function GraphView() {
  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });

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
      <div className="border-b border-slate-200 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Knowledge Graph
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
          Developer Connections
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Explore relationships between developers,
          skills, projects and technologies.
        </p>
      </div>

      <div className="h-[650px]">
        <ForceGraph2D
          graphData={graphData}
          nodeLabel={(node) =>
            `${node.name} (${node.type})`
          }
          linkLabel={(link) => link.relationship}
          nodeAutoColorBy="type"
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          cooldownTicks={100}
          onNodeClick={(node) => {
            console.log("Selected node:", node);
          }}
        />
      </div>
    </div>
  );
}

export default GraphView;