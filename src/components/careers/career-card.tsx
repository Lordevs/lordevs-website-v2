import { cn } from "@/lib/utils";
import { TiltCard } from "../common/tilt-card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export interface CareerCardProps {
  title: string;
  features: string[];
  tags: string[];
}

export function CareerCard({ title, features, tags }: CareerCardProps) {
  return (
    <TiltCard>
      <div
        className="relative overflow-hidden rounded-[22px] border-px border-[#4F1AD626] p-4 hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.5)] lg:w-full"
        style={{
          background: "radial-gradient(43% 50% at 50% 50%, #0F091226, #0C0912)",
        }}>
        <div className="absolute top-[-84px] left-[345px] h-[205px] w-[162px] bg-linear-to-r from-[#00B1FE] to-[#504EFF] opacity-30 blur-[103.4px]" />

        <div className="mb-4 flex flex-col items-start gap-3 md:flex-row md:items-center">
          <h3 className="mb-1 text-2xl font-bold text-white">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="relative inline-block rounded-full bg-linear-to-l from-[#202020] from-[20.61%] to-[#FFFFFF] p-px">
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
                    "bg-linear-to-r",
                    idx % 2 === 0
                      ? "left-0 from-[#00B2FF] to-[#504EFF]"
                      : "-left-1 from-[#8F00FF] to-[#504EFF]"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
        <Separator className="mb-4 h-px bg-linear-to-r from-[#FFFFFF05] via-[#FFFFFF1A] to-[#FFFFFF05]" />

        <div className="mb-6 space-y-5">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <img
                src="/icons/check-icon.svg"
                alt=""
                width={16}
                height={16}
                className="h-5 w-5 md:h-6 md:w-6"
              />
              <span className="text-sm text-[#FFFFFF99] md:text-base">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-end">
          <link href="/careers/apply-for-job">
            <Button
              variant="gradient"
              className="mt-2 cursor-pointer shadow-none">
              Apply now →
            </Button>
          </link>
        </div>
      </div>
    </TiltCard>
  );
}
