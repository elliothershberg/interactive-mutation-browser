import { atom } from "jotai";

interface AminoAcid {
  position: number;
  initialAminoAcid: string;
  mutatedAminoAcid: string;
}

export const sequenceArrayAtom = atom<AminoAcid[] | []>([]);
sequenceArrayAtom.debugLabel = "sequenceArrayAtom";

export const wildTypeSequenceAtom = atom<string>((get) => {
  const sequenceArray = get(sequenceArrayAtom);
  const wildTypeArray = sequenceArray.map((aminoAcid) => {
    return aminoAcid.initialAminoAcid;
  });
  return wildTypeArray.join("");
});
wildTypeSequenceAtom.debugLabel = "wildTypeSequenceAtom";

export const mutatedSequenceAtom = atom<string>((get) => {
  const sequenceArray = get(sequenceArrayAtom);
  const mutatedArray = sequenceArray.map((aminoAcid) => {
    return aminoAcid.mutatedAminoAcid;
  });
  return mutatedArray.join("");
});
mutatedSequenceAtom.debugLabel = "mutatedSequenceAtom";
