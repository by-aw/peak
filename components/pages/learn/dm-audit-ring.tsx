import Image from "next/image";
import { FEATURE_CREATORS } from "@/components/shared/creators";
import styles from "./dm-audit-ring.module.css";

/**
 * The 3D "testimonials" ring of /book-dm-audit (the embedded page's own CSS carousel, not the Framer 3D Carousel used
 * by /learn): the nine creators spaced 40deg apart on a ring of radius 230px (340px from 768px) seen through a 1100px
 * perspective, turning once every 28s. The 230px (340px) tall box is masked to fade out 14% from each side; cards are
 * 130x170px (190x240px), 18px radius, with a bottom gradient holding the name (Poppins 600 12px) and an Instagram glyph.
 */
export function DmAuditRing() {
  const step = 360 / FEATURE_CREATORS.length;
  return (
    <div className="relative h-[230px] w-full [--r:230px] [perspective-origin:50%_50%] [perspective:1100px] overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_14%,black_86%,transparent_100%)] min-[768px]:h-[340px] min-[768px]:[--r:340px]">
      <div className={`absolute top-1/2 left-1/2 size-px [transform-style:preserve-3d] ${styles.ring}`}>
        {FEATURE_CREATORS.map((p, i) => (
          <div
            key={p.name}
            className="absolute top-0 left-0 -mt-[85px] -ml-[65px] h-[170px] w-[130px] overflow-hidden rounded-[18px] bg-[#fafafa] shadow-[0_6px_18px_rgba(0,0,0,0.15)] min-[768px]:-mt-[120px] min-[768px]:-ml-[95px] min-[768px]:h-[240px] min-[768px]:w-[190px]"
            style={{ transform: `rotateY(${step * i}deg) translateZ(var(--r))` }}
          >
            <Image src={p.src} alt={p.name} width={190} height={240} sizes="190px" className="block size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1.5 bg-linear-to-t from-black/60 to-transparent px-2.5 py-2">
              <span className="overflow-hidden text-[12px] font-semibold text-ellipsis whitespace-nowrap text-white">{p.name}</span>
              <svg aria-hidden className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" strokeWidth="2" />
                <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="2" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="white" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
