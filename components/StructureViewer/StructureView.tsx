import React from 'react';
import Script from "next/script";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import $ from "jquery";

declare var $3Dmol: any;

function StructureViewer({
  sequence,
  elementId,
  mutatedResidues = [],
}: {
  sequence: string;
  elementId?: string;
  mutatedResidues?: string[];
}) {
  const [serverError, setServerError] = useState(false);
  const [viewerLoaded, setViewerLoaded] = useState(false);

  // If sequence is empty, do not render the component
  if (sequence === '') {
    return null;
  }

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
    queryKey: [sequence],
    queryFn: fetchStructure,
  });

  useEffect(() => {
    const initViewer = () => {
      if (data?.message && data.message.substring(0, 6) !== "HEADER") {
        setServerError(true);
        console.log("Server error set to true due to data message condition."); // Added console log for debugging
        console.log("Data object received:", data); // Additional console log for debugging
        return;
      }
      let element = $("#" + elementId);
      let config = { backgroundColor: "white" };
      let viewer = $3Dmol.createViewer(element, config);
      setViewerLoaded(true);
      viewer.addModel(data.message, "pdb");
      viewer.setStyle({}, { cartoon: { color: "grey" } });
      viewer.addSurface($3Dmol.SurfaceType.MS, {
        opacity: 0.7,
        color: "white",
      });

      if (mutatedResidues.length > 0) {
        viewer.addStyle(
          { resi: mutatedResidues },
          { cartoon: { color: "red" } }
        );
        viewer.addStyle(
          { resi: mutatedResidues },
          { stick: { color: "spectrum" } }
        );
      }
      viewer.zoomTo();
      viewer.render();
      viewer.zoom(0.8, 2000);
    };

    if (
      typeof window !== "undefined" &&
      typeof $3Dmol !== "undefined" &&
      !isLoading &&
      !isError
    ) {
      initViewer();
    } else {
      console.log("Fetching error:", error);
      console.log("Data object received:", data); // Additional console log for debugging
      setServerError(true); // Set serverError when isError is true
    }
  }, [data, isError]);

  return (
    <div>
      <Script
        src="https://3Dmol.org/build/3Dmol-min.js"
        strategy="beforeInteractive"
      />
      <div className="w-full h-full">
        <div
          style={{ height: 600, width: 600, position: "relative" }}
          id={elementId}
          className={
            viewerLoaded || serverError ? "" : "bg-white animate-pulse"
          }
          data-testid="structure-viewer"
        >
          {serverError && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-center">
                There was an error fetching the structure prediction.
                {data?.message === "Sequence is longer than 400." && (
                  <>
                    <br />
                    <br />
                    <span>
                      The sequence is longer than the current ESM API limit of
                      400 amino acids.
                    </span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StructureViewer;
