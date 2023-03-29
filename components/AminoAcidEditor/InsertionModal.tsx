import { Fragment, useState } from "react";
import { useSetAtom } from "jotai";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { InputAlertModal } from "../InputForm";
import { AMINO_ACIDS } from "../../lib/constants";
import { mutationArrayAtom } from "../../lib/sequenceState";

export default function InsertionModal({
  open,
  setOpen,
  aminoAcid,
  position,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  aminoAcid: string;
  position: number;
}) {
  const [formInput, setFormInput] = useState("");
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const setMutationArray = useSetAtom(mutationArrayAtom);

  const handleSubmit = () => {
    const letters = formInput.toUpperCase().split("");

    if (letters.length === 0) {
      setModalText("Input form empty.");
      setShowModal(true);
      return;
    }

    for (const letter of letters) {
      if (!AMINO_ACIDS.includes(letter)) {
        setModalText("Detected invalid amino acid in input sequence.");
        setShowModal(true);
        return;
      }
    }

    setMutationArray((mutationArray) => [
      ...mutationArray.filter((mutation) => mutation.position !== position),
      { wildTypeAA: aminoAcid, position, mutatedAA: "+", insertion: formInput },
    ]);

    setOpen(false);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none  focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Enter insertion sequence
                      </Dialog.Title>
                      <div className="mt-2">
                        <textarea
                          rows={4}
                          cols={50}
                          name="insertionInput"
                          id="insertionInput"
                          className="block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={formInput}
                          onChange={(e) => setFormInput(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto"
                      onClick={() => handleSubmit()}
                    >
                      Create insertion
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <InputAlertModal
        open={showModal}
        setOpen={setShowModal}
        modalText={modalText}
      />
    </>
  );
}
