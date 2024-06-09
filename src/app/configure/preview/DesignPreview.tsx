"use client";
import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { BASE_PRICE } from "@/config/products";
import { formatPrice } from "@/lib/utils";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/LoginModal";
const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { user } = useKindeBrowserClient();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => setShowConfetti(true), []);

  const { color, finish, material, model } = configuration;
  const selectedColor = COLORS.find((c) => c.Value === color);
  const selectedFinish = FINISHES.options.find((f) => f.Value === finish);
  const selectedMaterial = MATERIALS.options.find((m) => m.Value === material);
  const selectedModel = MODELS.options.find((m) => m.Value === model);
  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) {
        router.push(url);
      } else {
        throw new Error("Unable to retrieve checkout url");
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong.",
        description: "There was sn error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    if (user) {
      createPaymentSession({
        configId: configuration.id,
      });
    } else {
      // save user configuration and then prompt to login
      localStorage.setItem("configurationId", configuration.id);
      setIsLoginModalOpen(true);
    }
  };
  return (
    <>
      <div
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
        aria-hidden="true"
      >
        <Confetti
          active={showConfetti}
          config={{
            elementCount: 200,
            spread: 360,
            duration: 3000,
            startVelocity: 40,
          }}
        />
      </div>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className="mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-6 md:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            imgSrc={configuration.croppedImageUrl!}
            className={`bg-${selectedColor?.tw}`}
          />
        </div>

        <div className="mt-6 sm:col-span-9 md:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {selectedModel?.label} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="w-4 h-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packing made from recycled materials</li>
                <li>5 year print guarantee</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High quality, durable material</li>
                <li>Scratch and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          <div>
            <div className="bg-grey-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 ">
                  <p className="text-grey-600">Base Price</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>
                {finish === "textured" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-grey-600">Textured finish</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(selectedFinish!.price / 100)}
                    </p>
                  </div>
                ) : null}
                {material === "plastic" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-grey-600">Plastic material</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(selectedMaterial!.price / 100)}
                    </p>
                  </div>
                ) : null}
                {material === "polycarbonate" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-grey-600">Polycarbonate material</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(selectedMaterial!.price / 100)}
                    </p>
                  </div>
                ) : null}
                <div className="my-2 h-px bg-gray-200" />
                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-grey-900">Total</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(
                      (BASE_PRICE +
                        selectedFinish!.price +
                        selectedMaterial!.price) /
                        100
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-end pb-12">
              <Button
                onClick={() => handleCheckout()}
                className="px-4 sm:px-6 lg:px-8"
              >
                Check out <ArrowRight className="ml-1.5 h-4 w-4 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
