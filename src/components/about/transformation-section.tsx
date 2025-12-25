import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TiltCard } from "../common/tilt-card";
import { ShineBorder } from "../ui/shine-border";
import { Separator } from "../ui/separator";

interface ServiceCardProps {
  icon: string;
  tag: string;
  title: string;
  children: React.ReactNode;
}

function ServiceCard({ icon: Icon, tag, title, children }: ServiceCardProps) {
  return (
    <div className="relative h-full rounded-4xl bg-linear-to-r from-[#ACACAC] via-[#303030] via-[47.06%] to-[#ACACAC] p-px hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.5)]">
      <ShineBorder
        shineColor={["#00B2FF", "#cfcfcf33", "#8F00FF", "#00B2FF", "#cfcfcf33"]}
        duration={10}
      />
      <div className="relative flex h-full flex-col rounded-4xl bg-[#080808] px-10 py-8">
        <div className="mb-4 flex items-center justify-between">
          <div
            className="rounded-[10px] bg-[#FFFFFF01] p-3"
            style={{
              boxShadow:
                "0px 10px 5px -1px #FFFFFF14 inset, 0px 6px 18px -1.5px #4F1AD62E, 0px 1.37px 4.12px -1px #4F1AD61A, 0px 0.36px 1.08px -0.5px #4F1AD614",
            }}>
            <img
              src={Icon}
              alt=""
              width={24}
              height={24}
              className="h-5 w-5 md:h-6 md:w-6"
            />
          </div>
          <div className="relative inline-block rounded-full bg-linear-to-l from-[#202020] from-[20.61%] to-[#FFFFFF] p-px">
            <div className="relative z-10 rounded-full bg-[#000000] px-4 py-1 text-sm md:text-base">
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
                "absolute top-1/2 z-0 h-6 w-6 -translate-y-1/2 rounded-full blur-sm",
                "-left-1 bg-linear-to-r from-[#00B2FF] to-[#504EFF]"
              )}
            />
          </div>
        </div>

        <h3 className="mb-4 text-xl font-semibold text-white md:text-2xl">
          {title}
        </h3>
        <Separator className="mb-4 h-px w-2/3! bg-linear-to-r from-[#FFFFFF05] via-[#FFFFFF1A] to-[#FFFFFF05]" />
        <p className="grow text-base text-white md:text-xl">{children}</p>
      </div>
    </div>
  );
}

export function TransformationSection() {
  return (
    <section className="mx-auto max-w-6xl bg-black py-10 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.4 }}
            className="w-full">
            <img
              src="/images/about/office-working.jpg"
              alt="Team working on laptops"
              width={528}
              height={410}
              className="w-full rounded-lg object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}>
            <h2 className="text-3xl font-medium text-white md:text-5xl">
              Shaping Tomorrow Through Bold Digital Transformation
            </h2>
            <p className="mt-8 text-base text-[#B2B2B2] md:text-2xl">
              Whether you have a startup or an established enterprise, LORDEVS
              provides tailored software development services that drive
              business growth. From custom applications to enterprise-level
              solutions, we ensure that your technology investments work for
              you.
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            className="h-full">
            <TiltCard>
              <ServiceCard
                icon="/icons/robot-icon.svg"
                tag="Empowerment"
                title="Powering Tomorrow's Businesses with AI-Driven IT Solutions">
                Our team at LORDEVS specializes in delivering scalable software
                solutions, ensuring that your business stays ahead of the curve.
                Whether it&lsquo;s application development, system integration,
                or cloud solutions, we offer a comprehensive suite of services
                to help your company thrive in the digital world.
              </ServiceCard>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="h-full">
            <TiltCard>
              <ServiceCard
                icon="/icons/up-down-arrow-icon.svg"
                tag="Innovate"
                title="Your Full-Cycle AI Partner">
                LORDEVS delivers intelligent AI-driven solutions that help
                businesses automate workflows, enhance user experiences, and
                make smarter decisions. From custom web applications to machine
                learning systems, our team builds scalable, end-to-end platforms
                that bring real results.
              </ServiceCard>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
