"use client";

import { NavLink } from "react-router";
import { ROUTES } from "@/constants/routes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionBagde from "../common/section-badge";
import { ProjectsSection } from "../projects/projects-section";

export function PortfolioSection() {
  return (
    <section className="relative py-10">
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <SectionBagde name="Portfolio" />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-medium md:text-5xl">
            Our Recent Projects
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <ProjectsSection />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center">
          <NavLink to={ROUTES.CASE_STUDIES}>
            <Button
              variant="gradient"
              className="px-8 py-4 text-base font-semibold md:px-16 md:py-6 md:text-xl">
              See more case studies →
            </Button>
          </NavLink>
        </motion.div>
      </div>
    </section>
  );
}
