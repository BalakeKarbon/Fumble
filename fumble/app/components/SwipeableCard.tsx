"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState } from "react";

interface SwipeableCardProps {
  children: React.ReactNode;
  onLike?: () => void;
  threshold?: number;
}

export default function SwipeableCard({ children, onLike, threshold = 150 }: SwipeableCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-5, 5]);
  const opacity = useTransform(x, [150, 300], [1, 0]); // Fade out on strong right swipe

  // Like Overlay Opacity
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
    // Vibratic feedback on start (Pattern: 10ms)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x > threshold) {
      // Swiped Right (Like)
      // Trigger valid swipe haptic
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(20);
      }
      if (onLike) onLike();
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 300 }}
      dragElastic={0.1} // Resistance feel
      // Prevent accidental scrolling while swiping horizontally
      dragDirectionLock
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="relative touch-pan-y cursor-grab active:cursor-grabbing w-full"
      whileTap={{ scale: 1.02 }}
    >
      {/* Like Overlay Indicator */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-4 left-4 z-10 pointer-events-none"
      >
        <span className="text-4xl font-bold text-green-500 bg-white/80 border-4 border-green-500 rounded-lg px-2 -rotate-12 inline-block">
          LIKE
        </span>
      </motion.div>

      {children}
    </motion.div>
  );
}
