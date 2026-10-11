"use client";

import Image from "next/image";
import { flushSync } from "react-dom";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import s from "./viewer-path.module.css";

type StageKey = "watch" | "qualified" | "click" | "book" | "buy";

type Stage = {
  key: StageKey;
  label: string;
  promise: string;
  title: string;
  body: string;
};

const STAGES: Stage[] = [
  {
    key: "watch",
    label: "Watches",
    promise: "Content creates attention",
    title: "Know what content brings people in.",
    body: "See how many leads each post or Reel brings in and who they are.",
  },
  {
    key: "qualified",
    label: "Qualifies",
    promise: "Find the right people",
    title: "Know who needs attention.",
    body: "See who is qualified and why, so your team knows who to focus on first.",
  },
  {
    key: "click",
    label: "Clicks",
    promise: "Intent becomes action",
    title: "Know who clicks.",
    body: "See which links get clicked and who clicked them.",
  },
  {
    key: "book",
    label: "Books",
    promise: "Action becomes a call",
    title: "Know who books.",
    body: "See which leads booked a call and what brought them there.",
  },
  {
    key: "buy",
    label: "Buys",
    promise: "The path becomes revenue",
    title: "Know what turns into revenue.",
    body: "See which leads paid and where the sale came from.",
  },
];

/** Stage accent / tint colours (the prototype set them on `.stage[data-key]`; the card needs them too). */
const COLORS: Record<StageKey, { accent: string; tint: string }> = {
  watch: { accent: "#ec4899", tint: "#fde9f4" },
  qualified: { accent: "#f59e0b", tint: "#fff4da" },
  click: { accent: "#a855f7", tint: "#f3e8ff" },
  book: { accent: "#3b82f6", tint: "#e7f0fe" },
  buy: { accent: "#10b981", tint: "#e7f8f2" },
};

const ICONS: Record<StageKey, ReactNode> = {
  watch: (
    <svg viewBox="0 0 11 12" aria-hidden="true">
      <path d="M.249.068A.5.5 0 0 1 .748.066l9.333 5.333a.5.5 0 0 1 0 .868L.748 11.601A.5.5 0 0 1 0 11.167V.5A.5.5 0 0 1 .249.068Z" fill="#EC4899" />
    </svg>
  ),
  qualified: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#F59E0B" />
      <path
        d="M12.7528 5.14169C12.4498 4.51006 11.5496 4.51006 11.2466 5.14169L9.57535 8.62579L5.72635 9.13051C5.03407 9.22128 4.74637 10.0776 5.26136 10.5639L8.07487 13.2206L7.36872 17.0142C7.23885 17.7119 7.9766 18.23 8.58681 17.9006L11.9998 16.0579L15.4127 17.9006C16.0229 18.23 16.7606 17.7119 16.6308 17.0142L15.9246 13.2206L18.7381 10.5639C19.2531 10.0776 18.9654 9.22128 18.2731 9.13051L14.4241 8.62579L12.7528 5.14169Z"
        fill="white"
      />
    </svg>
  ),
  click: (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M6.914 4.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 1 1 1.25.826 2 2 0 0 0 3.086 2.515l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.061Zm-.89-3a3.5 3.5 0 0 1 5.397 4.402.75.75 0 1 1-1.25-.827 2 2 0 0 0-3.085-2.515l-2 2a2 2 0 0 0 0 2.829.75.75 0 1 1-1.06 1.061 3.5 3.5 0 0 1 0-4.95l2-2Z"
        fill="#A855F7"
      />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 21 22" aria-hidden="true">
      <path
        d="M16.25 0a1 1 0 0 1 1 1v.712c.697.232 1.293.586 1.799 1.133.777.84 1.123 1.903 1.289 3.234.162 1.305.162 2.978.162 5.111v.62c0 2.133 0 3.806-.162 5.111-.166 1.331-.512 2.393-1.29 3.234-.785.85-1.79 1.235-3.049 1.418-1.218.177-2.775.177-4.738.177H9.239c-1.963 0-3.52 0-4.738-.177-1.258-.183-2.264-.569-3.05-1.418-.777-.841-1.123-1.903-1.289-3.234C0 15.616 0 13.943 0 11.81v-.62c0-2.133 0-3.806.162-5.111.166-1.331.512-2.393 1.29-3.234.505-.547 1.101-.9 1.798-1.133V1a1 1 0 1 1 2 0v.344c1.09-.093 2.407-.094 3.989-.094h2.022c1.582 0 2.9.001 3.989.094V1a1 1 0 0 1 1-1ZM7.25 11a1 1 0 1 0 0 2v3a1 1 0 1 0 2 0v-3.6a1.4 1.4 0 0 0-1.4-1.4h-.6Zm4 0a1 1 0 1 0 0 2h.676l-.984 2.652a1 1 0 1 0 1.875.696l1.355-3.65A1.26 1.26 0 0 0 12.971 11H11.25Zm-7-5a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2h-12Z"
        fill="#3B82F6"
      />
    </svg>
  ),
  buy: (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M7 0a7 7 0 1 1 0 14A7 7 0 0 1 7 0Zm0 2a.75.75 0 0 0-.75.75V3h-.875a2.375 2.375 0 0 0 0 4.75h.875V9.5h-2.5a.75.75 0 0 0 0 1.5h2.5v.25a.75.75 0 0 0 1.5 0V11h.875a2.375 2.375 0 0 0 0-4.75H7.75V4.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-.25A.75.75 0 0 0 7 2Zm1.625 5.75a.875.875 0 1 1 0 1.75H7.75V7.75h.875Zm-2.375-1.5h-.875a.875.875 0 1 1 0-1.75h.875v1.75Z"
        fill="#10B981"
      />
    </svg>
  ),
};

const CLICK_ROWS = [
  { avatar: "a1", name: "mikecoach", clicked: false, time: "15m" },
  { avatar: "a3", name: "jessisca_jones", clicked: true, time: "31m" },
  { avatar: "a4", name: "devon_snr", clicked: false, time: "1hr" },
  { avatar: "a1", name: "mikecoach", clicked: false, time: "15m" },
  { avatar: "a3", name: "jessisca_jones", clicked: true, time: "31m" },
] as const;

/** "Link click activity" card: a looping list of link recipients with one lifted row (CSS animations). */
function ClickList() {
  const row = (r: (typeof CLICK_ROWS)[number] | { avatar: "a2"; name: string; clicked: false; time: string }, i: number, focus = false) => (
    <div key={i} className={`${s.clickRow} ${focus ? s.isFocus : ""}`}>
      <span className={`${s.clickAvatar} ${s[r.avatar]}`} />
      <span>
        <b>{r.name}</b>
        <small>calendly.com/coach/discovery</small>
        <em className={r.clicked ? s.clicked : undefined}>{r.clicked ? "●  Clicked" : "—  Unclicked"}</em>
      </span>
      <time>{r.time}</time>
    </div>
  );
  return (
    <div className={`${s.sourceAsset} ${s.clickList}`} aria-label="Link click activity">
      <div className={s.clickTrack}>{CLICK_ROWS.map((r, i) => row(r, i))}</div>
      {row({ avatar: "a2", name: "mike.coach", clicked: false, time: "4hrs" }, 99, true)}
    </div>
  );
}

const PAY_PATH = "M47 50V112H128M216 50V112H142M135 50V68M135 104V120M135 156V207M128 112H142";

/** "Payment attribution flow" card: Stripe / Whop / FanBasis -> ablefy -> Mochi with a pulse along the lines. */
function PaymentFlow() {
  return (
    <div className={`${s.sourceAsset} ${s.paymentFlow}`} aria-label="Payment attribution flow">
      <div className={s.paymentCanvas}>
        <svg className={s.payLines} viewBox="0 0 270 270" preserveAspectRatio="none" aria-hidden="true">
          <path d={PAY_PATH} />
          <path className={s.flowPulse} d={PAY_PATH} />
          <circle cx="135" cy="112" r="1.6" />
        </svg>
        <div className={s.payProviders}>
          <span>
            <Image src="/framer/yGx1oSHTn2e5QZSEERRFJTWS8.png" alt="" width={20} height={20} />
            Stripe
          </span>
          <span>
            <Image src="/framer/aM0Uec8sfegegPN76EdJyxTMzs.png" alt="" width={20} height={20} />
            Whop
          </span>
          <span>
            <Image src="/framer/pNRFeKfvLlR4GBHhjjfMfDRqAa8.png" alt="" width={20} height={20} />
            FanBasis
          </span>
        </div>
        <div className={s.payAblefy}>
          <Image src="/framer/gqp97J6v9VfHdsWOLhoqEfv4.png" alt="" width={20} height={20} />
          ablefy
        </div>
        <div className={s.payMochi}>
          <Image src="/framer/yzbynxAzMVDdieL9GcMkQZVwHx8.png" alt="" width={24} height={19} />
          Mochi
        </div>
        <div className={s.payTransaction}>
          <span className={s.buyerFace} />
          <span>
            <b>Rachel Greene</b>
            <small>Elite 12-Week</small>
          </span>
          <strong>
            +$20,312.00<small>Apr 11</small>
          </strong>
        </div>
      </div>
    </div>
  );
}

function BookingTimeline() {
  return (
    <div className={s.bookingTimeline} aria-label="Lead booking timeline">
      <div className={s.bookingLabel}>Lead timeline</div>
      <div className={s.bookingEvent}>
        <span className={s.bookingDot} aria-hidden="true" />
        <div>
          <strong>Calendar link sent</strong>
          <small>May 9 · 2:14 PM</small>
        </div>
      </div>
      <div className={s.bookingEvent}>
        <span className={s.bookingDot} aria-hidden="true" />
        <div>
          <strong>Booking page opened</strong>
          <small>May 9 · 2:21 PM</small>
        </div>
      </div>
      <div className={`${s.bookingEvent} ${s.isBooked}`}>
        <span className={s.bookingDot} aria-hidden="true" />
        <div>
          <strong>Call booked</strong>
          <small>May 9 · 2:24 PM</small>
        </div>
      </div>
      <div className={s.callDetail}>
        <div className={s.callDetailHead}>
          <strong>Discovery call</strong>
          <span>Booked</span>
        </div>
        <div className={s.callDetailMeta}>
          <span>Maya Chen</span>
          <span>May 15 · 11:00 AM</span>
          <span>45 min</span>
        </div>
      </div>
    </div>
  );
}

function Visual({ stage }: { stage: Stage }) {
  switch (stage.key) {
    case "watch":
      return (
        <div className={`${s.visual} ${s.reelImage}`}>
          <div className={s.reelFrame}>
            <Image src="/framer/7L00lyu1PwZHmYLeAZc44zlVSKw.png" alt="Mochi reel placeholder: This is what we do" fill sizes="220px" />
            <span className={s.reelPlay} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.6v12.8L18.2 12 8 5.6Z" />
              </svg>
            </span>
          </div>
          <div className={s.watchStats} aria-label="Reel performance">
            <div className={s.watchStat}>
              <small>Reel posted</small>
              <strong>May 8, 2026</strong>
            </div>
            <div className={s.watchStat}>
              <small>Total leads</small>
              <strong>78</strong>
            </div>
          </div>
        </div>
      );
    case "qualified":
      return (
        <div className={`${s.visual} ${s.artworkImage}`}>
          <Image src="/framer/xRcC5dD53H1PHJqgKZSGlo1HWvU.png" alt="Mochi qualified lead profile with qualification summary" fill sizes="340px" />
        </div>
      );
    case "click":
      return <ClickList />;
    case "book":
      return <BookingTimeline />;
    case "buy":
      return <PaymentFlow />;
  }
}

/** Card content for a stage: the visual (left / top) and the evidence block (right / bottom). */
function PanelContent({ stage }: { stage: Stage }) {
  return (
    <>
      <Visual stage={stage} />
      <div className={s.evidence}>
        <div>
          <div className={s.evidenceHeading}>
            <span className={`${s.stageIcon} ${stage.key === "watch" ? s.watch : ""}`} aria-hidden="true">
              {ICONS[stage.key]}
            </span>
            <h2>{stage.title}</h2>
          </div>
          <p>{stage.body}</p>
        </div>
        {stage.key === "watch" ? (
          <div className={`${s.source} ${s.metrics}`}>
            <span className={s.metric}>
              <small>Reel posted</small>
              <strong>May 8, 2026</strong>
            </span>
            <span className={s.metric}>
              <small>Total leads</small>
              <strong>78</strong>
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
}

/** Cards that are wider than the 390px reel card (artwork / click list / timeline / payments). */
const isWide = (key: StageKey) => key !== "watch";

const COMPACT_MAX = 920;

/**
 * "Viewer path" interaction (Framer embeds it as an HTML iframe): five stage icons (Watches, Qualifies, Clicks,
 * Books, Buys) on a rail. On desktop the rail starts collapsed with labels; hovering (or focusing / clicking) a stage
 * slides the other icons to the sides and the stage's icon morphs (clip-path circle -> rounded rect, 900ms) into a
 * card that follows the icon; leaving the section for 420ms folds it back (800ms). At 920px wide or less (the
 * container, not the viewport) it becomes five tabs with the card underneath and the first stage selected.
 */
export function ViewerPath() {
  const rootRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [active, setActive] = useState(-1);
  const [panelIndex, setPanelIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  const activeRef = useRef(-1);
  const collapsedRef = useRef(true);
  const compactRef = useRef(false);
  const closingRef = useRef(false);
  const closeToken = useRef(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const panelTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hoverSuppressedUntil = useRef(0);
  const lastHoverPoint = useRef<{ x: number; y: number } | null>(null);
  const trackFrame = useRef(0);
  const hasRendered = useRef(false);
  const panelIndexRef = useRef(0);

  // The handlers below only touch refs and the stable state setters, so they are created once.
  const [api] = useState(() => {
    const canHover = () => !compactRef.current && window.matchMedia("(hover: hover)").matches;

    const positionPanel = (index: number) => {
      cancelAnimationFrame(trackFrame.current);
      const panel = panelRef.current;
      const journey = journeyRef.current;
      if (!panel || !journey) return;
      if (index < 0 || compactRef.current) {
        panel.style.removeProperty("--panel-width");
        panel.style.setProperty("--panel-offset", "0px");
        return;
      }
      const railWidth = journey.getBoundingClientRect().width;
      const panelWidth = isWide(STAGES[index].key) ? Math.min(540, railWidth * 0.54) : Math.min(390, railWidth * 0.39);
      panel.style.setProperty("--panel-width", `${panelWidth}px`);
      const started = performance.now();
      const track = (now: number) => {
        const icon = iconRefs.current[index];
        if (!icon) return;
        const railRect = journey.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        const iconCenter = iconRect.left + iconRect.width / 2 - railRect.left;
        const offset = Math.max(0, Math.min(railRect.width - panelWidth, iconCenter - panelWidth / 2));
        panel.style.setProperty("--panel-offset", `${offset}px`);
        if (now - started < 1150) trackFrame.current = requestAnimationFrame(track);
      };
      track(performance.now());
    };

    const origin = (index: number) => {
      const panel = panelRef.current!;
      const icon = iconRefs.current[index]!;
      const panelRect = panel.getBoundingClientRect();
      const iconRect = icon.getBoundingClientRect();
      return { x: iconRect.left + iconRect.width / 2 - panelRect.left, y: iconRect.top + iconRect.height / 2 - panelRect.top };
    };

    const animateMorph = (index: number) => {
      const panel = panelRef.current;
      if (!panel || !iconRefs.current[index]) return;
      const { x, y } = origin(index);
      const animation = panel.animate(
        [
          { clipPath: `circle(24px at ${x}px ${y}px)`, borderRadius: "50%", opacity: 0, transform: "translateY(-4px) scale(.985)" },
          { clipPath: "inset(0 0 0 0 round 18px)", borderRadius: "18px", opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 900, easing: "cubic-bezier(.16, 1, .3, 1)", fill: "both" },
      );
      animation.finished
        .then(() => {
          panel.style.clipPath = "none";
          animation.cancel();
        })
        .catch(() => {});
    };

    const select = (index: number, initial = false) => {
      const panel = panelRef.current;
      if (!panel) return;
      const changed = !initial && (index !== activeRef.current || closingRef.current || collapsedRef.current);
      if (changed || (initial && closingRef.current)) {
        closeToken.current += 1;
        panel.getAnimations().forEach((animation) => animation.cancel());
        panel.style.removeProperty("clip-path");
        closingRef.current = false;
      }
      activeRef.current = index;
      collapsedRef.current = false;
      setActive(index);
      setCollapsed(false);
      clearTimeout(panelTimer.current);
      const render = () => {
        if (panelIndexRef.current !== index) {
          panelIndexRef.current = index;
          flushSync(() => setPanelIndex(index));
        }
        positionPanel(index);
      };
      if (!changed) {
        const wasEmpty = !hasRendered.current;
        hasRendered.current = true;
        render();
        if (wasEmpty) animateMorph(index);
        return;
      }
      hasRendered.current = true;
      panelTimer.current = setTimeout(() => {
        render();
        animateMorph(index);
      }, 0);
    };

    const collapseAll = () => {
      const panel = panelRef.current;
      if (!panel) return;
      if (compactRef.current) {
        select(activeRef.current >= 0 ? activeRef.current : 0);
        return;
      }
      if (activeRef.current < 0) {
        collapsedRef.current = true;
        setCollapsed(true);
        return;
      }
      if (closingRef.current) return;
      const closingIndex = activeRef.current;
      const token = ++closeToken.current;
      closingRef.current = true;
      panel.getAnimations().forEach((animation) => animation.cancel());
      panel.style.removeProperty("clip-path");
      const { x, y } = origin(closingIndex);
      const animation = panel.animate(
        [
          { clipPath: "inset(0 0 0 0 round 18px)", borderRadius: "18px", opacity: 1, transform: "translateY(0) scale(1)" },
          { clipPath: `circle(24px at ${x}px ${y}px)`, borderRadius: "50%", opacity: 0, transform: "translateY(-4px) scale(.985)" },
        ],
        { duration: 800, easing: "cubic-bezier(.4, 0, .2, 1)", fill: "both" },
      );
      animation.finished
        .then(() => {
          if (token !== closeToken.current) return;
          activeRef.current = -1;
          collapsedRef.current = true;
          setActive(-1);
          setCollapsed(true);
          panel.style.removeProperty("clip-path");
          animation.cancel();
          closingRef.current = false;
          lastHoverPoint.current = null;
        })
        .catch(() => {});
    };

    return { select, collapseAll, canHover };
  });

  // Compact (<= 920px container) vs desktop: decided from the measured width, like the prototype's matchMedia.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { select, collapseAll } = api;
    const measure = () => root.getBoundingClientRect().width <= COMPACT_MAX;

    compactRef.current = measure();
    if (compactRef.current) {
      activeRef.current = 0;
      select(0, true);
    } else {
      collapseAll();
    }

    const onResize = () => {
      const compact = measure();
      if (compact !== compactRef.current) {
        compactRef.current = compact;
        if (compact) select(0);
        else collapseAll();
        return;
      }
      if (compact) {
        if (activeRef.current < 0 || collapsedRef.current) select(0);
      } else if (activeRef.current >= 0) {
        // keep the card under its icon after a width change
        const panel = panelRef.current;
        const journey = journeyRef.current;
        const icon = iconRefs.current[activeRef.current];
        if (panel && journey && icon) {
          const railWidth = journey.getBoundingClientRect().width;
          const panelWidth = isWide(STAGES[activeRef.current].key) ? Math.min(540, railWidth * 0.54) : Math.min(390, railWidth * 0.39);
          panel.style.setProperty("--panel-width", `${panelWidth}px`);
          const railRect = journey.getBoundingClientRect();
          const iconRect = icon.getBoundingClientRect();
          const center = iconRect.left + iconRect.width / 2 - railRect.left;
          panel.style.setProperty("--panel-offset", `${Math.max(0, Math.min(railRect.width - panelWidth, center - panelWidth / 2))}px`);
        }
      }
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(root);
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(hoverTimer.current);
      clearTimeout(panelTimer.current);
      cancelAnimationFrame(trackFrame.current);
    };
  }, [api]);

  const onPointerEnter = (index: number) => (event: PointerEvent<HTMLButtonElement>) => {
    const { select, canHover } = api;
    if (!canHover()) return;
    const recovering = closingRef.current || activeRef.current < 0;
    const last = lastHoverPoint.current;
    const moved = !last || Math.hypot(event.clientX - last.x, event.clientY - last.y) > 18;
    if (!recovering && Date.now() < hoverSuppressedUntil.current && !moved) return;
    clearTimeout(hoverTimer.current);
    const point = { x: event.clientX, y: event.clientY };
    hoverTimer.current = setTimeout(() => {
      lastHoverPoint.current = point;
      hoverSuppressedUntil.current = Date.now() + 1050;
      select(index);
    }, 220);
  };

  const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + STAGES.length) % STAGES.length;
    buttonRefs.current[next]?.focus();
  };

  const panelStage = STAGES[panelIndex];
  const colors = COLORS[panelStage.key];

  return (
    <div ref={rootRef} className={s.root}>
      <div
        className={s.section}
        onMouseLeave={() => {
          const { collapseAll, canHover } = api;
          clearTimeout(hoverTimer.current);
          if (canHover()) hoverTimer.current = setTimeout(collapseAll, 420);
        }}
      >
        <div ref={journeyRef} className={s.journey} role="tablist" aria-label="Viewer journey" data-active={active}>
          {STAGES.map((stage, index) => (
            <button
              key={stage.key}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              className={s.stage}
              type="button"
              role="tab"
              id={`stage-${stage.key}`}
              data-key={stage.key}
              aria-selected={index === active}
              onPointerEnter={onPointerEnter(index)}
              onFocus={() => {
                const { select, canHover } = api;
                if (canHover()) select(index);
              }}
              onClick={() => api.select(index)}
              onKeyDown={onKeyDown(index)}
            >
              <span className={s.stageHead}>
                <span
                  ref={(node) => {
                    iconRefs.current[index] = node;
                  }}
                  className={s.icon}
                  aria-hidden="true"
                >
                  {ICONS[stage.key]}
                </span>
                <span className={s.labelWrap}>
                  <span className={s.label}>{stage.label}</span>
                  <span className={s.promise}>{stage.promise}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
        <div
          ref={panelRef}
          className={`${s.panel} ${collapsed ? s.collapsed : ""}`}
          style={{ "--accent": colors.accent, "--tint": colors.tint } as CSSProperties}
          aria-live="polite"
        >
          <PanelContent stage={panelStage} />
        </div>
      </div>
    </div>
  );
}
