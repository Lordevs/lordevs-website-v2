import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import useMobile from "@/hooks/use-mobile";

export const TiltCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useMobile();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const { left, top, width, height } = (
      ref.current as HTMLDivElement
    ).getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-150, 150], [7, -7]);
  const rotateY = useTransform(mouseX, [-150, 150], [-7, 7]);

  if (isMobile) {
    // On mobile, render without tilt or mouse handlers
    return <div className={`h-full ${className ?? ""}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`h-full ${className ?? ""}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
      <motion.div
        style={{ rotateX, rotateY }}
        className="transform-style-3d h-full">
        {children}
      </motion.div>
    </motion.div>
  );
};
