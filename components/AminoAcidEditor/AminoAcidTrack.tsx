import React, { useRef, useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { ParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { AxisBottom } from "@visx/axis";
import { Brush } from "@visx/brush";
import { Bounds } from "@visx/brush/lib/types";
import BaseBrush from "@visx/brush/lib/BaseBrush";

import MutationCircle from "./MutationCircle";

import {
  wildTypeSequenceAtom,
  mutationArrayAtom,
  brushAtom,
} from "../../lib/sequenceState";

const defaultMargin = { top: 20, right: 100, bottom: 35, left: 20 };
const brushMargin = { top: 10, bottom: 50, left: 50, right: 70 };

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
  const mutationArray = useAtomValue(mutationArrayAtom);
  const setBrush = useSetAtom(brushAtom);

  const seqLength = wildTypeSequence.length;

  // bounds
  const xMax = parentWidth - margin.left - margin.right;
  const yMax = parentHeight - margin.top - margin.bottom;

  // scales
  const indexScale = scaleLinear<number>({
    domain: [1, seqLength],
    nice: true,
  });
  const yScale = scaleLinear<number>({
    domain: [0, 1],
    nice: true,
  });

  indexScale.range([0, xMax]);

  // brush
  const brushRef = useRef<BaseBrush | null>(null);

  const onBrushChange = (domain: Bounds | null) => {
    if (!domain) return;
    const { x0, x1 } = domain;
    const brushStart = x0 < 0 ? 0 : x0;
    const brushEnd = x1 > seqLength ? seqLength : x1;
    setBrush({ brushStart, brushEnd });
  };

  const xBrushMax = Math.max(
    parentWidth - brushMargin.left - brushMargin.right,
    0
  );
  const yBrushMax = Math.max(
    parentHeight - brushMargin.top - brushMargin.bottom,
    0
  );

  const initialBrushPosition = useMemo(
    () => ({
      start: { x: indexScale(1) },
      // start at either the end of the sequence or 50 amino acids
      end: { x: indexScale(seqLength < 50 ? seqLength : 50) },
    }),
    [indexScale]
  );

  return (
    <div>
      <svg height={parentHeight} width={parentWidth}>
        <Group left={margin.left} top={margin.top}>
          <Brush
            xScale={indexScale}
            yScale={yScale}
            width={xBrushMax}
            height={yBrushMax}
            margin={brushMargin}
            innerRef={brushRef}
            resizeTriggerAreas={["left", "right"]}
            brushDirection="horizontal"
            initialBrushPosition={initialBrushPosition}
            onChange={onBrushChange}
            selectedBoxStyle={{
              fill: "#9ca3af",
              fillOpacity: 0.1,
              stroke: "#4b5563",
              strokeOpacity: 0.8,
              strokeWidth: 1,
            }}
            useWindowMoveEvents
          />
          {mutationArray.map((mutation, i) => {
            return (
              <MutationCircle
                key={i}
                cx={indexScale(mutation.position)}
                cy={yMax / 2}
                mutation={mutation}
              />
            );
          })}
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
        {(parent) =>
          parent.width > 0 && parent.height > 0 ? (
            <AminoAcidTrackViewer
              parentHeight={parent.height}
              parentWidth={parent.width}
            />
          ) : null
        }
      </ParentSize>
    </div>
  );
}

export default AminoAcidTrack;
