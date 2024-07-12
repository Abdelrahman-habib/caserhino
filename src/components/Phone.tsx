/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

interface PhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
  noEdges?: boolean;
}

const Phone = ({
  imgSrc,
  className,
  dark = false,
  noEdges = false,
  ...props
}: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        className="pointer-events-none z-50 select-none"
        src={
          noEdges
            ? "/phone-template.png"
            : dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        alt="phone image"
      />
      <div className="absolute -z-10 inset-0">
        <img
          src={imgSrc}
          alt="overlaying phone image"
          className={cn(
            "object-cover min-w-full min-h-full",
            noEdges && "rounded-[50px]"
          )}
        />
      </div>
    </div>
  );
};

export default Phone;
