import { OfferCard } from "./offer-card";

/**
 * /features/offer cards (Framer "Frame 2147237366"): two columns on tablet/desktop, one on phone, 17px apart,
 * inside a 1012px column with 32px side padding (16px on phone) and 180px below. All four rows share one height
 * (the tallest card's; Framer's grid is `repeat(2, minmax(0, 1fr))` with 1fr auto rows), cards sit at the start of
 * their cell.
 */
const cards = [
  {
    src: "/framer/liVJClYoa97SP6DATOAuiftjdQ.png",
    aspect: "aspect-[1.71521]",
    title: "Weekly Executive Reporting",
    body: "Our team will go through all your data and give you weekly reports on what to improve, how to solve your bottlenecks.",
    skew: 0.5,
    delay: 0,
  },
  {
    src: "/framer/7DXQ1SrTkAH8CpFGrjqSdFDwLQ.png",
    aspect: "aspect-[1.71197]",
    title: "Access To Our Proprietary Software Mochi",
    body: "We onboard your team and help you manage your closers & setters with maximum accountability so you can unlock 200% revenue growth in the DMs.",
    skew: -0.5,
    delay: 0.1,
  },
  {
    src: "/framer/FItq159qZZd4UJQU9636EcVFKw.png",
    aspect: "aspect-[1.71521]",
    title: "Industry-Leading Sales Secrets & Insights",
    body: "Get data none of your competitors have access to from the top 7 and 8 figure info businesses that’s working right now.",
    skew: -0.5,
    delay: 0,
  },
  {
    src: "/framer/7IAZru0Ph8FjF27QJZEXwXJwioM.png",
    aspect: "aspect-[1.71197]",
    title: "Access To The Founders & C-Suite:",
    body: "Monthly strategy calls & 1-1 text access & to help you maximize your total sales and conversions.",
    skew: 0.5,
    delay: 0.1,
  },
] as const;

export function OfferCards() {
  return (
    <section className="flex w-full flex-row items-start justify-center gap-4 px-4 md:px-8">
      <div className="flex w-px max-w-[1012px] flex-[1_0_0] flex-col items-center pb-[180px]">
        <div className="grid w-full auto-rows-[minmax(0,1fr)] grid-cols-1 grid-rows-[repeat(2,minmax(0,1fr))] gap-[17px] md:grid-cols-[repeat(2,minmax(50px,1fr))]">
          {cards.map((card) => (
            <OfferCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
