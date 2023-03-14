import React from "react";
import { useAtomValue } from "jotai";

import { sequenceArrayAtom } from "../../lib/sequenceState";
import AminoAcidPopover from "./AminoAcidPopover";

function AminoAcidSequence() {
  const sequenceArray = useAtomValue(sequenceArrayAtom);

  return (
    <div className="flex flex-wrap w-2/3">
      {sequenceArray.map((aminoAcid: any) => {
        return (
          <AminoAcidPopover aminoAcid={aminoAcid} key={aminoAcid.position} />
        );
      })}
    </div>
  );
}

export default AminoAcidSequence;
