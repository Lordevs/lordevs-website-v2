import { NavLink } from "react-router";
import { ROUTES } from "@/constants/routes";
import { motion } from "framer-motion";

import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  const quickLinks = [
    { name: "Home", href: ROUTES.HOME },
    { name: "Case Studies", href: ROUTES.CASE_STUDIES },
    { name: "About", href: ROUTES.ABOUT },
    { name: "Careers", href: ROUTES.CAREER },
    { name: "News", href: ROUTES.NEWS },
    { name: "Contact", href: ROUTES.CONTACT },
  ];

  const socialIcons = [
    {
      icon: "/images/logos/linkedin-logo.svg",
      href: "https://www.linkedin.com/company/dotcode/",
      label: "LinkedIn",
    },
    {
      icon: "/images/logos/instagram-logo.svg",
      href: "https://www.instagram.com/dotcode/",
      label: "Instagram",
    },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: ROUTES.PRIVACY_POLICY },
    { name: "Cookies Policy", href: ROUTES.COOKIES_POLICY },
    { name: "Terms & Conditions", href: ROUTES.TERMS_CONDITIONS },
  ];

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="relative z-10 container mx-auto max-w-6xl px-6 pt-12 pb-8 md:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {/* Column 1: Logo and Description */}
          <div className="flex flex-col items-start space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>
              <Logo className="w-40" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-sm leading-relaxed text-[#EFEDFD99]">
              Designing and delivering scalable SaaS, AI-powered, and enterprise
              software solutions that help businesses build, scale, and operate
              with confidence.
            </motion.p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-white">
              Quick Links
            </motion.h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  viewport={{ once: true }}>
                  <NavLink
                    to={link.href}
                    className="text-sm text-[#EFEDFD99] transition-colors duration-300 hover:text-white">
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Policies */}
          <div className="flex flex-col space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-white">
              Our Policies
            </motion.h3>
            <ul className="space-y-4">
              {policyLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  viewport={{ once: true }}>
                  <NavLink
                    to={link.href}
                    className="text-sm text-[#EFEDFD99] transition-colors duration-300 hover:text-white">
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact and Call to Action */}
          <div className="flex flex-col space-y-6">
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.label}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:scale-110 transition-all duration-300">
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="h-full w-full object-contain"
                  />
                </motion.a>
              ))}
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold leading-tight text-white">
              We'd Love to Hear <br /> from You!
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}>
              <NavLink to={ROUTES.CONTACT}>
                <Button
                  size="sm"
                  variant="gradient"
                  className="w-full rounded-xl py-4 text-base font-medium cursor-pointer">
                  Get in Touch →
                </Button>
              </NavLink>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 flex flex-col items-center justify-center border-t border-white/10 py-4 md:flex-row">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center text-sm text-[#C7C7C7]">
          Copyright © {new Date().getFullYear()} DotCode. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
