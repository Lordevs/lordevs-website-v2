'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function AboutHeroSection() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-20 md:min-h-screen">
      {/* Enhanced Background with Gradient Dots */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Main background image */}
        <Image
          src="./images/backgrounds/home/hero-bg.svg"
          alt=""
          fill
          className="object-cover opacity-70"
          priority
        />
        {/* Large blue gradient */}
        <div
          className="absolute right-1/12 -bottom-6/12 aspect-video w-[900px]"
          style={{
            background:
              'radial-gradient(circle, #4742B6 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
            filter: 'blur(132px)',
          }}
        />

        {/* Orange gradient */}
        <div
          className="absolute -bottom-6/12 aspect-video w-[900px]"
          style={{
            background:
              'radial-gradient(circle, #8F403E 0%, rgba(249, 115, 22, 0.2) 30%, rgba(249, 115, 22, 0.1) 50%, transparent 70%)',
            filter: 'blur(103px)',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="mx-auto max-w-6xl text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mb-6 text-4xl leading-tight font-bold md:text-[64px]"
          >
            Pioneering{' '}
            <span className="bg-gradient-to-r from-[#00B2FF] to-[#8F00FF] bg-clip-text text-transparent">
              AI Innovation{' '}
            </span>
            <br />
            with Revolution!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mx-auto mb-8 max-w-4xl text-lg text-gray-300 md:text-2xl"
          >
            Lordev is your trusted agency for creative strategy. We specialize
            in cutting-edge digital business solutions.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="my-16"
          >
            <Link href="/contact">
              <Button
                variant="gradient"
                className="cursor-pointer px-8 py-4 text-base font-semibold md:px-16 md:py-6 md:text-xl"
              >
                Schedule a Call
                <span>
                  <ArrowRight className="size-6" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
