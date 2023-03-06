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
          <div className="border border-gray-900 w-6 h-6 flex items-center justify-center m-2 p-6 rounded">
            <div>
              <strong className="text-xl text-gray-900 font-bold">
                {aminoAcid.initialAminoAcid}
              </strong>
              <br />
              <p className="text-sm text-gray-600">{aminoAcid.position}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AminoAcidSequence;
