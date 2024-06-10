/* eslint-disable @next/next/no-img-element */
"use client";

import { CaseColor } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

const PhonePreview = ({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: CaseColor;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [renderdDimensions, setRenderdDimensions] = useState({
    height: 0,
    width: 0,
  });

  let caseBackgroundColor = "bg-zinc-950";
  if (color == "blue") caseBackgroundColor = "bg-blue-950";
  if (color == "green") caseBackgroundColor = "bg-green-950";
  if (color == "rose") caseBackgroundColor = "bg-rose-950";

  const handleResize = () => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderdDimensions({ width, height });
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderdDimensions.width / 2 -
            renderdDimensions.width / (1216 / 121),
          top: renderdDimensions.height / 6.22,
        }}
      >
        <img
          src={croppedImageUrl}
          alt="phone preview"
          width={renderdDimensions.width / (3000 / 637)}
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            caseBackgroundColor
          )}
        />
      </div>

      <div className="relative h-full w-full z-40">
        <img
          src="/clearphone.png"
          alt="phone holder preview"
          className="w-full h-full pointer-events-none antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  );
};

export default PhonePreview;
