import React, { useState } from "react";

type AminoAcidSequenceProps = {
  sequence: string;
};

type AminoAcidChange = {
  index: number;
  newAminoAcid: string;
};

const AMINO_ACIDS_PER_ROW = 50;

function AminoAcidSequence({ sequence }: AminoAcidSequenceProps) {
  const [changes, setChanges] = useState<AminoAcidChange[]>([]);

  const rows = [];

  for (let i = 0; i < sequence.length; i += AMINO_ACIDS_PER_ROW) {
    const rowSequence = sequence.slice(i, i + AMINO_ACIDS_PER_ROW).split(" ");
    const row = (
      <div key={i} className="flex">
        {rowSequence.map((aa, j) => {
          const index = i + j;
          const isChanged = changes.some((c) => c.index === index);
          const style = `border border-black w-6 h-6 flex items-center justify-center m-2 p-6 rounded ${
            isChanged ? "border-red-500" : ""
          }`;
          return (
            <div
              key={j}
              className={style}
              contentEditable
              suppressContentEditableWarning
              onBlur={(event) => {
                const newAminoAcid = event.currentTarget.innerText
                  .trim()
                  .toUpperCase();
                if (newAminoAcid && newAminoAcid !== aa) {
                  const change: AminoAcidChange = { index, newAminoAcid };
                  setChanges([
                    ...changes.filter((c) => c.index !== index),
                    change,
                  ]);
                }
              }}
            >
              {aa}
            </div>
          );
        })}
      </div>
    );
    rows.push(row);
  }

  const modifiedSequence = changes.reduce(
    (seq, change) =>
      seq.slice(0, change.index) +
      change.newAminoAcid +
      seq.slice(change.index + 1),
    sequence
  );

  return (
    <div>
      {rows}
      <p>Modified sequence: {modifiedSequence}</p>
    </div>
  );
}

export default AminoAcidSequence;
