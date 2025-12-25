'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTestimonials } from '@/hooks';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import SectionBagde from '../common/section-badge';
import { TiltCard } from './tilt-card';

export function ReviewsSection() {
  const { testimonials } = useTestimonials(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const [slideIndex, setSlideIndex] = useState(3); // start at first real slide
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const visibleCount = 3;
  const maxSlides = testimonials.length;
  const cardWidth = 320;

  // build infinite loop data
  const extendedTestimonials = [
    ...testimonials.slice(-visibleCount),
    ...testimonials,
    ...testimonials.slice(0, visibleCount),
  ];

  const handleNext = useCallback(() => {
    if (isAnimating || maxSlides === 0) return;
    setIsAnimating(true);
    setSlideIndex((idx) => idx + 1);
    setIsAutoPlaying(false);
  }, [isAnimating, maxSlides]);

  // autoplay timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const iv = setInterval(() => handleNext(), 5000);
    return () => clearInterval(iv);
  }, [isAutoPlaying, slideIndex, isAnimating, handleNext]);

  // detect when section scrolls into view
  useEffect(() => {
    const onScroll = () => {
      if (!hasBeenViewed && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setHasBeenViewed(true);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasBeenViewed]);

  const getTranslateX = () => -cardWidth * (slideIndex - 1);

  const handlePrev = () => {
    if (isAnimating || maxSlides === 0) return;
    setIsAnimating(true);
    setSlideIndex((idx) => idx - 1);
    setIsAutoPlaying(false);
  };

  return (
    <section
      className="relative overflow-hidden py-10 md:py-20"
      ref={sectionRef}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 mx-auto max-h-[625px] max-w-[923px]">
        <Image
          src="/images/backgrounds/home/hero-bg.svg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/10 to-black/80" />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <SectionBagde name="Reviews" />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-medium text-white md:text-5xl"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-base text-[#B2B2B2] md:text-2xl"
          >
            Smart inventory, real results. See how Cawar improves efficiency and
            prevents stock issues.
          </motion.p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative mx-auto max-w-6xl">
          <div className="w-full overflow-hidden py-4">
            <motion.div
              className="flex gap-6"
              animate={{ x: getTranslateX() }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onAnimationComplete={() => {
                // If we've moved to the cloned slides, reset instantly to the real slides
                if (slideIndex === 0) {
                  setIsAnimating(false);
                  setSlideIndex(maxSlides);
                } else if (slideIndex === maxSlides + visibleCount) {
                  setIsAnimating(false);
                  setSlideIndex(visibleCount);
                } else {
                  setIsAnimating(false);
                }
              }}
            >
              {extendedTestimonials.map((testimonial, index) => {
                if (index < slideIndex - 3 || index > slideIndex + 2)
                  return null;
                return (
                  <TiltCard key={index + '-' + testimonial.id}>
                    <motion.div
                      className="group w-[300px] flex-shrink-0 cursor-pointer md:w-[360px]"
                      initial={!hasBeenViewed ? { opacity: 0, y: 50 } : false}
                      animate={!hasBeenViewed ? { opacity: 1, y: 0 } : false}
                      transition={
                        !hasBeenViewed
                          ? { duration: 0.6, delay: (index - slideIndex) * 0.1 }
                          : undefined
                      }
                      whileHover={{ y: -5, scale: 1.02 }}
                      onMouseEnter={() => setIsAutoPlaying(false)}
                      onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                      <div
                        className="relative h-full rounded-[20px] p-3 transition-all duration-300 group-hover:shadow-2xl"
                        style={{
                          background:
                            'radial-gradient(circle, #1A1D31 0%, #0D0D12 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div className="rounded-[10px] bg-[#0000008A] p-3">
                          {/* Quote Icon */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.3 + (index - slideIndex) * 0.1,
                              type: 'spring',
                            }}
                            className="mb-4"
                          >
                            <Image
                              src="/icons/quote-icon.svg"
                              alt="Quote Icon"
                              width={24}
                              height={24}
                            />
                          </motion.div>

                          {/* Testimonial Text */}
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: 0.4 + (index - slideIndex) * 0.1,
                            }}
                            className="mb-6 text-base leading-relaxed text-[#D0D0D0] transition-colors duration-300 group-hover:text-white"
                          >
                            &rdquo;{testimonial.content}&rdquo;
                          </motion.p>
                        </div>
                        {/* Author Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.5 + (index - slideIndex) * 0.1,
                          }}
                          className="mt-4 mb-2 flex items-center justify-between px-3"
                        >
                          <div>
                            <h4 className="text-base font-semibold text-[#FFFFFFDE] transition-colors duration-300 group-hover:text-blue-400">
                              {testimonial.name}
                            </h4>
                            <p className="text-base text-[#7B7C8C]">
                              {testimonial.country}
                            </p>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="relative"
                          >
                            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-blue-500/30 transition-colors duration-300 group-hover:border-blue-400">
                              <Image
                                src={
                                  testimonial.image ||
                                  '/images/placeholders/profile.png'
                                }
                                alt={testimonial.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="absolute -inset-1 rounded-full bg-blue-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                          </motion.div>
                        </motion.div>

                        {/* Hover Glow Effect */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </motion.div>
                  </TiltCard>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <div className="mt-12 flex items-center justify-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D0D12] text-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50 hover:text-white"
              disabled={isAnimating}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D0D12] text-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50 hover:text-white"
              disabled={isAnimating}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
