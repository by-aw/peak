/**
 * Framer applies these Inter stylistic sets to most Updates copy (rich text, card excerpts / dates / labels,
 * "Read more", chips, the hero badge). They change glyph shapes (single-storey a, open 6/9...) and make the text
 * ~0.8% wider, which moves line breaks, so they must be set wherever the live site sets them.
 */
export const interFeatures = "[font-feature-settings:'blwf','cv03','cv04','cv09','cv11']";
/** Tablet-only variant: the tablet "Other Updates" card title/date carry the features, the desktop/phone ones do not. */
export const interFeaturesMd = "md:[font-feature-settings:'blwf','cv03','cv04','cv09','cv11'] lg:[font-feature-settings:normal]";
