import Script from "next/script";
import { useEffect, useState } from "react";

function StructureViewer({ sequence }: { sequence: string }) {
  const [structure, setStructure] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // state for keeping track of the 3Dmol.js scripts loading
  const [viewerLoaded, setviewerLoaded] = useState(false);
  const [uiLoaded, setUiLoaded] = useState(false);

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
    setLoading(true);
    fetchStructure().then((data) => {
      setStructure(data);
      setLoading(false);
    });
  }, [sequence]);

  // need to wait for the 3Dmol.js scripts to load,
  // then initialize the viewer
  useEffect(() => {
    if (viewerLoaded && uiLoaded) {
      // @ts-ignore
      globalThis.$3Dmol.autoload();
    }
  }, [viewerLoaded, uiLoaded]);

  return (
    <>
      <Script
        src="https://3Dmol.org/build/3Dmol-min.js"
        onLoad={() => {
          console.log("loaded!");
          setviewerLoaded(true);
        }}
      ></Script>
      <Script
        src="https://3Dmol.org/build/3Dmol.ui-min.js"
        onLoad={() => {
          setUiLoaded(true);
        }}
      ></Script>
      <div className="m-16">
        {viewerLoaded && uiLoaded && (
          <div className="w-full h-full">
            Container:
            <div
              style={{ height: 400, width: 400, position: "relative" }}
              className="viewer_3Dmoljs"
              data-pdb="2POR"
              data-backgroundcolor="0xffffff"
              data-style="stick"
              data-ui="true"
            ></div>
          </div>
        )}
      </div>
    </>
  );
}

export default StructureViewer;
