import { useTestimonials } from "@/hooks";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";
import Flag, { type FlagCode } from "../ui/flag";
import SectionBagde from "./section-badge";

const TestimonialCard = ({
  image,
  name,
  country,
  content,
}: {
  image: string;
  name: string;
  country: string;
  content: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/10 bg-gray-950/10 hover:bg-gray-950/20",
        // dark styles
        "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/20"
      )}>
      <div className="flex flex-row items-center gap-2">
        <Flag code={image as FlagCode} size="2xl" />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{country}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{content}</blockquote>
    </figure>
  );
};

export function ReviewsSection() {
  const { testimonials } = useTestimonials(true);

  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);
  return (
    <section className="relative overflow-hidden py-10 md:py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 mx-auto max-h-[625px] max-w-[923px]">
        <img
          src="/images/backgrounds/home/hero-bg.svg"
          alt=""
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/10 to-black/80" />
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
            className="mb-4 text-3xl font-medium text-white md:text-5xl">
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-base text-[#B2B2B2] md:text-2xl">
            Smart inventory, real results. See how Cawar improves efficiency and
            prevents stock issues.
          </motion.p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee reverse pauseOnHover className="[--duration:30s]">
            {firstRow.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:30s]">
            {secondRow.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-black"></div>
        </div>
      </div>
    </section>
  );
}
