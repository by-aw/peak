import Image from "next/image";
import { BarTable, type BarRow } from "./bar-table";

const avatar = (src: string, size: number) => <Image src={src} width={size} height={size} alt="" className="size-5 rounded-full object-cover" />;

const ROWS: BarRow[] = [
  { icon: avatar("/framer/3JBNMu5nBmZVPJiH1BX39OHaPs.png", 80), label: "@jessica", value: "312", gray: 204 / 412, green: 204 / 412 },
  { icon: avatar("/framer/XUlw59RiVqsh1VuWgwY8cCn89jA.png", 80), label: "@marcus", value: "287", gray: 193 / 412, green: 122 / 412 },
  { icon: avatar("/framer/YJuZgOZXS5h8jzfvxS0BSXZoq9w.png", 80), label: "@devon", value: "248", gray: 142 / 412, green: 107 / 412 },
  { icon: avatar("/framer/imfLlLlSMEKoIql5dLwEsCmkyY.jpg", 1024), label: "@dylan", value: "200", gray: 102 / 412, green: 59 / 412 },
  { icon: avatar("/framer/MKA7INDXm9nEkdIrbzOYK7fJ4A.jpg", 1024), label: "@becca", value: "186", gray: 74 / 412, green: 56 / 412 },
  { icon: avatar("/framer/Oaq3OkXGEqvwFM2Dh3l0EOcXw6s.jpg", 1024), label: "@allison", value: "172", gray: 36 / 412, green: 25 / 412 },
];

/** "Performance by Setter" leaderboard card (432x303; full width on phone). */
export function LeaderboardMockup({ className = "" }: { className?: string }) {
  return <BarTable title="Performance by Setter" meta="by click rates" rows={ROWS} className={`max-w-[432px] ${className}`} />;
}
