import { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useAtom } from "jotai";

import { mutationArrayAtom } from "../../lib/sequenceState";
import { AMINO_ACIDS } from "../../lib/constants";

function AminoAcidPopover({
  aminoAcid,
  position,
}: {
  aminoAcid: string;
  position: number;
}) {
  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement);

  const [mutationArray, setMutationArray] = useAtom(mutationArrayAtom);

  const isPositionMutated = mutationArray.find(
    (mutation) => mutation.position === position
  );

  const handleAminoAcidChange = (aminoAcidClicked: string) => {
    if (aminoAcidClicked !== aminoAcid) {
      setMutationArray((mutationArray) => [
        ...mutationArray.filter((mutation) => mutation.position !== position),
        {
          wildTypeAA: aminoAcid,
          mutatedAA: aminoAcidClicked,
          position: position,
        },
      ]);
    } else {
      setMutationArray((mutationArray) => [
        ...mutationArray.filter((mutation) => mutation.position !== position),
      ]);
    }
  };

  return (
    <Popover>
      <Popover.Button ref={setReferenceElement} className="focus:outline-none">
        {isPositionMutated === undefined ? (
          <div className="border border-gray-900 w-6 h-6 flex items-center justify-center m-2 p-8 rounded hover:bg-gray-300">
            <div>
              <strong className="text-xl text-gray-900 font-bold">
                {aminoAcid}
              </strong>
              <br />
              <p className="text-sm text-gray-600">{position}</p>
            </div>
          </div>
        ) : (
          <div className="border border-indigo-600 w-6 h-6 flex items-center justify-center m-2 p-8 rounded bg-gray-300">
            <div>
              <strong className="text-xl text-indigo-600 font-bold">
                {aminoAcid}→{isPositionMutated.mutatedAA}
              </strong>
              <br />
              <p className="text-sm text-gray-600">{position}</p>
            </div>
          </div>
        )}
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
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
          <Popover.Button onClick={(e) => handleAminoAcidChange("-")}>
            <div className="border border-gray-900 w-[19.75rem] h-6 flex items-center justify-center m-2 p-6 rounded hover:bg-gray-300">
              Delete amino acid
            </div>{" "}
          </Popover.Button>
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default AminoAcidPopover;
