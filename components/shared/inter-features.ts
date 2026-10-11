/**
 * Framer applies these Inter stylistic sets to the text styles of most pages (Updates rich text, card excerpts / dates /
 * labels, "Read more", chips, the hero badge, the legal documents, the /partner presets...). They change glyph shapes
 * (single-storey a, open 6/9...) and make the text ~0.5-0.8% wider, which moves line breaks, so they must be set wherever
 * the live site sets them. (/partner used to spell the same sets `'blwf'_on,...`; Chrome computes both to the same value.)
 */
export const interFeatures = "[font-feature-settings:'blwf','cv03','cv04','cv09','cv11']";
/** Tablet-only variant: the tablet "Other Updates" card title/date carry the features, the desktop/phone ones do not. */
export const interFeaturesMd = "md:[font-feature-settings:'blwf','cv03','cv04','cv09','cv11'] lg:[font-feature-settings:normal]";
