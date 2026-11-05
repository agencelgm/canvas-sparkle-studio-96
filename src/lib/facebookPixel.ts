
export const FACEBOOK_PIXEL_ID = "673688814007270";

type Fbq = ((...args: unknown[]) => void) | undefined;

export const readFbCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
};

/** Pixel navigateur "Lead" — meme identifiant que l'envoi serveur, une seule fois par soumission. */
export const firePixelLeadOnce = (eventId: string) => {
  try {
    const key = `lgm_fb_${eventId}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch { /* stockage indisponible */ }
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  fbq?.("track", "Lead", { content_name: "Qualification agence" }, { eventID: eventId });
};
