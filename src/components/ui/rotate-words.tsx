"use client";

import { use, useEffect, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"h1">;
  className?: string;
  style?: React.CSSProperties;
}

export default function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
  style,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div
      className="overflow-hidden py-2 inline-flex items-center justify-center"
      style={style}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={words[index]}
          className={cn(className, "")}
          {...framerProps}
        >
          {words[index].split("").map((letter, index) => (
            <motion.span
              key={words[index] + index}
              initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
              }}
              className="w-[1ch] mono"
            >
              {letter}
            </motion.span>
          ))}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
