import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import {
  ArrowLeft,
  CircleHelp,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

import { Logo } from "../common/logo";

const navigation = [
  {
    name: "Dashboard",
    href: ROUTES.ADMIN.INDEX,
    icon: LayoutDashboard,
  },
  {
    name: "FAQs",
    href: ROUTES.ADMIN.FAQS,
    icon: CircleHelp,
  },
  {
    name: "Projects",
    href: ROUTES.ADMIN.PROJECTS,
    icon: FolderOpen,
  },
  {
    name: "Testimonials",
    href: ROUTES.ADMIN.TESTIMONIALS,
    icon: MessageSquare,
  },
  {
    name: "News",
    href: ROUTES.ADMIN.NEWS,
    icon: Newspaper,
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const supabase = createClient();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }

      // Clear any local storage or session storage if needed
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }

      // Force reload to clear any cached state
      window.location.href = ROUTES.ADMIN.LOGIN;
    } catch (error) {
      console.error("Error during logout:", error);
      // Fallback: force navigation to login
      window.location.href = ROUTES.ADMIN.LOGIN;
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          className="border-blue-500/30 bg-linear-to-r from-[#23243A] to-[#181A20] text-white backdrop-blur-sm hover:from-[#2A2B45] hover:to-[#1F212A]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-blue-500/20 bg-linear-to-b from-[#0A0B14] via-[#1A1B2E] to-[#0F1019] backdrop-blur-xl transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:inset-0 lg:translate-x-0`}>
        {/* Gradient overlay for extra depth */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-600/5 via-transparent to-purple-600/5" />

        <div className="relative flex h-screen flex-col overflow-hidden">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center justify-center border-b border-blue-500/20 bg-linear-to-r from-[#23243A]/50 to-[#181A20]/50">
            <div className="relative">
              <div className="absolute inset-0" />
              <Logo
                href={ROUTES.ADMIN.INDEX}
                className="relative h-16 w-48 brightness-110"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-blue-500/30 bg-linear-to-r from-[#00B2FF]/20 to-[#8F00FF]/20 text-white shadow-lg shadow-blue-500/20"
                      : "border-0 border-blue-500/20 text-gray-400 hover:border hover:bg-linear-to-r hover:from-[#23243A]/50 hover:to-[#181A20]/50 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-[#00B2FF] to-[#8F00FF] opacity-10 blur-sm" />
                  )}
                  <item.icon
                    className={`relative mr-3 h-5 w-5 ${
                      isActive
                        ? "text-blue-400"
                        : "text-gray-500 group-hover:text-blue-400"
                    }`}
                  />
                  <span className="relative">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-2 h-2 w-2 rounded-full bg-linear-to-r from-[#00B2FF] to-[#8F00FF]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="shrink-0 border-t border-blue-500/20 bg-linear-to-r from-[#23243A]/30 to-[#181A20]/30 p-4">
            <Button
              variant="outline"
              className="w-full cursor-pointer border-red-500/30 bg-linear-to-r from-red-600/10 to-red-800/10 text-red-400 transition-all duration-300 hover:border-red-500/50 hover:bg-transparent hover:from-red-600/20 hover:to-red-800/20 hover:text-red-300"
              onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-30 bg-black lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export function AdminHeader({
  title,
  showBackButton = false,
}: {
  title: string;
  showBackButton?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <header className="relative border-b border-blue-500/20 bg-linear-to-r from-[#0A0B14] via-[#1A1B2E] to-[#0F1019] px-6 py-4 backdrop-blur-xl">
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-blue-600/5 via-transparent to-purple-600/5" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-white/10 bg-white/5 text-white hover:bg-white/10"
              onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-2xl font-semibold text-transparent">
            {title}
          </h1>
        </div>

        {/* Decorative gradient line */}
        <div className="h-px w-32 bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>
    </header>
  );
}
