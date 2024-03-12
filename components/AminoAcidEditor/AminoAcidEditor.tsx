import React from "react";

import AminoAcidTrack from "./AminoAcidTrack";
import AminoAcidSequence from "./AminoAcidSequence";

function AminoAcidEditor() {
  // Mock state for input value to simulate user input
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className="w-2/3" data-testid="amino-acid-editor">
      <AminoAcidTrack data-testid="amino-acid-track" />
      <AminoAcidSequence data-testid="amino-acid-sequence" />
      {/* Mock input to simulate user interaction */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        data-testid="amino-acid-editor-input"
      />
    </div>
  );
}

export default AminoAcidEditor;
