import { motion } from "framer-motion";
import { EnhancedServiceCard } from "@/components/home/cards/enhanced-service-card";
import SectionBagde from "../common/section-badge";
import { TiltCard } from "../common/tilt-card";

export function BentoServicesSection() {
    const services = [
        {
            title: "ERP RAG MODELS",
            description:
                "Enhance customer interactions by automating responses with intelligent chatbots, providing seamless service tailored to your business.",
            mockupType: "chat" as const,
            className: "md:col-span-7",
        },
        {
            title: "AI SAAS APPS",
            description:
                "Effortlessly generate high-quality, engaging content tailored to your audience using AI- powered tools.",
            mockupType: "workflow" as const,
            className: "md:col-span-5",
        },
        {
            title: "VIBE CODED APPS",
            description:
                "Effortlessly generate high-quality, engaging content tailored to your audience using AI- powered tools.",
            mockupType: "dashboard" as const,
            className: "md:col-span-4",
        },
        {
            title: "ERP SOLUTIONS",
            description:
                "Empower your teams with centralized task management, real-time collaboration, and intelligent workflows.",
            mockupType: "erp" as const,
            className: "md:col-span-4",
        },
        {
            title: "DEBUGGING & REFACTORING",
            description:
                "Expert debugging and modernization of existing software systems to ensure peak performance and stability.",
            mockupType: "dashboard" as const,
            className: "md:col-span-4",
        },
    ];

    return (
        <section className="overflow-hidden py-10 md:py-20">
            <div className="relative z-10 container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-24 text-center">
                    <SectionBagde name="Services" />

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mx-auto mb-4 max-w-3xl text-3xl font-bold md:text-5xl md:leading-14">
                        Innovative Services for Your{" "}
                        <span className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] bg-clip-text text-transparent">
                            Business
                        </span>{" "}
                        growth
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-sm text-lg text-[#B2B2B2] md:max-w-2xl md:text-2xl">
                        Tailored solutions to streamline, innovate, and grow
                    </motion.p>
                </div>

                {/* Services Grid (Bento Layout) */}
                <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                    {/* Background Image at the center*/}
                    <div className="absolute -top-20 left-1/2 z-0 h-[327px] w-[548px] -translate-x-1/2">
                        <img
                            src="./images/backgrounds/home/services-bg.svg"
                            alt=""
                            className="object-cover"
                        />
                    </div>

                    {services.map((service, index) => (
                        <div key={index} className={`${service.className}`}>
                            <TiltCard className="h-full">
                                <EnhancedServiceCard
                                    animationDelay={index * 0.1}
                                    title={service.title}
                                    description={service.description}
                                    mockupType={service.mockupType}
                                />
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
