import { useState, useEffect } from "react";
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
  const [data, setData] = useState<any>(null);
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

  useEffect(() => {
    fetchStructure().then((data) => {
      setData(data);
    });
  }, [sequence]);

  useEffect(() => {
    const initViewer = () => {
      let element = $("#" + elementId);
      let config = { backgroundColor: "white" };
      let viewer = $3Dmol.createViewer(element, config);
      setViewerLoaded(true);
      viewer.addModel(data.message, "pdb");
      viewer.setStyle({}, { cartoon: { color: "grey" } });
      // viewer.addStyle({ stick: { color: "spectrum" } });
      if (mutatedResidues.length > 0) {
        viewer.addStyle(
          { resi: mutatedResidues },
          { cartoon: { color: "red" } }
        );
      }
      // viewer.addSurface($3Dmol.SurfaceType.MS, {
      //   opacity: 0.7,
      //   color: "white",
      // });
      viewer.zoomTo();
      viewer.render();
      viewer.zoom(0.8, 2000);
    };

    if (typeof window !== "undefined" && data !== null) {
      initViewer();
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
