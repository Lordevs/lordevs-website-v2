import { motion } from "framer-motion";

export default function SectionBagde({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative mb-8 inline-block rounded-full bg-linear-to-r from-[#FFFFFF] from-[1.62%] via-[#454545] via-[19.4%] to-[#000000] to-[66.19%] p-1px text-sm font-medium">
      <div className="rounded-full bg-[#262635] px-6 py-2">
        <div
          style={{
            background:
              "radial-gradient(65.65% 45.65% at 50.59% 69.57%, #FFFFFF 0%, #B8B8B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
          {name}
        </div>
        {/* Bottom-left gradient backdrop */}
        <span className="absolute -bottom-1 -left-0.5 -z-10 h-8 w-8 rounded-full bg-linear-to-r from-[#00B1FE] to-[#504EFF] blur-sm" />
      </div>
    </motion.div>
  );
}
