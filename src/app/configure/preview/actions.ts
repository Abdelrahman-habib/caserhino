"use server";

import { db } from "@/app/db";
import { BASE_PRICE } from "@/config/products";
import { stripe } from "@/lib/stripe";
import { FINISHES, MATERIALS } from "@/validators/option-validator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";
import { url } from "inspector";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });
  if (!configuration) {
    throw new Error("No such configuration not found!");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("You need to be logged in");
  }

  const { finish, material } = configuration;
  const selectedFinish = FINISHES.options.find((f) => f.Value === finish);
  const selectedMaterial = MATERIALS.options.find((m) => m.Value === material);
  const totalPrice =
    selectedFinish!.price + selectedMaterial!.price + BASE_PRICE;

  let order: Order | undefined = undefined;
  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        userId: user.id,
        configurationId: configuration.id,
        amount: totalPrice / 100,
      },
    });
  }
  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: totalPrice,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?order_id=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "EG"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [
      {
        price: product.default_price as string,
        quantity: 1,
      },
    ],
  });
  // TODO: implement stripe checkout

  return { url: stripeSession.url };
};
