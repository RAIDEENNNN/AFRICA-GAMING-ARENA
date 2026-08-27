export const marketplaceCategories = [
  {
    slug: "cod-points",
    label: "COD Points",
    title: "COD POINTS",
    copy: "Approved Call of Duty: Mobile top-up vendor discovery. Real purchases stay disabled until vendor verification, payment review and regional rules are connected.",
    tone: "gold",
    items: ["Official-style top-up request", "Regional vendor review", "Receipt and fulfilment tracking"],
  },
  {
    slug: "pubg-uc",
    label: "PUBG UC",
    title: "PUBG UC",
    copy: "PUBG Mobile UC vendor discovery with no direct checkout. AGA should only list reviewed providers after payment and moderation controls exist.",
    tone: "cyan",
    items: ["UC vendor applications", "Player support trail", "Manual review before fulfilment"],
  },
  {
    slug: "free-fire-diamonds",
    label: "Free Fire Diamonds",
    title: "FREE FIRE DIAMONDS",
    copy: "Free Fire diamond vendor discovery for approved providers. No account trading, unsafe escrow or instant payments are enabled.",
    tone: "purple",
    items: ["Diamond top-up interest", "Garena ID verification planning", "Support-first vendor contact"],
  },
  {
    slug: "coaching",
    label: "Coaching",
    title: "COACHING",
    copy: "Find reviewed coaches for aim, rotations, custom rooms, tournament preparation and role training.",
    tone: "gold",
    items: ["CODM ranked coaching", "PUBG Mobile rotation review", "Free Fire team strategy"],
  },
  {
    slug: "graphics",
    label: "Graphics",
    title: "GRAPHICS",
    copy: "Creator services for clan logos, banners, tournament posters, stream overlays and profile visuals.",
    tone: "purple",
    items: ["Clan badge packs", "Tournament poster design", "Profile banner requests"],
  },
  {
    slug: "editing",
    label: "Editing",
    title: "EDITING",
    copy: "Clip editing, montage cuts, short-form highlights and event recap support from approved creator profiles.",
    tone: "cyan",
    items: ["Highlight edits", "Tournament recap videos", "Creator package requests"],
  },
  {
    slug: "tournament-services",
    label: "Tournament Services",
    title: "TOURNAMENT SERVICES",
    copy: "Caster, moderator, bracket manager and observer support for organisers building serious events on AGA.",
    tone: "gold",
    items: ["Caster request", "Bracket admin support", "Evidence moderator support"],
  },
  {
    slug: "verified-vendors",
    label: "Verified Vendors",
    title: "VERIFIED VENDORS",
    copy: "A trust layer for marketplace providers once admin verification, dispute handling and vendor profiles are connected.",
    tone: "purple",
    items: ["Manual vendor approval", "Public vendor profile", "Support and dispute history"],
  },
] as const;

export type MarketplaceCategory = (typeof marketplaceCategories)[number];

export function findMarketplaceCategory(slug: string): MarketplaceCategory {
  return marketplaceCategories.find((category) => category.slug === slug) ?? marketplaceCategories[0];
}
