"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronDown } from "lucide-react";
import { changeOrderStatus } from "./actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

const StatusDropdown = ({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) => {
  const router = useRouter();
  const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    fulfilled: "Fulfilled",
    shipped: "Shipped",
    awaiting_shipment: "Awaiting Shipment",
  };

  const { mutate } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-52 bg-transparent flex items-center justify-between"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <DropdownMenuLabel className="pt-2 text-center">
          Order Status
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(OrderStatus).map(([key, value]) => (
          <DropdownMenuItem
            className={cn(
              "cursor-pointer hover:bg-zinc-100 flex text-sm gap-1 items-center p-2.5",
              {
                "bg-zinc-100": value === orderStatus,
              }
            )}
            key={key}
            onClick={() => mutate({ orderId: id, status: value })}
          >
            <Check
              className={cn("w-4 h-4 mr-2 text-primary", {
                "opacity-0": value !== orderStatus,
              })}
            />

            {LABEL_MAP[value]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
