import { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

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
  let { styles, attributes } = usePopper(referenceElement, popperElement);

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
        fooopy dooopy
      </Popover.Panel>
    </Popover>
  );
}

export default AminoAcidPopover;
