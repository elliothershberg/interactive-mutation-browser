import React from "react";
import { useAtom } from "jotai";

import { sequenceArrayAtom } from "../../lib/sequenceState";
import AminoAcidPopover from "./AminoAcidPopover";

function AminoAcidSequence() {
  const [sequenceArray, setSequenceArray] = useAtom(sequenceArrayAtom);

  return (
    <div className="flex flex-wrap w-2/3">
      {sequenceArray.map((aminoAcid) => {
        return (
          <AminoAcidPopover
            aminoAcid={aminoAcid}
            aminoAcidArray={sequenceArray}
            setAminoAcidArray={setSequenceArray}
            key={aminoAcid.position}
          />
        );
      })}
    </div>
  );
}

export default AminoAcidSequence;
