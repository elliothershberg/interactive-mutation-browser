import { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

function InfoPopover() {
  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right",
  });

  return (
    <Popover>
      <Popover.Button ref={setReferenceElement} className="focus:outline-none">
        <QuestionMarkCircleIcon className="h-6 w-6 pl-1" aria-hidden="true" />
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-900 flex flex-wrap mt-2 text-gray-600 text-sm text-left ml-3">
          Use the interactive brush to navigate around the sequence.
          <br />
          Click on an amino acid to make a mutation.
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default InfoPopover;
