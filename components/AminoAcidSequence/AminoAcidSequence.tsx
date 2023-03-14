import React from "react";
import { useAtomValue } from "jotai";

import { wildTypeSequenceAtom } from "../../lib/sequenceState";
import AminoAcidPopover from "./AminoAcidPopover";

function AminoAcidSequence() {
  const wildTypeSequence = useAtomValue(wildTypeSequenceAtom);

  return (
    <div className="flex flex-wrap w-2/3">
      {wildTypeSequence.split("").map((aminoAcid: any, index) => {
        return (
          <AminoAcidPopover
            aminoAcid={aminoAcid}
            key={index + 1}
            position={index + 1}
          />
        );
      })}
    </div>
  );
}

export default AminoAcidSequence;
