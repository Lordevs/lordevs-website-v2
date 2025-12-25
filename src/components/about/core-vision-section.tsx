'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

// Card border positions
type BorderPos = 'top' | 'right' | 'bottom' | 'left';

interface CoreVisionCardProps {
  icon: string;
  title: string;
  description: string;
  borderPos: BorderPos;
  index?: number;
}

function CoreVisionCard({
  icon,
  title,
  description,
  index,
}: CoreVisionCardProps) {
  // Determine border styles based on position
  const borderStyles = {
    br: 'md:rounded-br-none',
    bl: 'md:rounded-bl-none',
    tr: 'md:rounded-tr-none',
    tl: 'md:rounded-tl-none',
  };
  const borderPos =
    index === 0 ? 'br' : index === 1 ? 'bl' : index === 2 ? 'tr' : 'tl';
  const borderClass = borderStyles[borderPos as keyof typeof borderStyles];

  return (
    <div
      className={cn(
        'relative rounded-lg bg-[#202020CC] p-4 md:p-6',
        borderClass
      )}
    >
      {/* Icon + Title + Desc */}
      <div className="flex items-center space-x-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full md:h-18 md:w-18">
          <Image src={icon} alt="" width={70} height={70} />
        </div>
        <h3 className="text-xl font-medium text-[#FFFFFFDE] md:text-3xl">
          {title}
        </h3>
      </div>
      <p className="mt-6 text-left text-lg leading-relaxed text-white">
        {description}
      </p>
    </div>
  );
}

export function CoreVisionSection() {
  const [selected, setSelected] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Auto-hide swipe hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setSelected((prev) => (prev + 1) % 4);
    setShowSwipeHint(false); // Hide hint when user interacts
  };

  const prevSlide = () => {
    setSelected((prev) => (prev - 1 + 4) % 4);
    setShowSwipeHint(false); // Hide hint when user interacts
  };

  // Handle drag end for touch gestures
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } }
  ) => {
    const SWIPE_THRESHOLD = 50;

    setShowSwipeHint(false); // Hide hint when user swipes

    if (info.offset.x > SWIPE_THRESHOLD) {
      // Swiped right - go to previous slide
      prevSlide();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      // Swiped left - go to next slide
      nextSlide();
    }
  };

  const cards = [
    {
      icon: '/icons/intelligent-icon.svg',
      title: 'Intelligent Solutions',
      description:
        'We craft AI-driven systems that go beyond automation — delivering decision-making capabilities, predictive insights, and adaptive learning to solve real-world challenges.',
      borderPos: 'bottom' as BorderPos,
    },
    {
      icon: '/icons/scale-icon.svg',
      title: 'Scalable Innovation',
      description:
        'From startups to enterprises, our solutions are built to scale. We use modular architectures and cloud-native technologies to grow alongside your business needs.',
      borderPos: 'left' as BorderPos,
    },
    {
      icon: '/icons/client-icon.svg',
      title: 'Client-Centric Approach',
      description:
        'We collaborate closely with clients at every stage — from discovery to deployment — ensuring every AI product is aligned with your goals and ready for real-world performance.',
      borderPos: 'right' as BorderPos,
    },
    {
      icon: '/icons/responsible-icon.svg',
      title: 'Responsible AI',
      description:
        'Our commitment to ethical AI means every system we build is secure, fair, and transparent — designed to protect user data and uphold trust in every interaction.',
      borderPos: 'top' as BorderPos,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl bg-black py-10 md:py-20">
      <div className="container mx-auto space-y-4 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl font-medium text-white md:text-5xl"
        >
          Our Core Vision
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-3xl text-base text-[#B2B2B2] md:text-2xl"
        >
          Driving digital transformation through practical, performance-driven
          AI.
        </motion.p>

        {/* Desktop View - Grid Layout */}
        <div className="relative mt-12 hidden grid-cols-1 gap-2 md:grid md:grid-cols-2 md:gap-1">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative z-10"
            >
              <CoreVisionCard {...card} index={idx} />
            </motion.div>
          ))}

          <div className="absolute top-2 bottom-2 left-1/2 hidden w-1 -translate-x-1/2 rounded-lg bg-gradient-to-b from-[#00B1FE] to-[#504EFF] md:block" />
          <div className="absolute top-1/2 right-2 left-2 hidden h-1 -translate-y-1/2 rounded-lg bg-gradient-to-r from-[#00B1FE] to-[#504EFF] md:block" />
          <div className="absolute top-1/4 left-3/4 -z-[0] h-[282px] w-[282px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-r from-[#00B1FE] to-[#504EFF] blur-[84px]" />
        </div>

        {/* Mobile View - Carousel */}
        <div className="mt-12 md:hidden">
          {/* Swipe Hint */}
          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-4 text-center"
              >
                <p className="text-sm text-gray-400">
                  Swipe left or right to navigate
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Carousel Content */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                className="relative select-none"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                dragElastic={0.2}
                style={{ cursor: 'grab' }}
                whileDrag={{ cursor: 'grabbing', scale: 0.95 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative rounded-lg bg-[#202020CC] p-6">
                  {/* Icon + Title */}
                  <div className="mb-6 flex items-center space-x-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full">
                      <Image
                        src={cards[selected].icon}
                        alt=""
                        width={70}
                        height={70}
                      />
                    </div>
                    <h3 className="text-xl font-medium text-[#FFFFFFDE]">
                      {cards[selected].title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-left text-lg leading-relaxed text-white">
                    {cards[selected].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <motion.button
              onClick={prevSlide}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D0D12] text-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <div className="flex space-x-2">
              {cards.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all',
                    selected === idx
                      ? 'bg-gradient-to-r from-[#00B2FF] to-[#8F00FF]'
                      : 'bg-gray-600'
                  )}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D0D12] text-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
