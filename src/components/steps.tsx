/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Steps = () => {
  const pathname = usePathname();
  const STEPS = [
    {
      name: "step 1: Upload image",
      description: "Choose an image for your case.",
      url: "/upload",
    },
    {
      name: "step 2: Customize design",
      description: "Make the case yours",
      url: "/design",
    },
    {
      name: "step 3: Summary",
      description: "Review your final case design",
      url: "/preview",
    },
  ];
  return (
    <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-1 lg:border-r lg:border-l lg:border-grey-200">
      {STEPS.map((step, index) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(index + 1).some((step) =>
          pathname.endsWith(step.url)
        );
        const imgPath = `/snake-${index + 1}.png`;

        return (
          <li key={step.name} className="relative overflow-hidden lg:flex-1">
            <div>
              <span
                className={cn(
                  "absolute left-0 top-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full",
                  {
                    "bg-zinc-700": isCurrent,
                    "bg-primary": isCompleted,
                  }
                )}
                aria-hidden="true"
              />

              <span
                className={cn(
                  index !== 0 ? "lg:pl-9" : "",
                  "flex items-center px-6 py-4 text-sm font-medium"
                )}
              >
                <span className="flex-shrink-0">
                  <img
                    src={imgPath}
                    alt={step.name}
                    className={cn(
                      "flex h-20 w-20 object-contain items-center justify-center",
                      {
                        "border-none": isCompleted,
                        "boder-zinc-700": isCurrent,
                      }
                    )}
                  />
                </span>

                <span className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center">
                  <span
                    className={cn("text-sm font-semibold text-zinc-700", {
                      "text-zinc-700": isCurrent,
                      "text-primary": isCompleted,
                    })}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {step.description}
                  </span>
                </span>
              </span>

              {index != 0 ? (
                <div className="w-3 absolute inset-0 hidden lg:block">
                  {" "}
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 12 82"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0.5 0V31L10.5 41L0.5 51V82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
