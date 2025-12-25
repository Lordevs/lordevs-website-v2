import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import SectionBagde from "../common/section-badge";
import { TiltCard } from "../common/tilt-card";
import { Separator } from "../ui/separator";

const EXPERTISES = [
  {
    name: "Web Applications",
    tags: ["Automation", "Scalable"],
    desc: "We build fast, scalable, and modern web applications tailored to your business needs. From sleek frontends to powerful backends, our solutions are crafted to deliver seamless performance and exceptional user experiences across all devices.",
    bullets: [
      "Fully responsive for desktop, tablet, and mobile",
      "Optimized and smooth UI/UX",
      "SEO-optimized and performance-tuned",
      "Long term support",
    ],
    image: "/images/expertise/web-apps.svg",
    icon: {
      src: "/icons/laptop.svg",
      width: 40,
      height: 40,
    },
  },
  {
    name: "Mobile Apps",
    tags: ["Cross-Platform", "User-Centric"],
    desc: "We craft high-performance, user-friendly mobile applications that deliver seamless experiences across Android and iOS. Built with modern frameworks, our apps are designed to scale and engage users effectively.",
    bullets: [
      "Cross-platform development",
      "Optimized for performance and smooth UX",
      "Deployment support",
      "Scalable architecture with secure backend APIs",
    ],
    image: "/images/expertise/mobile-apps.svg",
    icon: {
      src: "/icons/mobile.svg",
      width: 25,
      height: 40,
    },
  },
  {
    name: "No-Code",
    tags: ["Low Maintenance", "Fast Delivery"],
    desc: "We build powerful, functional applications using modern no-code tools—perfect for MVPs, dashboards, and internal tools. Our no-code solutions are fast to deploy, easy to manage, and scalable as your needs grow.",
    bullets: [
      "Cost Effective Solution",
      "Fast Delivery",
      "SEO-optimized and performance-tuned",
      "Customized User Interface",
    ],
    image: "/images/expertise/no-code.svg",
    icon: {
      src: "/icons/no-code.svg",
      width: 28,
      height: 39,
    },
  },
  {
    name: "SaaS Products",
    tags: ["Modular", "Scalable"],
    desc: "We design and develop scalable SaaS platforms with robust functionality, modern interfaces, and flexible user management. From user onboarding to analytics, our SaaS solutions are built to grow with your business.",
    bullets: [
      "Subscription models with billing integration",
      "Role-based access and multi-user support",
      "Admin dashboards with real-time metrics",
      "Secure authentication and user management",
    ],
    image: "/images/expertise/saas-products.svg",
    icon: {
      src: "/icons/devices.svg",
      width: 40,
      height: 30,
    },
  },
  {
    name: "AI Tools",
    tags: ["Automation", "Personalized UX"],
    desc: "We create intelligent tools that leverage AI to automate processes, deliver personalized experiences, and drive smarter decision-making. Our AI-powered solutions are built to seamlessly integrate with your applications and elevate user engagement.",
    bullets: [
      "NLP and AI Chatbots",
      "Intelligent document review and generation",
      "Smart automation for workflows and operations",
      "Real-time personalization",
    ],
    image: "/images/expertise/ai-tools.svg",
    icon: {
      src: "/icons/magic-wand.svg",
      width: 38,
      height: 34,
    },
  },
];

export function ExpertiseSection() {
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
    setSelected((prev) => (prev + 1) % EXPERTISES.length);
    setShowSwipeHint(false); // Hide hint when user interacts
  };

  const prevSlide = () => {
    setSelected((prev) => (prev - 1 + EXPERTISES.length) % EXPERTISES.length);
    setShowSwipeHint(false); // Hide hint when user interacts
  };

  // Handle drag end for touch gestures
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
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

  return (
    <section className="overflow-hidden py-10 md:py-20">
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10 text-center md:mb-24">
          <SectionBagde name="Expertise" />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mb-4 max-w-3xl text-3xl leading-14 font-bold md:text-5xl">
            What We Build
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-lg text-[#B2B2B2] md:text-2xl">
            Explore the range of platforms we design and develop, tailored for
            performance, scalability, and user experience.
          </motion.p>
        </div>

        {/* Desktop View - Tab Style */}
        <div className="mx-auto hidden max-w-6xl flex-col items-stretch gap-8 md:flex md:flex-row">
          {/* Left: Expertise List */}
          <div className="grid w-full grid-cols-2 gap-4 md:flex md:max-w-[425px] md:flex-col">
            {EXPERTISES.map((exp, idx) => (
              <div key={exp.name} className="relative">
                <motion.button
                  onClick={() => setSelected(idx)}
                  className={`group relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border border-transparent bg-linear-to-l from-[#202020]/50 to-[#23242F]/50 px-4 py-3 text-left text-sm font-medium text-[#959595] shadow-md transition-all duration-300 hover:shadow-blue-500/30 md:gap-16 md:px-6 md:py-5 md:text-[28px] ${
                    selected === idx ? "text-[#F8F8F8]" : "text-[#B2B2B2]"
                  } `}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <div className="flex h-8 w-8 items-center justify-center md:h-12 md:w-12">
                    <img
                      src={exp.icon.src}
                      alt=""
                      width={exp.icon.width}
                      height={exp.icon.height}
                    />
                  </div>
                  <span className="w-full md:w-auto">{exp.name}</span>
                </motion.button>
                {selected === idx && (
                  <>
                    <motion.div
                      layoutId="glow"
                      className="absolute top-1/2 -right-3 z-[-1] h-[30] w-[30px] -translate-y-1/2 rounded-2xl bg-[#8F00FF] blur-[15px] md:h-[50px] md:w-[50px]"
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      layoutId="glow2"
                      className="absolute top-1/4 right-5 z-[-2] h-[30] w-[30px] -translate-y-1/4 rounded-2xl bg-linear-to-r from-[#00B1FE] to-[#504EFF] blur-[15px] md:h-[50px] md:w-[50px]"
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      layoutId="glow3"
                      className="absolute top-1/2 left-5 z-[-1] h-[30] w-[30px] -translate-y-1/2 rounded-2xl bg-[#8F00FF] blur-[15px] md:h-[50px] md:w-[50px]"
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      layoutId="glow4"
                      className="absolute top-1/4 -left-3 z-[-2] h-[30] w-[30px] -translate-y-1/4 rounded-2xl bg-linear-to-r from-[#00B1FE] to-[#504EFF] blur-[15px] md:h-[50px] md:w-[50px]"
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Right: Expertise Details */}
          <div className="h-full min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <TiltCard>
                <motion.div
                  key={EXPERTISES[selected].name}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                  }}
                  className="relative h-full min-h-[510px] gap-8 overflow-hidden rounded-2xl border border-blue-500/10 p-4 shadow-lg hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.5)]"
                  style={{
                    background:
                      "radial-gradient(43% 50% at 50% 50%, rgba(15, 9, 18, 0.15) 0%, #0C0912 100%)",
                    backgroundImage: [
                      "radial-gradient(circle at 50% 50%, #000000, #0D0D12)",
                      "linear-gradient(111.94deg, #363636 86.94%, #FFFFFF 99.79%)",
                    ].join(","),
                    backgroundOrigin: "padding-box, border-box",
                    backgroundClip: "padding-box, border-box",
                  }}>
                  <div className="absolute top-[-90px] -right-20 h-[205px] w-[448px] bg-linear-to-r from-[#00B1FE] to-[#504EFF] opacity-30 blur-[103.4px]" />

                  {/* Header */}
                  <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                    <h3 className="mb-4 text-3xl font-medium text-white md:mb-2 md:text-[52px]">
                      {EXPERTISES[selected].name}
                    </h3>

                    <div className="flex flex-wrap gap-4">
                      {EXPERTISES[selected].tags.map((tag, index) => (
                        <div
                          key={index}
                          className="relative inline-block rounded-full bg-linear-to-l from-[#202020] from-[20.61%] to-[#FFFFFF] p-px">
                          <div className="relative z-10 rounded-full bg-[#000000] px-5 py-1 text-xs md:text-base">
                            <div
                              style={{
                                background:
                                  "radial-gradient(65.65% 45.65% at 50.59% 69.57%, #FFFFFF 0%, #B8B8B8 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}>
                              {tag}
                            </div>
                          </div>
                          <span
                            className={cn(
                              "absolute top-1/2 z-0 h-6 w-6 -translate-y-1/2 transform rounded-full",
                              "bg-linear-to-r",
                              index % 2 === 0
                                ? "-left-1 from-[#00B2FF]"
                                : "-left-3 from-[##8F00FF]",
                              "to-[#504EFF] blur-sm"
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="mt-6 mb-6 h-px bg-linear-to-r from-[#FFFFFF05] via-[#FFFFFF1A] to-[#FFFFFF05] md:mt-0" />

                  <div className="flex flex-col-reverse md:flex-row">
                    {/* Description and Bullets */}
                    <div className="mt-4 flex flex-1 flex-col justify-start gap-4">
                      <p className="mb-4 max-w-xs text-xs text-white md:text-base">
                        {EXPERTISES[selected].desc}
                      </p>
                      <ul className="mb-2 space-y-2">
                        {EXPERTISES[selected].bullets.map((b, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2">
                            <img
                              src="/icons/check-icon.svg"
                              alt=""
                              width={16}
                              height={16}
                              className="h-5 w-5 md:h-6 md:w-6"
                            />
                            <span className="text-sm text-white md:text-base">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Illustration/Image */}
                    <div className="flex w-full items-center justify-center md:w-72">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="relative h-48 w-full md:h-72">
                        <img
                          src={EXPERTISES[selected].image}
                          alt={EXPERTISES[selected].name}
                          className="h-full w-full rounded-xl object-contain"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile View - Carousel */}
        <div className="px-2 md:hidden">
          {/* Swipe Hint */}
          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-4 text-center">
                <p className="text-sm text-gray-400">
                  Swipe left or right to explore our expertise
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
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="relative select-none"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                dragElastic={0.2}
                style={{ cursor: "grab" }}
                whileDrag={{ cursor: "grabbing", scale: 0.95 }}
                whileTap={{ scale: 0.98 }}>
                <TiltCard>
                  <div
                    className="relative min-h-[500px] overflow-hidden rounded-2xl border border-blue-500/10 p-6 shadow-lg"
                    style={{
                      background:
                        "radial-gradient(43% 50% at 50% 50%, rgba(15, 9, 18, 0.15) 0%, #0C0912 100%)",
                      backgroundImage: [
                        "radial-gradient(circle at 50% 50%, #000000, #0D0D12)",
                        "linear-gradient(111.94deg, #363636 86.94%, #FFFFFF 99.79%)",
                      ].join(","),
                      backgroundOrigin: "padding-box, border-box",
                      backgroundClip: "padding-box, border-box",
                    }}>
                    <div className="absolute top-[-90px] -right-20 h-[205px] w-[448px] bg-linear-to-r from-[#00B1FE] to-[#504EFF] opacity-30 blur-[103.4px]" />

                    {/* Header */}
                    <div className="mb-6">
                      <div className="mb-4 flex items-center gap-3">
                        <h3 className="text-2xl font-medium text-white">
                          {EXPERTISES[selected].name}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {EXPERTISES[selected].tags.map((tag, index) => (
                          <div
                            key={index}
                            className="relative inline-block rounded-full bg-linear-to-l from-[#202020] from-[20.61%] to-[#FFFFFF] p-px">
                            <div className="relative z-10 rounded-full bg-[#000000] px-3 py-1 text-xs">
                              <div
                                style={{
                                  background:
                                    "radial-gradient(65.65% 45.65% at 50.59% 69.57%, #FFFFFF 0%, #B8B8B8 100%)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }}>
                                {tag}
                              </div>
                            </div>
                            <span
                              className={cn(
                                "absolute top-1/2 z-0 h-4 w-4 -translate-y-1/2 transform rounded-full",
                                "bg-linear-to-r",
                                index % 2 === 0
                                  ? "-left-1 from-[#00B2FF]"
                                  : "-left-2 from-[##8F00FF]",
                                "to-[#504EFF] blur-sm"
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="mb-6 h-px bg-linear-to-r from-[#FFFFFF05] via-[#FFFFFF1A] to-[#FFFFFF05]" />

                    <div className="flex flex-col gap-6">
                      {/* Illustration */}
                      <div className="flex justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5 }}
                          className="relative h-32 w-full max-w-xs">
                          <img
                            src={EXPERTISES[selected].image}
                            alt={EXPERTISES[selected].name}
                            className="h-full w-full rounded-xl object-contain"
                          />
                        </motion.div>
                      </div>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-white">
                        {EXPERTISES[selected].desc}
                      </p>

                      {/* Bullets */}
                      <ul className="space-y-3">
                        {EXPERTISES[selected].bullets.map((b, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3">
                            <img
                              src="/icons/check-icon.svg"
                              alt=""
                              width={16}
                              height={16}
                              className="mt-0.5 h-4 w-4"
                            />
                            <span className="text-xs text-white md:text-sm">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <motion.button
              onClick={prevSlide}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D0D12] text-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <div className="flex space-x-2">
              {EXPERTISES.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    selected === idx
                      ? "bg-linear-to-r from-[#00B2FF] to-[#8F00FF]"
                      : "bg-gray-600"
                  )}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D0D12] text-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
