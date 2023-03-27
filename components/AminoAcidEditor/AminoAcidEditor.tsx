import React from "react";

import AminoAcidTrack from "./AminoAcidTrack";
import AminoAcidSequence from "./AminoAcidSequence";

import InfoPopover from "./InfoPopover";

function AminoAcidEditor() {
  return (
    <div className="w-2/3">
      <div className="flex justify-start ml-4 mb-6 text-xl text-gray-700">
        Current mutations
        <InfoPopover />
      </div>

      <AminoAcidTrack />
      <AminoAcidSequence />
    </div>
  );
}

export default AminoAcidEditor;
