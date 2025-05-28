// src/components/PageWrapper.tsx
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const pageTransition = {
  duration: 0.15,
  ease: "easeInOut",
};
interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}
const PageWrapper = ({ children, className = "" }: PageWrapperProps) => (
  <motion.div
    className={className}
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

export default PageWrapper;
