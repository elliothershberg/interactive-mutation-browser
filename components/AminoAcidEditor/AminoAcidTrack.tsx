import React from "react";
import { useAtomValue } from "jotai";
import { ParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { AxisBottom } from "@visx/axis";

import { wildTypeSequenceAtom } from "../../lib/sequenceState";

const defaultMargin = { top: 20, right: 20, bottom: 35, left: 20 };

function AminoAcidTrackViewer({
  parentHeight,
  parentWidth,
  margin = defaultMargin,
}: {
  parentHeight: number;
  parentWidth: number;
  margin?: typeof defaultMargin;
}) {
  const wildTypeSequence = useAtomValue(wildTypeSequenceAtom);
  const seqLength = wildTypeSequence.length;

  // bounds
  const xMax = parentWidth - margin.left - margin.right;
  const yMax = parentHeight - margin.top - margin.bottom;

  // scales
  const indexScale = scaleLinear<number>({
    domain: [0, seqLength],
    nice: true,
  });

  indexScale.range([0, xMax]);

  console.log({ parentHeight, parentWidth, xMax, yMax, seqLength });

  return (
    <div>
      <svg height={parentHeight} width={parentWidth}>
        <Group left={margin.left} top={margin.top}>
          <AxisBottom top={yMax} scale={indexScale} />
        </Group>
      </svg>
    </div>
  );
}

function AminoAcidTrack() {
  return (
    <div className="w-full h-24 mb-4">
      <ParentSize>
        {(parent) => (
          <AminoAcidTrackViewer
            parentHeight={parent.height}
            parentWidth={parent.width}
          />
        )}
      </ParentSize>
    </div>
  );
}

export default AminoAcidTrack;
