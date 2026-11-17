/**
 * The free book every signup receives. Single source of truth for the teaser
 * in SectionFinalCTA and the download block in SignupSuccess.
 *
 * To replace the book: drop the new PDF and cover at `pdfPath` / `coverPath`
 * under `public/` (or change the paths here) and update the text fields.
 */
const freeBook = Object.freeze({
  title: "Material and Spiritual",
  subtitle: "A deeper perspective through the ancient wisdom of Kabbalah",
  author: "Shamir Galsurkar",
  pages: 23,
  pdfPath: "/downloads/material-and-spiritual.pdf",
  coverPath: "/book/material-and-spiritual-cover-224.webp",
  coverWidth: 224,
  coverHeight: 336,
  downloadName: "Material-and-Spiritual.pdf",
});

export const useFreeBook = () => freeBook;
