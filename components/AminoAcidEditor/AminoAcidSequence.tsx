import React from "react";
import { useAtomValue } from "jotai";

import { wildTypeSequenceAtom, brushAtom } from "../../lib/sequenceState";
import AminoAcidPopover from "./AminoAcidPopover";

function AminoAcidSequence() {
  const wildTypeSequence = useAtomValue(wildTypeSequenceAtom);
  const brushRange = useAtomValue(brushAtom);
  const { brushStart, brushEnd } = brushRange;

  const seqArray = wildTypeSequence
    .split("")
    .map((aminoAcid, index) => {
      return { aa: aminoAcid, position: index + 1 };
    })
    .slice(brushStart, brushEnd);

  return (
    <div className="flex flex-wrap w-full">
      {seqArray.map((aminoAcid) => {
        const { aa, position } = aminoAcid;
        return (
          <AminoAcidPopover aminoAcid={aa} key={position} position={position} />
        );
      })}
    </div>
  );
}

export default AminoAcidSequence;
