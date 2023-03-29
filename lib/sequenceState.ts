import { atom } from "jotai";

export const wildTypeSequenceAtom = atom("");
wildTypeSequenceAtom.debugLabel = "wildTypeSequenceAtom";

export interface MutationArrayEntry {
  wildTypeAA: string;
  mutatedAA: string;
  position: number;
  insertion?: string;
}

export const mutationArrayAtom = atom<MutationArrayEntry[]>([]);
mutationArrayAtom.debugLabel = "mutationArrayAtom";

export const mutatedSequenceAtom = atom((get) => {
  const wildTypeSequence = get(wildTypeSequenceAtom);
  const mutationArray = get(mutationArrayAtom);
  let mutatedSequence = wildTypeSequence.split("");
  mutationArray.forEach((mutation) => {
    if (mutation.insertion) {
      mutatedSequence[mutation.position - 1] = mutation.insertion;
    } else if (mutation.mutatedAA === "-") {
      mutatedSequence[mutation.position - 1] = "";
    } else {
      mutatedSequence[mutation.position - 1] = mutation.mutatedAA;
    }
  });
  return mutatedSequence.join("");
});

export const brushAtom = atom({ brushStart: 0, brushEnd: 50 });
brushAtom.debugLabel = "brushAtom";
