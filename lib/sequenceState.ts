import { atom } from "jotai";

interface AminoAcid {
  position: number;
  initialAminoAcid: string;
  mutatedAminoAcid: string;
}

export const sequenceArrayAtom = atom<AminoAcid[] | []>([]);
