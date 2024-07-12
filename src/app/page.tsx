/* eslint-disable @next/next/no-img-element */
"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";
import { Highlight } from "@/components/ui/hero-highlight";
import NumberTicker from "@/components/ui/number-ticker";
import BlurFade from "@/components/ui/blur-fade";
import { FloatingPhone } from "@/components/FloatingPhone";
import WordRotate from "@/components/ui/rotate-words";

export default function Home() {
  const words = ["show", "pet", "art", "team", "snap"];
  const delay = 0.1;
  return (
    <div className="bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <BlurFade delay={delay} inView>
                <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                  <img alt="snake" src="/snake-1.png" className="w-full" />
                </div>
              </BlurFade>
              <BlurFade delay={delay * 2} inView>
                <h1 className="relative w-fit tracking-tighter text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                  Your favorite{" "}
                  <WordRotate
                    words={words}
                    style={{
                      width: `4ch`,
                    }}
                  />{" "}
                  on a{" "}
                  <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                  Phone Case
                </h1>
              </BlurFade>
              <BlurFade delay={delay * 3} inView>
                <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                  Capture your favorite memories with your own,{" "}
                  <span className="font-semibold">one of a kind</span> phone
                  case. CaseRhino allows you to protect your memories, not just
                  your phone.
                </p>
              </BlurFade>

              <ul className="mt-8 space-y-2 text-left font-meduim flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <BlurFade delay={delay * 4} inView>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="w-5 h-5 shrink-0 text-green-600" />
                      High-quality, durable material
                    </li>
                  </BlurFade>
                  <BlurFade delay={delay * 5} inView>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="w-5 h-5 shrink-0 text-green-600" />5
                      year print guarnantee
                    </li>
                  </BlurFade>
                  <BlurFade delay={delay * 6} inView>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="w-5 h-5 shrink-0 text-green-600" />5
                      year Modern iphone models supported
                    </li>
                  </BlurFade>
                </div>
              </ul>
              <BlurFade delay={delay * 7} inView>
                <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="flex -space-x-4">
                    <img
                      src="/users/user-1.png"
                      alt="user image"
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    />
                    <img
                      src="/users/user-2.png"
                      alt="user image"
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    />
                    <img
                      src="/users/user-3.png"
                      alt="user image"
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    />
                    <img
                      src="/users/user-4.jpg"
                      alt="user image"
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    />
                    <img
                      src="/users/user-5.jpg"
                      alt="user image"
                      className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                    />
                  </div>
                  <div className="flex flex-col justify-between items-center sm:items-start">
                    <div className="flex gep-0 5">
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                    </div>
                    <p>
                      <span className="font-semibold">
                        <NumberTicker value={1250} />
                      </span>{" "}
                      happy customers
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>

          <BlurFade delay={delay * 4} inView>
            <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mt-5 lg:mx-0 h-fit">
              <div className="relative md:max-w-xl">
                <img
                  alt=""
                  src="/your-image.png"
                  className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateY(-30deg) rotateX(15deg)",
                  }}
                />
                <img
                  alt=""
                  src="/line.png"
                  className="absolute w-[8rem] -left-12 -bottom-6 select-none"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateY(-30deg) rotateX(15deg)",
                  }}
                />
                <FloatingPhone>
                  <Phone
                    className="w-64"
                    imgSrc="/testimonials/1.jpg"
                    noEdges
                  />
                </FloatingPhone>
              </div>
            </div>
          </BlurFade>
        </MaxWidthWrapper>
      </section>
      <section className="py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <BlurFade delay={delay} inView>
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-grey-900">
                What our{" "}
                <span className="relative px-2">
                  customers
                  <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
                </span>{" "}
                say
              </h2>
            </BlurFade>
            <BlurFade delay={delay * 2} inView>
              <img
                src="/snake-2.png"
                alt="snake"
                className="w-24 order-0 lg:order-2"
              />
            </BlurFade>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <BlurFade delay={delay * 3} inView>
                <div className="flex gap-0.5 mb-2">
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                </div>
              </BlurFade>
              <BlurFade delay={delay * 4} inView>
                <div className="text-lg leading-8">
                  <p>
                    &quot;the case feels durable and I even got a compliment on
                    the design. Had the case for two and half months now and{" "}
                    <Highlight className="px-1 py-0.5">
                      the image is super clear
                    </Highlight>
                    , on the case I had before, the image started fading into
                    yellow color after a couple weeks. Love it.&quot;
                  </p>
                </div>
              </BlurFade>
              <BlurFade delay={delay * 5} inView>
                <div className="flex gap-4 mt-2">
                  <img
                    src="/users/user-1.png"
                    alt="user image"
                    className="object-cover h-12 w-12 rounded-full ring-2 ring-slate-100"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">Jonathan</p>
                    <div className="flex gap-1.5 items-center text-zinc-600">
                      <Check className="w-4 h-4 stroke-[3px] text-green-600" />
                      <p className="text-sm">Verified Purchase</p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>

            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <BlurFade delay={delay * 3} inView>
                <div className="flex gap-0.5 mb-2">
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                </div>
              </BlurFade>
              <BlurFade delay={delay * 4} inView>
                <div className="text-lg leading-8">
                  <p>
                    &quot;I usually keep my phone together with my keys in my
                    pocket and that led to some pretty heavy scratchmarks on all
                    of my last phone cases. this one, besides a barely
                    noticeable scratch on the corner,
                    <Highlight className="px-1 py-0.5">
                      looks brand new after half a year
                    </Highlight>
                    . I dig it.&quot;
                  </p>
                </div>
              </BlurFade>
              <BlurFade delay={delay * 5} inView>
                <div className="flex gap-4 mt-2">
                  <img
                    src="/users/user-4.jpg"
                    alt="user image"
                    className="object-cover h-12 w-12 rounded-full ring-2 ring-slate-100"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">Thom</p>
                    <div className="flex gap-1.5 items-center text-zinc-600">
                      <Check className="w-4 h-4 stroke-[3px] text-green-600" />
                      <p className="text-sm">Verified Purchase</p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>
      <section>
        <MaxWidthWrapper className="py-24">
          <BlurFade delay={delay} inView>
            <div className="mb-12 px-6 lg:px-8">
              <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-grey-900">
                  Upload your photo and get{" "}
                  <span className="relative px-2 text-white bg-green-600">
                    your own case
                  </span>{" "}
                  now
                </h2>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={delay * 2} inView>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
                <img
                  src="arrow.png"
                  alt="arrow"
                  className="absolute top-[25rem] mid:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
                />
                <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-grey-900/5 ring-inset ring-grey-900/10 lg:rounded-2xl">
                  <img
                    src="/horse.jpg"
                    className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                    alt=""
                  />
                </div>
                <Phone className="w-60" imgSrc="/horse_phone.jpg" />
              </div>
            </div>
          </BlurFade>
          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <BlurFade delay={delay} inView>
              <li className="w-fit">
                <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                High-quality silicone material
              </li>
            </BlurFade>
            <BlurFade delay={delay * 2} inView>
              <li className="w-fit">
                <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                Scratch- and fingerprint resistant coating
              </li>
            </BlurFade>
            <BlurFade delay={delay * 3} inView>
              <li className="w-fit">
                <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                Wireless charging compatible
              </li>
            </BlurFade>
            <BlurFade delay={delay * 4} inView>
              <li className="w-fit">
                <Check className="h-5 w-5 text-green-600 inline mr-1.5" />5 year
                print warranty
              </li>
            </BlurFade>
            <BlurFade delay={delay} inView>
              <div className="flex justify-center">
                <Link
                  className={buttonVariants({
                    variant: "shimmer",
                    size: "lg",
                    className: "mx-auto mt-8 group bg-primary",
                  })}
                  href="/configure/upload"
                >
                  <span className="inline-flex items-center justify-center">
                    <span>Create your case now</span>
                    <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </BlurFade>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
