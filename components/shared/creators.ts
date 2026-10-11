/** A creator card of the 3D ring: the name shown on the card and the photo (`/public` path). */
export type CarouselCreator = { name: string; src: string };

/**
 * Creators shown on the feature pages' "Trust Section 2" ring (Framer order) and on the /book-dm-audit ring. Lives in a plain
 * module (the carousel is a client component, so server components could not import the data from it).
 */
export const FEATURE_CREATORS: CarouselCreator[] = [
  { name: "vnce", src: "/framer/HJL0Rja9qauJ2daMPeDB3YawVfw.png" },
  { name: "difaino", src: "/framer/Maau1tzRYHn1dEGpAskQtAyvJNQ.png" },
  { name: "nik setting", src: "/framer/7LJdHP5s0pYuhW9QZBL9aOLBVgk.jpg" },
  { name: "joshua kaats", src: "/framer/ENiCevUgtsoy3C7K8rIDTMgLfzc.png" },
  { name: "fxalex", src: "/framer/3WsqBhn75h8NjEqcwnNnORpnOXc.png" },
  { name: "alex eubank", src: "/framer/zOHqiJ0yml47Nkd0W65bZXfwn8.png" },
  { name: "daniel budden", src: "/framer/9nvCPQyjj4cBxceAbvGVMmXGwY.jpg" },
  { name: "ebrahim", src: "/framer/uCBQMrfxN3Jq5nzwmLmOko7evEA.png" },
  { name: "maxxinhouse", src: "/framer/w9hoSnD21kTcj0vCVIsMGwDqDp0.jpg" },
];
