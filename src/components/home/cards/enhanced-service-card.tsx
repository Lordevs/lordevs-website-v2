'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send, TrendingUp } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { ShineBorder } from '@/components/magicui/shine-border';

interface ServiceCardProps {
  title: string;
  description: string;
  mockupType: 'chat' | 'dashboard' | 'erp' | 'workflow';
  animationDelay?: number;
}

export function EnhancedServiceCard({
  title,
  description,
  mockupType,
  animationDelay = 0,
}: ServiceCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMockupContent = () => {
    switch (mockupType) {
      case 'chat':
        return (
          <div className="relative h-48">
            {/* Message bubbles */}
            <div className="mb-16 space-y-3">
              {/* AI message with profile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start justify-start space-x-2"
              >
                <div className="h-8 w-8 flex-shrink-0 rounded-md bg-[#292929]" />
                <div className="w-full rounded-md bg-[#292929] p-2">
                  <div className="mb-1 h-1 w-20 rounded bg-[#C2C2C2]" />
                  <div className="mt-2 flex flex-col space-y-1.5">
                    <div className="flex space-x-3">
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                    </div>
                    <div className="flex space-x-3">
                      <div className="h-0.5 w-1/2 rounded bg-[#4B4B4B]" />
                      <div className="h-0.5 w-1/2 rounded bg-[#4B4B4B]" />
                    </div>
                    <div className="mb-1 flex space-x-3">
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* User message with profile */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start justify-end space-x-2"
              >
                <div className="w-full rounded-md bg-[#292929] p-2">
                  <div className="mb-1 h-1 w-20 rounded bg-[#C2C2C2]" />
                  <div className="mt-2 flex flex-col space-y-1.5">
                    <div className="flex space-x-3">
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                    </div>
                    <div className="flex space-x-3">
                      <div className="h-0.5 w-1/2 rounded bg-[#4B4B4B]" />
                      <div className="h-0.5 w-1/2 rounded bg-[#4B4B4B]" />
                    </div>
                    <div className="mb-1 flex space-x-3">
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                      <div className="h-1 w-1/3 rounded bg-[#4B4B4B]" />
                    </div>
                  </div>
                </div>
                <div className="h-8 w-8 flex-shrink-0 rounded-md bg-[#292929]" />
              </motion.div>
            </div>

            {/* Input field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute right-0 bottom-0 left-0"
            >
              <div className="flex items-center justify-between bg-[#3B3B3B] px-3 py-3.5">
                <span className="text-xs text-[#A6A6A6]">
                  Ask me anything...
                </span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-md bg-[#232828] p-1"
                >
                  <Send size={10} className="text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        );

      case 'dashboard':
        return (
          <div
            className="relative h-48 overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-black/80 p-4"
            style={{
              borderImage:
                'linear-gradient(165.12deg, #D0D0D0 10.42%, rgba(207, 207, 207, 0.2) 50%, #D0D0D0 89.58%) 1',
            }}
          >
            {/* Revenue Goal Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="rounded-lg bg-gray-800/60 p-3">
                <h4 className="mb-2 text-sm font-medium text-white">
                  Revenue Goal
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-blue-400">
                        Sales Trend: 11,321
                      </span>
                      <svg
                        width="20"
                        height="12"
                        viewBox="0 0 20 12"
                        className="text-blue-400"
                      >
                        <motion.path
                          d="M2,10 Q6,8 10,6 T18,2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ delay: 0.4, duration: 1 }}
                        />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-white/60">
                        Average Profit: 11,540
                      </span>
                      <svg
                        width="20"
                        height="12"
                        viewBox="0 0 20 12"
                        className="text-blue-400"
                      >
                        <motion.path
                          d="M2,8 Q6,6 10,4 T18,3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ delay: 0.6, duration: 1 }}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring' }}
                      className="h-16 w-16"
                    >
                      <svg
                        className="h-16 w-16 -rotate-90 transform"
                        viewBox="0 0 36 36"
                      >
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="3"
                        />
                        <motion.path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="75, 100"
                          initial={{ strokeDasharray: '0, 100' }}
                          whileInView={{ strokeDasharray: '75, 100' }}
                          transition={{ delay: 0.6, duration: 1.2 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          2462.5K
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom section */}
            <div className="flex space-x-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex-1 rounded-lg bg-gray-800/60 p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    Net Profit
                  </span>
                  <TrendingUp size={12} className="text-blue-400" />
                </div>
                <div className="mb-2 text-sm text-white">$ 12,009</div>

                <div className="relative h-6">
                  <svg className="h-full w-full" viewBox="0 0 80 24">
                    <motion.path
                      d="M2,20 Q20,16 30,12 T50,8 T78,4"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ delay: 0.8, duration: 1.5 }}
                    />
                    <motion.circle
                      cx="50"
                      cy="8"
                      r="2"
                      fill="#3B82F6"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 1.2 }}
                    />
                  </svg>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-800/60"
              >
                <div className="text-2xl text-orange-500">✱</div>
              </motion.div>
            </div>
          </div>
        );

      case 'erp':
        return (
          <div
            className="relative h-48 overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-black/80 p-4"
            style={{
              borderImage:
                'linear-gradient(165.12deg, #D0D0D0 10.42%, rgba(207, 207, 207, 0.2) 50%, #D0D0D0 89.58%) 1',
            }}
          >
            {/* Tab navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex space-x-3"
            >
              <div className="rounded-md bg-gray-700/60 px-3 py-2 text-xs font-medium text-white">
                ERP
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-blue-600/80 px-3 py-2 text-xs font-medium text-white">
                <div className="h-3 w-3 rounded-sm bg-blue-400"></div>
                <span>Finance</span>
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-orange-600/80 px-3 py-2 text-xs font-medium text-white">
                <div className="h-3 w-3 rounded-sm bg-orange-400"></div>
                <span>Inventory</span>
              </div>
            </motion.div>

            {/* Bar chart with glow effects */}
            <div className="flex h-20 items-end justify-center space-x-8">
              {[
                {
                  height: 'h-16',
                  label: '60%',
                  delay: 0.4,
                  glowColor: 'shadow-purple-500/50',
                },
                {
                  height: 'h-12',
                  label: '45%',
                  delay: 0.6,
                  glowColor: 'shadow-purple-500/50',
                },
                {
                  height: 'h-20',
                  label: '80%',
                  delay: 0.8,
                  glowColor: 'shadow-purple-500/50',
                },
              ].map((bar, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                >
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: bar.delay, duration: 0.8 }}
                    className={`w-8 ${bar.height} origin-bottom rounded-lg bg-gradient-to-t from-purple-600 to-purple-400 shadow-lg ${bar.glowColor}`}
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: bar.delay + 0.3 }}
                    className="rounded bg-gray-800/60 px-2 py-1 text-xs font-medium text-white"
                  >
                    {bar.label}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'workflow':
        return (
          <div
            className="relative h-48 overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-gray-800/80 via-purple-900/50 to-black/80 p-4"
            style={{
              borderImage:
                'linear-gradient(165.12deg, #D0D0D0 10.42%, rgba(207, 207, 207, 0.2) 50%, #D0D0D0 89.58%) 1',
            }}
          >
            <div className="relative flex h-full items-center justify-center">
              {/* Left side icons */}
              <div className="absolute left-4 flex flex-col space-y-4">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex h-8 w-8 items-center justify-center rounded bg-blue-600"
                >
                  <span className="text-sm text-white">📄</span>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex h-8 w-8 items-center justify-center rounded bg-green-600"
                >
                  <span className="text-sm text-white">💬</span>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="flex h-8 w-8 items-center justify-center rounded bg-orange-600"
                >
                  <span className="text-sm text-white">👤</span>
                </motion.div>
              </div>

              {/* Central AI node with labels */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="relative flex flex-col items-center"
              >
                <div className="mb-2 rounded-full bg-black/80 px-3 py-1 text-xs text-white">
                  Queries
                </div>
                <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                  AI
                </div>
                <div className="mt-2 rounded-full bg-black/80 px-3 py-1 text-xs text-white">
                  Automation
                </div>
              </motion.div>

              {/* Right side icons */}
              <div className="absolute right-4 flex flex-col space-y-4">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex h-8 w-8 items-center justify-center rounded bg-green-600"
                >
                  <span className="text-sm text-white">✓</span>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="flex h-8 w-8 items-center justify-center rounded bg-red-600"
                >
                  <span className="text-sm text-white">📧</span>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="flex h-8 w-8 items-center justify-center rounded bg-orange-600"
                >
                  <span className="text-lg text-orange-500">✱</span>
                </motion.div>
              </div>

              {/* Connection lines */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full">
                {/* Left connections */}
                <motion.path
                  d="M60 60 L100 80"
                  stroke="#6366F1"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2,2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
                <motion.path
                  d="M60 100 L100 80"
                  stroke="#6366F1"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2,2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                />
                <motion.path
                  d="M60 140 L100 80"
                  stroke="#6366F1"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2,2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                />

                {/* Right connections */}
                <motion.path
                  d="M140 80 L180 60"
                  stroke="#6366F1"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2,2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                />
                <motion.path
                  d="M140 80 L180 100"
                  stroke="#6366F1"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2,2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                />
                <motion.path
                  d="M140 80 L180 140"
                  stroke="#6366F1"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2,2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 1.7, duration: 0.8 }}
                />
              </svg>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getServiceImage = () => {
    switch (mockupType) {
      case 'chat':
        return (
          <div className="relative h-48 w-full md:h-56">
            <Image src="/images/services/service-1.png" alt="" fill />
          </div>
        );
      case 'dashboard':
        return (
          <div className="relative h-48 md:h-56">
            <Image src="/images/services/service-2.png" alt="" fill />
          </div>
        );
      case 'erp':
        return (
          <div className="relative h-48 md:h-56">
            <Image src="/images/services/service-3.png" alt="" fill />
          </div>
        );
      case 'workflow':
        return (
          <div className="relative h-48 md:h-56">
            <Image src="/images/services/service-4.png" alt="" fill />
          </div>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, delay: animationDelay }}
      viewport={{ once: true }}
      className="group h-full cursor-pointer"
    >
      {/* background: radial-gradient(59% 61% at 15.8% 14.3%, #000000 0%, #0D0D12 100%);
       */}
      <Card
        className="relative z-10 flex w-full flex-col gap-0 overflow-hidden rounded-[35px] border-2 border-transparent bg-[#181A20] py-0 shadow-lg transition-all duration-300 hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.5)] md:h-full"
        style={{
          background:
            'radial-gradient(59% 61% at 15.8% 14.3%, #000000 0%, #000000 100%)',
        }}
      >
        <ShineBorder
          shineColor={['#00B2FF', '#cfcfcf33', '#8F00FF', '#cfcfcf33']}
          borderWidth={2}
          className="z-10"
        />
        <div>{getServiceImage()}</div>
        <div className="p-6 md:p-11 md:pt-6">
          {/* <div className="mb-6">{getMockupContent()}</div> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-xl font-medium text-white transition-colors duration-300 group-hover:text-[#41A2F8] md:text-3xl">
              {title}
            </h3>
            <p className="text-[#AEAEB2] transition-colors duration-300 group-hover:text-gray-300 md:text-xl md:leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
