import { atom } from "jotai";

export const wildTypeSequenceAtom = atom("");
wildTypeSequenceAtom.debugLabel = "wildTypeSequenceAtom";

export const mutatedSequenceAtom = atom("");
mutatedSequenceAtom.debugLabel = "mutatedSequenceAtom";

interface MutationArrayEntry {
  wildTypeAA: string;
  mutatedAA: string;
  position: number;
}

export function computeMutationArray(
  wildTypeSequence: string,
  mutatedSequence: string
) {
  const mutationArray: Array<MutationArrayEntry> = [];
  for (let i = 0; i < wildTypeSequence.length; i++) {
    const mutatedAA =
      wildTypeSequence[i] === mutatedSequence[i] ? "" : mutatedSequence[i];
    mutationArray.push({
      wildTypeAA: wildTypeSequence[i],
      mutatedAA,
      position: i + 1,
    });
  }

  return mutationArray;
}
