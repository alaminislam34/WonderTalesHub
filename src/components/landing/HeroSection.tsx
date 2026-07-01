import heroImage from "../../assets/hero-image.png";
import storeButtons from "../../assets/google and apple playstore.svg";
import bookIcon from "../../assets/Book.svg";
import booksIcon from "../../assets/Books.svg";
import aiMicIcon from "../../assets/AI Mic.svg";
import avatarUser1 from "../../assets/avatar1.svg";
import avatarUser2 from "../../assets/avatar2.svg";
import avatarUser3 from "../../assets/avatar3.svg";
import avatarUser4 from "../../assets/avatar4.svg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end pb-16">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top z-0 pointer-events-none"
      />

      <div className="absolute inset-0 bg-linear-to-br from-navy-950/10 via-navy-700/10 to-navy-900/10 z-0" />

      <div className="relative z-10 mx-auto w-11/12 max-w-360  mt-32">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-gold text-lg leading-none">✨</span>
            <span className="text-xs text-white/80 font-light tracking-wider">
              Personalized · Family-Narrated
            </span>
          </div>

          <h1 className="font-serif text-5xl leading-[1.1] tracking-wide text-white sm:text-6xl lg:text-[4.5rem]">
            EVERY NIGHT, A NEW CHAPTER.
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-[#E89C30] to-[#FFDBA8]">
              THE SAME HERO.
            </span>
          </h1>

          <p className="max-w-xl text-lg md:text-2xl text-white/90 leading-[180%]">
            Your child becomes the named hero of a magical saga narrated by AI
            or a loved one.
          </p>

          {/* Store Buttons */}
          <div className="pt-2">
            <img
              src={storeButtons}
              alt="Download on App Store and Google Play"
              className="h-12 object-contain"
            />
          </div>

          {/* Avatars */}
          {/* Research Banner */}
          <div className="border-2 border-[#FFFFFF33] backdrop-blur-[2px] bg-[#ffffff0c] rounded-2xl px-6 py-5 flex items-center gap-5">
            {/* Avatars */}
            <div className="flex -space-x-3 shrink-0">
              {[avatarUser1, avatarUser2, avatarUser3, avatarUser4].map(
                (src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-12 w-12 rounded-full border-2 border-white bg-navy-800 object-cover"
                  />
                ),
              )}
            </div>

            {/* Text */}
            <p className="text-[15px] text-white font-light leading-snug">
              Built on peer-reviewed research from 5 studies {" "}
              <span className="text-orange-400 font-medium">5 studies</span>{" "}
              across the university on Pennsylvania, Ohio State and Springer Nature.
            </p>
          </div>
        </div>
      </div>

      {/* ===== FEATURES STRIP ===== */}
      <div className="relative z-20 mx-auto w-11/12 max-w-360 mt-16">
        <div className="rounded-3xl border-2 border-[#FFFFFF33] backdrop-blur-[2px] bg-[#ffffff0c] p-8 md:p-12 shadow-2xl overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute inset-0 "></div>

          <div className="relative grid gap-12 md:grid-cols-3 md:divide-x divide-white/10">
            {[
              {
                icon: bookIcon,
                title: "AI Generated Stories",
                desc: "Unique stories crafted for your child",
              },
              {
                icon: aiMicIcon,
                title: "Your Voice, Their Story",
                desc: "Clone your voice & narrate their adventure",
              },
              {
                icon: booksIcon,
                title: "Endless Adventure",
                desc: "Unique stories for endless imagination",
              },
            ].map((f, idx) => (
              <div
                key={f.title}
                className={`flex flex-row items-center gap-4 ${idx !== 0 ? "md:pl-8" : ""}`}
              >
                {/* Icon Circle */}
                <div className="relative">
                  <div className="relative h-14 w-14 flex items-center justify-center rounded-full bg-linear-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/30 backdrop-blur-sm">
                    <img src={f.icon} alt="" className="h-9 w-9 opacity-90" />
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-300 font-light leading-relaxed max-w-xs">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
