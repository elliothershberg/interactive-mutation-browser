import Script from "next/script";
import { useEffect, useState } from "react";

function StructureViewer({ sequence }: { sequence: string }) {
  const [structure, setStructure] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // state for keeping track of the 3Dmol.js script loading
  const [viewerLoaded, setviewerLoaded] = useState(false);

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

  // need to wait for the structure to be fetched,
  // then initialize the viewer
  useEffect(() => {
    const { $3Dmol } = globalThis as any;
    if ($3Dmol) {
      $3Dmol.autoload();
    }
  }, [structure, viewerLoaded]);

  return (
    <>
      <Script
        src="https://3Dmol.org/build/3Dmol-min.js"
        onLoad={() => {
          setviewerLoaded(true);
        }}
      ></Script>
      <div>
        {structure && (
          <div className="w-full h-full">
            <textarea
              className="hidden"
              id={sequence}
              value={structure.message}
              readOnly
            ></textarea>
            <div
              style={{ height: 400, width: 400, position: "relative" }}
              className="viewer_3Dmoljs"
              data-element={sequence}
              data-type="pdb"
              data-backgroundcolor="0xffffff"
              data-style="cartoon:color=spectrum"
              data-surface="opacity:.7;color:white"
              // data-style="stick"
              data-ui="true"
            ></div>
          </div>
        )}
      </div>
    </>
  );
}

export default StructureViewer;
