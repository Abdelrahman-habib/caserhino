"use client";
import { LucideProps } from "lucide-react";
import { motion } from "framer-motion";
const transition = { duration: 2 };

export const Icons = {
  underline: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 687 155">
      <g
        stroke="currentColor"
        strokeWidth="7"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M20 98c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20"
          opacity=".3"
          initial={{ pathLength: 0 }}
          whileInView={{
            pathLength: 1,
          }}
          viewport={{ once: true }}
          transition={transition}
        ></motion.path>
        <motion.path
          d="M20 118c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20"
          initial={{ pathLength: 0 }}
          whileInView={{
            pathLength: 1,
          }}
          viewport={{ once: true }}
          transition={transition}
        ></motion.path>
      </g>
    </svg>
  ),
};
