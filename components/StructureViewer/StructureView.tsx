import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import $ from "jquery";
// @ts-ignore
import * as $3Dmol from "3dmol/build/3Dmol.js";

function StructureViewer({
  sequence,
  elementId,
  mutatedResidues = [],
}: {
  sequence: string;
  elementId: string;
  mutatedResidues?: string[];
}) {
  const [viewerLoaded, setViewerLoaded] = useState(false);

  const fetchStructure = async () => {
    const response = await fetch("api/structure", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        sequence: sequence,
      }),
    });

    const data = await response.json();

    return data;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["structure"],
    queryFn: fetchStructure,
  });

  useEffect(() => {
    const initViewer = () => {
      let element = $("#" + elementId);
      let config = { backgroundColor: "white" };
      let viewer = $3Dmol.createViewer(element, config);
      setViewerLoaded(true);
      viewer.addModel(data.message, "pdb");
      viewer.setStyle({}, { cartoon: { color: "grey" } });

      if (mutatedResidues.length > 0) {
        viewer.addStyle(
          { resi: mutatedResidues },
          { cartoon: { color: "red" } }
        );
      }
      viewer.zoomTo();
      viewer.render();
      viewer.zoom(0.8, 2000);
    };

    if (typeof window !== "undefined" && !isLoading && !isError) {
      initViewer();
    } else {
      console.log("Fetching error:", error);
    }
  }, [data]);

  return (
    <div>
      <div className="w-full h-full">
        <div
          style={{ height: 600, width: 600, position: "relative" }}
          id={elementId}
          className={viewerLoaded ? "" : "bg-white animate-pulse"}
        ></div>
      </div>
    </div>
  );
}

export default StructureViewer;
