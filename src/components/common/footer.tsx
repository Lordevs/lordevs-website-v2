import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";
import { motion } from "framer-motion";

import { Logo } from "./logo";

export function Footer() {
  const navigationLinks = [
    { name: "Home", href: ROUTES.HOME },
    { name: "Projects", href: ROUTES.CASE_STUDIES },
    { name: "About", href: ROUTES.ABOUT },
    { name: "Contact", href: ROUTES.CONTACT },
  ];

  // const productLinks = [
  //   { name: 'AI SaaS', href: '#ai-saas' },
  //   { name: 'AI Agent', href: '#ai-agent' },
  //   { name: 'Full Stack App development', href: '#full-stack' },
  //   { name: 'Mobile App development', href: '#mobile-app' },
  // ];

  // Updated social icons to match the image, using placeholder divs for Upwork and Fiverr
  const socialIcons = [
    // { icon: '/images/logos/upwork-logo.svg', href: '#', label: 'Upwork' },
    // { icon: '/images/logos/fiver-logo.svg', href: '#', label: 'Fiverr' },
    {
      icon: "/images/logos/linkedin-logo.svg",
      href: "https://www.linkedin.com/company/lordevs/",
      label: "LinkedIn",
    },
    {
      icon: "/images/logos/instagram-logo.svg",
      href: "https://www.instagram.com/lordevs.co/",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="relative z-10 container mx-auto max-w-6xl px-6 pt-8 pb-4 md:pt-16 md:pb-8">
        {/* Top Section - Adjusted to match the image layout */}
        <div className="mb-8 flex flex-col gap-y-2 md:mb-16">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 flex items-center space-x-3 md:mb-0">
            <Logo className="h-16 w-36" />
          </motion.div>

          {/* Newsletter Signup*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-lg flex-1 md:mx-0 md:mb-0 md:max-w-md">
            {/* <SubscribeEmailForm /> */}
            <h3 className="mb-4 max-w-[250px] text-2xl font-semibold text-[#efedfd99]">
              We Transform Ideas into Reality
            </h3>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          {/* Navigation Links Section - Now using flex for better control */}
          <div className="flex w-full max-w-2xl flex-col justify-start space-y-8 md:flex-row md:justify-between md:space-y-0">
            {/* Main Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:w-1/2">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
                className="mb-4 font-medium text-[#F4F0FF]">
                Quick Links
              </motion.h3>
              <ul className="space-y-4">
                {navigationLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}>
                    <Link
                      to={link.href}
                      className="text-sm text-[#EFEDFD99] transition-colors duration-300 hover:text-white">
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Products Section */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="md:w-1/2" // Give it some width
            >
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
                className="mb-4 text-sm font-medium text-[#F4F0FF]"
              >
                Products
              </motion.h3>
              <ul className="space-y-4">
                {productLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.href}
                      className="text-sm text-[#EFEDFD99] transition-colors duration-300 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div> */}
          </div>

          {/* Social Icons and Contact - Right Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col items-start space-y-8 md:mt-0 md:items-end">
            {/* Social Icons - Now using a grid for the 2x2 layout */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              {socialIcons.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex h-10 w-10 cursor-pointer items-center justify-center"
                    aria-label={social.label}>
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="w-full"
                    />
                  </motion.div>
                </a>
              ))}
            </div>

            {/* Contact Email */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-4 text-left md:mt-0 md:text-right">
              <a
                href="mailto:info@lordevs.com"
                className="text-xl text-white transition-colors duration-300 hover:text-[#C7C7C7]">
                info@lordevs.com
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-center md:mt-16">
          <p className="text-sm text-[#C7C7C7]">
            Lordevs.com All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
