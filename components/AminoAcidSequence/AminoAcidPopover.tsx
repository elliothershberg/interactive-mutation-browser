import { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

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

  return (
    <Popover>
      <Popover.Button ref={setReferenceElement} className="focus:outline-none">
        <div className="border border-gray-900 w-6 h-6 flex items-center justify-center m-2 p-6 rounded hover:bg-gray-300 ">
          <div>
            <strong className="text-xl text-gray-900 font-bold">
              {aminoAcid.initialAminoAcid}
            </strong>
            <br />
            <p className="text-sm text-gray-600">{aminoAcid.position}</p>
          </div>
        </div>
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
          {AMINO_ACIDS.map((aminoAcid) => {
            return (
              <button>
                <div className="border border-gray-900 w-6 h-6 flex items-center justify-center m-2 p-6 rounded hover:bg-gray-300">
                  {aminoAcid}
                </div>
              </button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default AminoAcidPopover;
