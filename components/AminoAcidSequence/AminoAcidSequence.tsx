import React, { useState } from "react";

import { parseInput } from "../../lib/utils";
import AminoAcidPopover from "./AminoAcidPopover";

type AminoAcidSequenceProps = {
  sequence: string;
};

function AminoAcidSequence({ sequence }: AminoAcidSequenceProps) {
  const [aminoAcidArray, setAminoAcidArray] = useState(parseInput(sequence));

  return (
    <div className="flex flex-wrap w-2/3">
      {aminoAcidArray.map((aminoAcid) => {
        return (
          <AminoAcidPopover
            aminoAcid={aminoAcid}
            aminoAcidArray={aminoAcidArray}
            setAminoAcidArray={setAminoAcidArray}
            key={aminoAcid.position}
          />
        );
      })}
    </div>
  );
}

export default AminoAcidSequence;
