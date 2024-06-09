"use client";
import { saveConfig as _saveConfig, saveConfigArgs } from "./actions";
import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatPrice } from "@/lib/utils";
import NextIamge from "next/image";
import { Rnd } from "react-rnd";
import {
  Radio,
  RadioGroup,
  Label as HeadlessLabel,
  Description,
} from "@headlessui/react";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";
import { useRef, useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckIcon, ChevronsUpDown } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

/* eslint-disable @next/next/no-img-element */

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  width: number;
  height: number;
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  width,
  height,
}: DesignConfiguratorProps) => {
  const [progress, setProgress] = useState(0);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { toast } = useToast();
  const { mutate: saveConfig } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: saveConfigArgs) => {
      await Promise.all([saveConfiguration(), _saveConfig(args)]);
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
    onError: () => {
      toast({
        title: "Something went wrong.",
        description: "There was sn error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    finish: (typeof FINISHES.options)[number];
    material: (typeof MATERIALS.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    finish: FINISHES.options[0],
    material: MATERIALS.options[0],
  });
  const [renderedDimension, setRenderedDimension] = useState({
    width: width / 4,
    height: height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing("imageUploader");
  async function saveConfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width: caseWidth,
        height: caseHeight,
      } = phoneCaseRef.current!.getBoundingClientRect();
      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();
      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;
      const x = renderedPosition.x - leftOffset;
      const y = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = caseWidth;
      canvas.height = caseHeight;
      const ctx = canvas.getContext("2d")!;
      const userImage = new Image();
      userImage.src = imageUrl;
      userImage.crossOrigin = "anonymous";
      await new Promise((resolve) => (userImage.onload = resolve));
      ctx?.drawImage(
        userImage,
        x,
        y,
        renderedDimension.width,
        renderedDimension.height
      );
      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "image.png", { type: "image/png" });
      await startUpload([file], { configId: configId });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "There was a problem saving your config. Please try again.",
        variant: "destructive",
      });
    }
  }

  function base64ToBlob(base64: string, mimeType: string) {
    const byteString = atob(base64);
    const arrayBuffer = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }
    const uint8Array = new Uint8Array(arrayBuffer);
    return new Blob([uint8Array], { type: mimeType });
  }

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center foucus:outline-none focus:ring-2 focus-ring-primary focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ref={phoneCaseRef}
            className="relative w-full z-50 pointer-events-none aspect-[896/1831]"
            ratio={896 / 1831}
          >
            <NextIamge
              alt="phone image"
              src="/phone-template.png"
              fill
              className="pointer-events-none z-50 select-none."
            />
          </AspectRatio>
          <div className="absolute inset-0 z-40 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>
        <Rnd
          className="absolute z-20 border-[3px] border-primary"
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
          onDragStop={(_, { x, y }) => {
            setRenderedPosition({
              x,
              y,
            });
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedPosition({
              x,
              y,
            });
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });
          }}
          lockAspectRatio
          default={{
            x: 150,
            y: 205,
            width: width / 4,
            height: height / 4,
          }}
        >
          <div className="relative w-full h-full">
            <NextIamge
              src={imageUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="relative w-full col-span-full lg:col-span-1 h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 z-10 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />
          <div className="px-8 pb-12 pt-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Customize your case
            </h2>
            <div className="w-full h-px bg-zinc-200 my-6" />
            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) =>
                    setOptions((prev) => ({ ...prev, color: val }))
                  }
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <Radio
                        key={color.label}
                        value={color}
                        className={({ checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center",
                            "justify-center rounded-full p-0.5 active:ring-0 focus:ring-0",
                            "active:outline-none border-2 border-transparent",
                            { [`border-${color.tw}`]: checked }
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "h-8 w-8 rounded-full border-black border-opacity-10"
                          )}
                        />
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          onClick={() =>
                            setOptions((prev) => ({ ...prev, model: model }))
                          }
                          key={model.label}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                model.label === options.model.label,
                            }
                          )}
                        >
                          <CheckIcon
                            className={cn("w-4 h-4 mr-2", {
                              "opacity-0": model.label !== options.model.label,
                              "opacity-100":
                                model.label === options.model.label,
                            })}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) =>
                        setOptions((prev) => ({ ...prev, [name]: val }))
                      }
                    >
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((option) => (
                          <Radio
                            key={option.Value}
                            value={option}
                            className={({ checked }) =>
                              cn(
                                "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                                {
                                  "border-primary": checked,
                                }
                              )
                            }
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <HeadlessLabel
                                  as="span"
                                  className="font-medium text-gray-900"
                                >
                                  {option.label}
                                </HeadlessLabel>
                                {option.description && (
                                  <Description as="span">
                                    <span className="text-gray-500 block sm:inline">
                                      {option.description}
                                    </span>
                                  </Description>
                                )}
                              </span>
                            </span>
                            <Description
                              as="span"
                              className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                            >
                              <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                              </span>
                            </Description>
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full px-8 h-16 bg-white">
          <div h-px w-full bg-zinc-200 />
          <div className="w-full flex justify-end items-center h-full">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100
                )}
              </p>
              <Button
                onClick={() =>
                  saveConfig({
                    configId,
                    color: options.color.Value,
                    model: options.model.Value,
                    material: options.material.Value,
                    finish: options.finish.Value,
                  })
                }
                size="sm"
                className="w-full"
              >
                Continue
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
