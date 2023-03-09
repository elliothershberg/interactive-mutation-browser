export function parseInput(input: string) {
  const aminoAcids = input.split("");
  const sequenceArray = aminoAcids.map((aminoAcid, index) => {
    return {
      position: index + 1,
      initialAminoAcid: aminoAcid,
      mutatedAminoAcid: "",
    };
  });

  return sequenceArray;
}
