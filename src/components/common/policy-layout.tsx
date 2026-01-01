import { motion } from "framer-motion";
import { SEO } from "./seo";

interface PolicyLayoutProps {
    title: string;
    description: string;
    url: string;
    children: React.ReactNode;
}

export function PolicyLayout({ title, description, url, children }: PolicyLayoutProps) {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/20">
            <SEO title={`${title} | LORDEVS`} description={description} url={url} />

            {/* Hero Section for Policy */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="container mx-auto max-w-4xl px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
                    >
                        {title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-8 h-px w-full origin-left bg-linear-to-r from-white/20 via-white/5 to-transparent"
                    />
                </div>
            </section>

            {/* Content Section */}
            <section className="pb-24">
                <div className="container mx-auto max-w-4xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:text-white prose-p:text-[#EFEDFD99] prose-li:text-[#EFEDFD99] prose-strong:text-white"
                    >
                        {children}
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
