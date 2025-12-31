import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/client";
import { isAdminUser } from "@/lib/auth/admin";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminSidebar } from "@/components/admin/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate(ROUTES.ADMIN.LOGIN);
          return;
        }

        const isAdmin = await isAdminUser(user.email!);
        if (!isAdmin) {
          navigate(ROUTES.ADMIN.LOGIN);
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate(ROUTES.ADMIN.LOGIN);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate(ROUTES.ADMIN.LOGIN);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, supabase]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0B14]">
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-blue-400"></div>
          <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-blue-400/20"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0A0B14] via-[#1A1B2E] to-[#0F1019]" />

      {/* Animated gradient orbs */}
      <div
        className="absolute top-1/4 left-1/6 aspect-square w-96 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, #4742B6 0%, rgba(59, 130, 246, 0.1) 30%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute right-1/6 bottom-1/4 aspect-square w-96 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, #8F403E 0%, rgba(249, 115, 22, 0.1) 30%, rgba(249, 115, 22, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 aspect-square w-64 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, #4A1A6B 0%, rgba(139, 0, 255, 0.1) 30%, rgba(139, 0, 255, 0.05) 50%, transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "4s",
        }}
      />

      {/* Main content */}
      <div className="relative flex h-screen overflow-hidden">
        <AdminSidebar />
        <ScrollArea className="flex-1 overflow-auto">{children}</ScrollArea>
      </div>
    </div>
  );
}
