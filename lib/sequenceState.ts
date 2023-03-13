import { atom } from "jotai";

interface AminoAcid {
  position: number;
  initialAminoAcid: string;
  mutatedAminoAcid: string;
}

export const sequenceArrayAtom = atom<AminoAcid[] | []>([]);
sequenceArrayAtom.debugLabel = "sequenceArrayAtom";

export const wildTypeSequenceAtom = atom<string>("");
wildTypeSequenceAtom.debugLabel = "wildTypeSequenceAtom";

export const mutatedSequenceAtom = atom<string>("");
mutatedSequenceAtom.debugLabel = "mutatedSequenceAtom";
