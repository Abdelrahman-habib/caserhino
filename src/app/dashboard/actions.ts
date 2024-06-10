"use server";
import { OrderStatus } from "@prisma/client";
import { db } from "@/app/db";
export const changeOrderStatus = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) => {
  try {
    await db.order.update({ where: { id: orderId }, data: { status: status } });
  } catch (error) {
    throw new Error("Failed to update order status");
  }
};
