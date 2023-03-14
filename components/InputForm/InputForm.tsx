import { useState } from "react";
import { useRouter } from "next/router";
import { useSetAtom } from "jotai";

import InputAlertModal from "./InputAlertModal";
import { AMINO_ACIDS } from "../../lib/constants";
import { parseInput } from "../../lib/utils";
import {
  wildTypeSequenceAtom,
  mutatedSequenceAtom,
} from "../../lib/sequenceState";

export default function InputForm() {
  const [formInput, setFormInput] = useState("");
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const setWildTypeSequence = useSetAtom(wildTypeSequenceAtom);
  const setMutatedSequence = useSetAtom(mutatedSequenceAtom);
  const router = useRouter();

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

    setWildTypeSequence(formInput);
    setMutatedSequence(formInput);

    router.push("/browser");
  };

  return (
    <div>
      <InputAlertModal
        open={showModal}
        setOpen={setShowModal}
        modalText={modalText}
      />
      <div className="grid-cols-1 mt-6">
        <textarea
          rows={8}
          cols={80}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formInput}
          onChange={(e) => setFormInput(e.target.value)}
        />
        <button
          type="button"
          className=" rounded-md border border-transparent bg-gray-600 px-6 py-3 mt-4 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleSubmit}
        >
          Submit sequence
        </button>
      </div>
    </div>
  );
}
