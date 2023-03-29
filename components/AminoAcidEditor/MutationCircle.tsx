import React from "react";
import { Circle } from "@visx/shape";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";

import { MutationArrayEntry } from "../../lib/sequenceState";

function MutationCircle({
  cx,
  cy,
  mutation,
}: {
  cx: number;
  cy: number;
  mutation: MutationArrayEntry;
}) {
  const { tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip();

  const { TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });

  const handleMouseOver = (event: any) => {
    showTooltip({
      tooltipLeft: event.clientX - 5,
      tooltipTop: event.clientY - 65,
    });
  };

  return (
    <>
      <Circle
        cx={cx}
        cy={cy}
        r={4}
        fill={"#111827"}
        onMouseOver={handleMouseOver}
        onMouseOut={hideTooltip}
      />
      {tooltipOpen && (
        <div className="relative">
          <TooltipInPortal
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            className="flex items-center justify-center flex-col border border-gray-900 rounded"
          >
            <strong className="text-gray-900 p-1">
              {mutation.wildTypeAA} →{" "}
              {mutation.insertion ? mutation.insertion : mutation.mutatedAA}
            </strong>
            <p className=" text-gray-600">{mutation.position}</p>
          </TooltipInPortal>
        </div>
      )}
    </>
  );
}

export default MutationCircle;
