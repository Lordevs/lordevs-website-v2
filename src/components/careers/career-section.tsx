import { Loader2 } from "lucide-react";
import { useCareers } from "@/hooks/use-careers";
import { CareerCard } from "./career-card";

export function CareerSection() {
  const { careers, loading } = useCareers(true);

  if (loading) {
    return (
      <section className="bg-black py-20">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-medium md:text-5xl">
            Career pathways we offer
          </h2>
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-white/50" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-6 text-center text-white">
        <h2 className="text-4xl font-medium md:text-5xl">
          Career pathways we offer
        </h2>
        <p className="mx-auto mt-4 mb-18 max-w-[940px] text-base text-gray-300 md:text-2xl">
          Explore diverse career opportunities that align with your skills,
          interests, and aspirations in the AI and web development space.
        </p>

        {careers.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-12">
            <p className="text-lg text-white/60">
              No open positions at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-[940px] grid-cols-1 gap-8 md:grid-cols-2">
            {careers.map((career) => (
              <CareerCard
                key={career.id}
                title={career.title}
                features={career.features}
                tags={career.tags}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
