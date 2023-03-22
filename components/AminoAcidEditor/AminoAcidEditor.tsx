import React from "react";

import AminoAcidTrack from "./AminoAcidTrack";
import AminoAcidSequence from "./AminoAcidSequence";

function AminoAcidEditor() {
  return (
    <div className="w-2/3">
      <AminoAcidTrack />
      <AminoAcidSequence />
    </div>
  );
}

export default AminoAcidEditor;
