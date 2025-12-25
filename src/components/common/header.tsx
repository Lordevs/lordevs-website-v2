"use client";

import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ROUTES } from "@/constants/routes";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Logo } from "./logo";

const navItems = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Case Studies", href: ROUTES.CASE_STUDIES },
  { name: "About", href: ROUTES.ABOUT },
  // { name: 'Career', href: '/careers' },
  { name: "Contact", href: ROUTES.CONTACT },
];

const headerVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

const modalVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-gray-700 bg-black backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Logo />

          <DesktopNav currentPath={location.pathname} />
          <DesktopCTA />

          {/* Mobile Menu Trigger */}
          <button
            aria-label="Open menu"
            className="text-white md:hidden"
            onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Full Screen Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-60 bg-[#00000069] backdrop-blur-md">
            {/* Modal Content */}
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex h-full w-full flex-col items-center justify-center p-8">
              {/* Close Button */}
              <button
                onClick={closeMobileMenu}
                className="absolute top-8 right-8 text-white/70 transition-colors hover:text-white">
                <X size={24} />
              </button>

              {/* Logo */}
              {/* <div className="mb-8 flex justify-center">
                <Logo className="h-16 w-36" />
              </div> */}

              {/* Navigation Items */}
              <nav className="mb-6">
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}>
                        <NavLink
                          to={item.href}
                          onClick={closeMobileMenu}
                          className={`block rounded-lg px-4 py-3 text-center text-2xl font-medium transition-all duration-300 ${
                            isActive ? "text-[#41A2F8]" : "text-[#E6E6E6]"
                          }`}>
                          {item.name}
                        </NavLink>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}>
                <NavLink to="/contact" onClick={closeMobileMenu}>
                  <Button
                    variant="gradient"
                    className="w-full rounded-2xl py-6 text-lg font-medium">
                    Book a Call →
                  </Button>
                </NavLink>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DesktopNav({ currentPath }: { currentPath: string }) {
  return (
    <nav className="hidden space-x-8 md:flex">
      {navItems.map((item, idx) => {
        const isActive = currentPath === item.href;
        return (
          <motion.div
            key={item.name}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            className={`transform text-sm font-medium transition-transform duration-300 hover:scale-105 ${
              isActive ? "text-[#41A2F8]" : "text-[#E6E6E6] hover:text-white"
            }`}>
            <NavLink to={item.href} className="px-3 py-2">
              {item.name}
            </NavLink>
          </motion.div>
        );
      })}
    </nav>
  );
}

function DesktopCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="hidden md:block">
      <NavLink to="/contact">
        <Button variant="gradient" className="cursor-pointer px-6 py-2">
          Book a Call →
        </Button>
      </NavLink>
    </motion.div>
  );
}
