import { motion } from "framer-motion";
interface FloatingPhoneProps {
  children: React.ReactNode;
}

export const FloatingPhone = ({ children }: FloatingPhoneProps) => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(-30deg) rotateX(15deg)",
      }}
      className="rounded-[50px] bg-green-500"
    >
      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className="relative rounded-[50px]"
      >
        {children}
      </motion.div>
    </div>
  );
};
