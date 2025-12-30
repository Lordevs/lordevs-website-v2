import { useState, type FormEvent } from "react";
import { ShineBorder } from "@/components/ui/shine-border";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Simple mock success
    console.log("Subscribing:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <section className="py-16 flex items-center justify-center">
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <div className="relative w-full bg-[#0C0912] rounded-2xl p-8 md:p-16 text-center overflow-hidden border border-[#4F1AD61A] shadow-[inset_0px_4px_120px_-80px_#1FBBBB24]">
          <ShineBorder
            shineColor={["#00B2FF", "#cfcfcf33", "#8F00FF", "#cfcfcf33"]}
            duration={20}
          />

          {/* Background Orbs to match CTA.tsx */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 z-[-1] h-full w-full blur-[178px]">
              <div className="absolute top-0 -left-90 h-[243px] w-[259px] bg-[#8F403E] blur-[5px] md:top-5 md:left-20 md:h-[343px] md:w-[459px] opacity-30" />
              <div className="absolute top-10 -right-50 h-[243px] w-[259px] bg-[#4742B6] blur-[129px] md:top-18 md:right-20 md:h-[288px] md:w-[459px] opacity-30" />
            </div>
          </div>

          <div className="relative z-10 space-y-6 flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              Stay Updated with Lordevs
            </h2>
            <p className="text-base md:text-lg text-gray-400 mx-auto max-w-xl">
              Subscribe to our newsletter for the latest news, product updates,
              and industry news delivered straight to your inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-0 w-full max-w-md bg-transparent border border-gray-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#41A2F8] transition-all">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-transparent px-6 py-4 text-white placeholder-gray-500 focus:outline-none"
              />
              <Button
                type="submit"
                variant="gradient"
                className="w-full sm:w-auto px-8 py-4 h-full rounded-none">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
