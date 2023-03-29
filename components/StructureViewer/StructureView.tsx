import { useEffect } from "react";
import useSWR from "swr";
import $ from "jquery";
// @ts-ignore
import * as $3Dmol from "3dmol/build/3Dmol.js";

import { MutationArrayEntry } from "../../lib/sequenceState";

function StructureViewer({
  sequence,
  elementId,
  mutatedResidues = [],
}: {
  sequence: string;
  elementId: string;
  mutatedResidues?: string[];
}) {
  const fetchStructure = (endpoint: string) =>
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        sequence: sequence,
      }),
    }).then((response) => response.json());

  const { data, error, isLoading } = useSWR("api/structure", fetchStructure);

  console.log(sequence.length);
  console.log(mutatedResidues);

  useEffect(() => {
    const initViewer = () => {
      let element = $("#" + elementId);
      let config = { backgroundColor: "white" };
      let viewer = $3Dmol.createViewer(element, config);
      viewer.addModel(data.message, "pdb");
      viewer.setStyle({}, { cartoon: { color: "grey" } });
      viewer.addStyle({ stick: { color: "spectrum" } });
      if (mutatedResidues.length > 0) {
        viewer.addStyle(
          { resi: mutatedResidues },
          { cartoon: { color: "red" } }
        );
      }
      viewer.addSurface($3Dmol.SurfaceType.MS, {
        opacity: 0.7,
        color: "white",
      });
      viewer.zoomTo();
      viewer.render();
      viewer.zoom(0.8, 2000);
    };

    if (
      typeof window !== "undefined" &&
      !isLoading &&
      !error &&
      data.message !== "Sequence is empty."
    ) {
      initViewer();
    }
  }, [data]);

  return (
    <div>
      <div className="w-full h-full">
        <div
          style={{ height: 600, width: 600, position: "relative" }}
          id={elementId}
          className={elementId}
        ></div>
      </div>
    </div>
  );
}

export default StructureViewer;
