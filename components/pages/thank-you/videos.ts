/**
 * Wistia videos of the /thank-you "Frequently Asked Questions" (objection-handling clips, 16:9) and "Watch the videos below to
 * see how we use Mochi" (product walkthroughs, 4:3) sections. `thumb` is the Wistia delivery hash of the video's poster, mirrored
 * to `public/framer/<hash>.jpg` (live fetches it from Wistia's oEmbed at runtime and sets the card height from the video's
 * aspect ratio, so the 4:3 cards are 443px tall at 590px wide).
 */
export type VideoEntry = { mediaId: string; thumb: string; title: string };

export const FAQ_VIDEOS: VideoEntry[] = [
  { mediaId: "2f46erezq9", thumb: "f24371c4baa87478f62f7d2cdb0d1bd3", title: "What If I Already Use ManyChat, GoHighLevel, Or Another Tool?" },
  { mediaId: "t811o58jpa", thumb: "2cd14c81396484c037993318d8f45d41", title: "How much is the investment?" },
  { mediaId: "b8dyy6oczj", thumb: "96302cc022a1b5e7d3df86f0cf7d97a9", title: "What If Mochi Is Not A Good Fit?" },
  { mediaId: "fumsgnh0l0", thumb: "5b428ec4bd2bc65f26d4e2170cbd1672", title: "What If My Team Is Not Technical Enough?" },
  { mediaId: "50toycsarz", thumb: "19d1838e012af3bb7e72185e72e4eba6", title: "Will This Replace My Setters?" },
  { mediaId: "lcgkxd3i21", thumb: "5cd894b049494c90ba7b487931ccdfd7", title: "Top 3 Reason Why People Stop Using Mochi" },
];

export const WALKTHROUGH_VIDEOS: VideoEntry[] = [
  { mediaId: "q02ylrsojx", thumb: "dda0102a3b6e774827d3f7bfe14c7644", title: "AI Voice Clone" },
  { mediaId: "9bzbgizuby", thumb: "7d099ee95917bfdab1e21b95c6dea4c7", title: "Claude x Mochi" },
  { mediaId: "cnz71jzk83", thumb: "4cbaa54dea952786a7b482d476601d9b", title: "Priority Inbox & Script Testing" },
  { mediaId: "02s7c7e0gd", thumb: "a35e1ace26ed79a85ef9cdbf28df6693", title: "Lead Tags & Dashboard" },
  { mediaId: "k3vw29mmu9", thumb: "f2022465f1c3d3eb66776b47a1c9ad34", title: "AI Tags" },
  { mediaId: "7nzyoskka6", thumb: "fa617e0dd4ba9a1e39c89a89ecbc0a5e", title: "Prompt Your Replies" },
  { mediaId: "tadij1enxn", thumb: "d2a53a5dcef73ddf0bbf0fe1c9212df7", title: "Scheduled Messages" },
  { mediaId: "5e05l5yci0", thumb: "3b2803ad81ff8fee52b3a0e0d0dbfe06", title: "Performance Dashboard" },
  { mediaId: "k2kd9hz8eu", thumb: "0e3b641a3ab16e369da0fb6548a16353", title: "Lead Filters" },
  { mediaId: "5gnz1u3n6n", thumb: "c4e8b4c882537a38340d18b41f55f012", title: "Custom Funnels" },
];
