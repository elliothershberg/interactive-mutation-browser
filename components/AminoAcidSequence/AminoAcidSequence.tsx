import React, { useState } from "react";

import { parseInput } from "../../lib/utils";
import AminoAcidPopover from "./AminoAcidPopover";

type AminoAcidSequenceProps = {
  sequence: string;
};

function AminoAcidSequence({ sequence }: AminoAcidSequenceProps) {
  const [aminoAcidArray, setAminoAcidArray] = useState(parseInput(sequence));

  console.log(aminoAcidArray);

  return (
    <div className="flex flex-wrap w-2/3">
      {aminoAcidArray.map((aminoAcid) => {
        return <AminoAcidPopover aminoAcid={aminoAcid} />;
      })}
    </div>
  );
}

export default AminoAcidSequence;
