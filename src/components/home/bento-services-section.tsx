import { motion } from "framer-motion";
import { EnhancedServiceCard } from "@/components/home/cards/enhanced-service-card";
import SectionBagde from "../common/section-badge";
import { TiltCard } from "../common/tilt-card";

export function BentoServicesSection() {
    const services = [
        {
            title: "Enterprise Software Solutions",
            description:
                "Advanced chatbots and virtual agents designed to handle customer support, internal queries and dynamic interactions.",
            mockupType: "enterprise" as const,
            className: "md:col-span-6",
        },
        {
            title: "Vibe Coding Applications",
            description:
                "We automate your workflows to streamline repetitive tasks, enhance efficiency, save time, and eliminate errors.",
            mockupType: "vibe" as const,
            className: "md:col-span-6",
        },
        {
            title: "SaaS Applications",
            description:
                "Curation, cleaning and structuring of data to ensure high-quality inputs for effective AI and machine learning outcomes.",
            mockupType: "saas" as const,
            className: "md:col-span-4",
        },
        {
            title: "AI Powered Apps",
            description:
                "Curation, cleaning and structuring of data to ensure high-quality inputs for effective AI and machine learning outcomes.",
            mockupType: "ai" as const,
            className: "md:col-span-4",
        },
        {
            title: "Software Integrations",
            description:
                "Curation, cleaning and structuring of data to ensure high-quality inputs for effective AI and machine learning outcomes.",
            mockupType: "integrations" as const,
            className: "md:col-span-4",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-[#050505] py-20 md:py-32">
            <div className="relative z-10 container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="mb-16 md:mb-24 text-center">
                    <SectionBagde name="Services" />

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.1] text-white">
                        Innovative Services for Your{" "}
                        <span className="bg-linear-to-r from-[#1E72FC] via-[#00B2FF] to-[#8F00FF] bg-clip-text text-transparent">
                            Business
                        </span>{" "}
                        Growth
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-2xl text-lg text-[#B2B2B2] md:text-xl md:leading-relaxed">
                        Extending your development capabilities with tailored solutions designed to streamline, innovate, and scale.
                    </motion.p>
                </div>

                {/* Services Grid (Bento Layout) */}
                <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 lg:gap-8">
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
