import useMobile from "@/hooks/use-mobile";
import { Link } from "react-router";
import type { FC } from "react";

const FutureTechSection: FC = () => {
  const isMobile = useMobile();
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-0">
        {/* — Hero Block — */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-12">
          <div className="shrink-0 flex justify-start items-center w-full md:w-auto px-4">
            <img
              src="/logo.svg"
              alt="Company Logo"
              width={50}
              height={50}
              className="md:w-32 md:h-32 w-10 h-10 object-contain"
            />
            {isMobile && (
              <p className="ml-3 text-[#41A2F8] uppercase text-sm font-medium">
                Learn, Connect, and Innovate
              </p>
            )}
          </div>
          <div className="mt-6 md:mt-0 md:ml-6 text-left px-4">
            {!isMobile && (
              <p className="text-[#41A2F8] uppercase text-sm md:text-base font-medium">
                Learn, Connect, and Innovate
              </p>
            )}

            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-white leading-tight">
              Be Part of the Future Tech Revolution
            </h2>
            <p className="mt-4 text-gray-400 text-base md:text-lg max-w-2xl">
              Immerse yourself in the world of future technology. Explore our
              comprehensive resources, connect with fellow tech enthusiasts, and
              drive innovation in the industry. Join a dynamic community of
              forward-thinkers.
            </p>
          </div>
        </div>

        {/* — Resources Panel — */}
        <div className="border border-[#4F1AD61A] rounded-2xl p-6 mx-4 bg-[#0C0912]/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 m-4">
            {/* Card 1 */}
            <div
              className="
                relative overflow-hidden
                p-8 rounded-2xl
                bg-[#0C0912]
                border border-[#4F1AD61A]
                transition-all duration-300
                hover:border-[#4F1AD640]
                hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.3)]
                group
              ">
              <div
                className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 70% 20%, #4742B6 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-white font-bold text-xl">
                    Access the Latest Company Portfolio
                  </h3>
                  <button
                    type="button"
                    className="
                      inline-block px-6 py-2
                      bg-linear-to-b from-[#41A2F8] to-[#0061FF]
                      text-white text-sm font-semibold rounded-full
                      hover:scale-105 active:scale-95
                      transition duration-300 cursor-not-allowed
                    "
                    disabled>
                    Download
                  </button>
                </div>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  Download the most recent company reports, including annual
                  summaries and performance insights. Stay informed with
                  up-to-date data on business operations and growth.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="
                relative overflow-hidden
                p-8 rounded-2xl
                bg-[#0C0912]
                border border-[#4F1AD61A]
                transition-all duration-300
                hover:border-[#4F1AD640]
                hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.3)]
                group
              ">
              <div
                className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 30% 80%, #8F403E 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-white font-bold text-xl">
                    Stay Connected on LinkedIn
                  </h3>
                  <Link
                    to="https://www.linkedin.com/company/lordevs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-block px-6 py-2
                      bg-linear-to-b from-[#41A2F8] to-[#0061FF]
                      text-white text-sm font-semibold rounded-full
                      hover:scale-105 active:scale-95
                      transition duration-300
                    ">
                    Follow
                  </Link>
                </div>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  Discover the latest company updates, exciting job
                  opportunities, and in-depth industry insights. Stay connected
                  and informed with all the key developments shaping our future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureTechSection;
