// bg-blue-700 border-blue-700
// bg-rose-700 border-rose-700
// bg-zinc-900 border-zinc-900
// bg-green-700 border-green-700

import { PRODUCT_PRICES } from "@/config/products";

export const COLORS = [
  {
    label: "Black",
    Value: "black",
    tw: "zinc-900",
  },
  {
    label: "Blue",
    Value: "blue",
    tw: "blue-700",
  },
  {
    label: "Rose",
    Value: "rose",
    tw: "rose-700",
  },
  {
    label: "Green",
    Value: "green",
    tw: "green-700",
  },
] as const;

export const MODELS = {
  name: "models",

  options: [
    {
      label: "iPhone 14",
      Value: "iPhone14",
    },
    {
      label: "iPhone 13",
      Value: "iPhone13",
    },
    {
      label: "iPhone 12",
      Value: "iPhone12",
    },
    {
      label: "iPhone 11",
      Value: "iPhone11",
    },
    {
      label: "iPhone X",
      Value: "iPhoneX",
    },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicon",
      Value: "silicon",
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: "Polycarbonate",
      Value: "polycarbonate",
      description: "Scratch resistant coating",
      price: PRODUCT_PRICES.material.polycarbonate,
    },
    {
      label: "Plastic",
      Value: "plastic",
      description: "Durable plastic",
      price: PRODUCT_PRICES.material.plastic,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth",
      Value: "smooth",
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: "Textured",
      Value: "textured",
      description: "Soft grippy Texture",
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const;
