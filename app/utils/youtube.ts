// YouTube's hqdefault still is ~10-30 KB; the carousel's default for Shorts
// (oar2) is 90-280 KB per video, too heavy for slow phones.
export const lightStill = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
