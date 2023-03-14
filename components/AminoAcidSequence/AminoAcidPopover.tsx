import { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useAtom } from "jotai";

import { sequenceArrayAtom } from "../../lib/sequenceState";
import { AMINO_ACIDS } from "../../lib/constants";

function AminoAcidPopover({
  aminoAcid,
}: {
  aminoAcid: {
    position: number;
    initialAminoAcid: string;
    mutatedAminoAcid: string;
  };
}) {
  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });

  const [aminoAcidArray, setAminoAcidArray] = useAtom(sequenceArrayAtom);

  const handleAminoAcidChange = (aminoAcidClicked: string) => {
    const newArray = aminoAcidArray;
    if (aminoAcidClicked !== aminoAcid.initialAminoAcid) {
      newArray[aminoAcid.position - 1].mutatedAminoAcid = aminoAcidClicked;
    } else {
      newArray[aminoAcid.position - 1].mutatedAminoAcid = "";
    }
    setAminoAcidArray(newArray);
  };

  const { position } = aminoAcid;

  return (
    <Popover>
      <Popover.Button ref={setReferenceElement} className="focus:outline-none">
        {aminoAcid.mutatedAminoAcid === "" ? (
          <div className="border border-gray-900 w-6 h-6 flex items-center justify-center m-2 p-8 rounded hover:bg-gray-300">
            <div>
              <strong className="text-xl text-gray-900 font-bold">
                {aminoAcid.initialAminoAcid}
              </strong>
              <br />
              <p className="text-sm text-gray-600">{aminoAcid.position}</p>
            </div>
          </div>
        ) : (
          <div className="border border-indigo-600 w-6 h-6 flex items-center justify-center m-2 p-8 rounded bg-gray-300">
            <div>
              <strong className="text-xl text-indigo-600 font-bold">
                {aminoAcid.initialAminoAcid}→{aminoAcid.mutatedAminoAcid}
              </strong>
              <br />
              <p className="text-sm text-gray-600">{aminoAcid.position}</p>
            </div>
          </div>
        )}
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div ref={setArrowElement} style={styles.arrow} className="-mt-3">
          ↑
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-900 flex flex-wrap w-96 mt-2">
          {AMINO_ACIDS.map((aminoAcid, index) => {
            const key = position + aminoAcid + index;
            return (
              <Popover.Button
                onClick={(e) => handleAminoAcidChange(aminoAcid)}
                key={key}
              >
                <div className="border border-gray-900 w-6 h-6 flex items-center justify-center m-2 p-6 rounded hover:bg-gray-300">
                  {aminoAcid}
                </div>
              </Popover.Button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default AminoAcidPopover;
