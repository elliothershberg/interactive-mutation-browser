import { useEffect, useState } from "react";

function StructureViewer({ sequence }: { sequence: string }) {
  const [structure, setStructure] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  console.log(structure);

  return (
    <div className="m-16">
      <p>{loading ? "Loading..." : structure?.message}</p>
    </div>
  );
}

export default StructureViewer;
