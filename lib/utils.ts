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

export function parseESMResponse(response: string) {
  const responseLines = response.split("\n");
  const coordinates = responseLines.map((line) => {
    if (line[0] === "A") {
      return line;
    }
  });

  console.log(coordinates.join("\n").trim());
  return coordinates.join("\n").trim();
}
