import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/client";
import { isAdminUser } from "@/lib/auth/admin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/common/logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const supabase = createClient();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const isAdmin = await isAdminUser(user.email!);
          if (isAdmin) {
            navigate(ROUTES.ADMIN.INDEX);
            return;
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        // Check if user is an admin using the admin_users table
        const isAdmin = await isAdminUser(data.user.email!);
        if (isAdmin) {
          navigate(ROUTES.ADMIN.INDEX);
        } else {
          setError("Unauthorized access - admin privileges required");
          await supabase.auth.signOut();
        }
      } else {
        setError("Login failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4">
        {/* Background linear effects */}
        <div className="absolute inset-0 bg-linear-to-br from-[#0A0B14] via-[#1A1B2E] to-[#0F1019]" />

        {/* Animated linear orbs */}
        <div
          className="absolute top-1/4 left-1/4 aspect-square w-96 animate-pulse"
          style={{
            background:
              "radial-linear(circle, #4742B6 0%, rgba(59, 130, 246, 0.1) 30%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 aspect-square w-96 animate-pulse"
          style={{
            background:
              "radial-linear(circle, #8F403E 0%, rgba(249, 115, 22, 0.1) 30%, rgba(249, 115, 22, 0.05) 50%, transparent 70%)",
            filter: "blur(60px)",
            animationDelay: "2s",
          }}
        />

        <Card className="relative w-full max-w-md border border-blue-500/30 bg-linear-to-br from-[#23243A]/50 to-[#181A20]/50 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-white">Checking authentication...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4">
      {/* Background linear effects */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0A0B14] via-[#1A1B2E] to-[#0F1019]" />

      {/* Animated linear orbs */}
      <div
        className="absolute top-1/4 left-1/4 aspect-square w-96 animate-pulse"
        style={{
          background:
            "radial-linear(circle, #4742B6 0%, rgba(59, 130, 246, 0.1) 30%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute right-1/4 bottom-1/4 aspect-square w-96 animate-pulse"
        style={{
          background:
            "radial-linear(circle, #8F403E 0%, rgba(249, 115, 22, 0.1) 30%, rgba(249, 115, 22, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "2s",
        }}
      />

      <Card className="relative w-full max-w-md border border-blue-500/30 bg-linear-to-br from-[#23243A]/50 to-[#181A20]/50 shadow-2xl backdrop-blur-sm">
        {/* Card glow effect */}
        <div className="absolute inset-0 rounded-lg bg-linear-to-br from-blue-600/10 to-purple-600/10 opacity-50 blur-sm" />

        <CardHeader className="relative">
          <div className="mb-4 flex items-center justify-center">
            <Logo className="h-16 w-36" />
          </div>
          <CardTitle className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-center text-2xl font-bold text-transparent">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="border-blue-500/30 bg-linear-to-r from-[#23243A]/50 to-[#181A20]/50 text-white placeholder-gray-500 backdrop-blur-sm focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="border-blue-500/30 bg-linear-to-r from-[#23243A]/50 to-[#181A20]/50 text-white placeholder-gray-500 backdrop-blur-sm focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            {error && (
              <div className="relative rounded-lg border border-red-500/30 bg-linear-to-r from-red-600/10 to-red-800/10 p-3 text-center text-sm text-red-400">
                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-red-600/5 to-red-800/5 blur-sm" />
                <span className="relative">{error}</span>
              </div>
            )}
            <Button
              type="submit"
              className="group relative w-full bg-linear-to-r from-[#00B2FF] to-[#8F00FF] shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-[#0099E6] hover:to-[#7A00E6] hover:shadow-blue-500/40"
              disabled={loading}>
              <div className="absolute inset-0 rounded bg-linear-to-r from-[#00B2FF] to-[#8F00FF] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-20" />
              <span className="relative">
                {loading ? "Signing in..." : "Sign In"}
              </span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
