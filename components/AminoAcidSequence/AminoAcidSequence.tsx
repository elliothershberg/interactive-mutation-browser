import React, { useState } from "react";

import { parseInput } from "../../lib/utils";

type AminoAcidSequenceProps = {
  sequence: string;
};

function AminoAcidSequence({ sequence }: AminoAcidSequenceProps) {
  const [aminoAcidArray, setAminoAcidArray] = useState(parseInput(sequence));

  console.log(aminoAcidArray);

  return (
    <div className="flex flex-wrap w-2/3">
      {aminoAcidArray.map((aminoAcid) => {
        return (
          <div className="border border-black w-6 h-6 flex items-center justify-center m-2 p-6 rounded">
            {aminoAcid.position}
          </div>
        );
      })}
    </div>
  );
}

export default AminoAcidSequence;
