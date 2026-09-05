import { coreClans, coreClips, coreMatches, coreTournaments } from "./competitive-core";

export type PublicClan = {
  rank: number;
  name: string;
  slug: string;
  game: string;
  region: string;
  members: string;
  rate: string;
  points: string;
  badge: string;
  status: string;
};

export type PublicTournament = {
  name: string;
  slug: string;
  tag: string;
  prize: string;
  date: string;
  teams: string;
  game: string;
  format: string;
};

export type PublicMatch = {
  id: string;
  left: string;
  score: string;
  right: string;
  state: string;
  game: string;
  status: string;
};

export type PublicChallenge = {
  id: string;
  challenger: string;
  game: string;
  type: string;
  size: string;
  weaponClass: string;
  weapon: string;
  map: string;
  mode: string;
  region: string;
  status: string;
  prize: string;
};

export const adminConfig = {
  wagerFeatureFlag: "disabled_pending_legal_review",
  wagerLimits: [
    "Country and currency",
    "Game and match type",
    "User age and verification level",
    "Account age and reputation",
    "Team size and manual approval",
  ],
  challengeTaxonomy: [
    "Games",
    "Weapon classes",
    "Specific weapons",
    "Maps",
    "Game modes",
    "Team sizes",
    "Match rules",
  ],
};

export const games = [
  {
    name: "Call of Duty: Mobile",
    slug: "codm",
    short: "CODM",
    art: "/images/games/codm/codm-hero.svg",
    theme: "codm",
    accent: "CODM yellow tactical accent",
    stats: ["Challenges supported", "Tournaments supported", "Clan profiles supported"],
    weapons: ["Assault Rifle", "SMG", "Sniper", "Shotgun", "LMG", "Marksman Rifle", "Pistol", "Melee"],
    maps: ["Nuketown", "Shipment", "Raid", "Rust", "Terminal", "Shoot House", "Firing Range", "Standoff", "Summit", "Crash"],
    modes: ["Gunfight", "Search and Destroy", "Hardpoint", "Domination", "Team Deathmatch", "Free for All"],
    vendor: "COD Points vendors",
  },
  {
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    short: "PUBG",
    art: "/images/games/pubg/pubg-hero.svg",
    theme: "pubg",
    accent: "Battlefield, blue zone and esports accent",
    stats: ["Challenges supported", "Tournaments supported", "Clan profiles supported"],
    weapons: ["Assault Rifle", "DMR", "Sniper", "SMG", "Shotgun", "Pistol", "Throwable"],
    maps: ["Erangel", "Miramar", "Sanhok", "Livik", "Nusa", "Arena Warehouse"],
    modes: ["Battle Royale", "1v1 Arena", "2v2 Arena", "4v4 Arena", "Team Deathmatch", "Custom Room"],
    vendor: "UC vendors",
  },
  {
    name: "Free Fire",
    slug: "free-fire",
    short: "Free Fire",
    art: "/images/games/free-fire/free-fire-hero.svg",
    theme: "free-fire",
    accent: "Orange, red and electric-blue battle style",
    stats: ["Challenges supported", "Tournaments supported", "Guild profiles supported"],
    weapons: ["Assault Rifle", "SMG", "Sniper", "Shotgun", "Pistol", "Melee", "Any weapon"],
    maps: ["Bermuda", "Purgatory", "Kalahari", "Alpine", "Nexterra"],
    modes: ["Clash Squad", "Battle Royale", "Custom Room", "Guild vs Guild", "Ranked Challenge", "Friendly Challenge"],
    vendor: "Diamond vendors",
  },
];

export type PublicClip = {
  title: string;
  creator: string;
  game: string;
};

export const clans: PublicClan[] = coreClans.map((clan) => ({
  rank: clan.ranking,
  name: clan.name,
  slug: clan.slug,
  game: clan.game,
  region: clan.region,
  members: String(clan.members),
  rate: `${clan.winRate}%`,
  points: String(Math.max(0, 5000 - clan.ranking * 340)),
  badge: clan.tag,
  status: clan.status,
}));

export const tournaments: PublicTournament[] = coreTournaments.map((tournament) => ({
  name: tournament.name,
  slug: tournament.slug,
  tag: tournament.status,
  prize: tournament.prize,
  date: tournament.startsAt,
  teams: tournament.entrants.split("/")[0] ?? "0",
  game: tournament.game,
  format: tournament.format,
}));

export const matches: PublicMatch[] = coreMatches.map((match) => ({
  id: match.id,
  left: match.teamA,
  score: match.score,
  right: match.teamB,
  state: match.lifecycle,
  game: match.game,
  status: match.lifecycle,
}));

export const challenges: PublicChallenge[] = [
  {
    id: "queue-codm-master-1v1",
    challenger: "Raiden",
    game: "CODM",
    type: "Ranked",
    size: "1v1",
    weaponClass: "Assault Rifle",
    weapon: "DR-H",
    map: "Raid",
    mode: "Gunfight",
    region: "EU West",
    status: "Open",
    prize: "Rank points and XP",
  },
  {
    id: "queue-pubg-arena-4v4",
    challenger: "Accra Wolves",
    game: "PUBG Mobile",
    type: "Team vs team",
    size: "4v4",
    weaponClass: "Assault Rifle",
    weapon: "M416",
    map: "Arena Warehouse",
    mode: "4v4 Arena",
    region: "Africa West",
    status: "Open",
    prize: "Scrim rating",
  },
  {
    id: "queue-free-fire-clash",
    challenger: "Cape Valkyries",
    game: "Free Fire",
    type: "Clan vs clan",
    size: "4v4",
    weaponClass: "Any weapon",
    weapon: "Team rules",
    map: "Bermuda",
    mode: "Clash Squad",
    region: "Africa South",
    status: "Open",
    prize: "XP and badge progress",
  },
];

export const clips: PublicClip[] = coreClips.map((clip) => ({
  title: clip.title,
  creator: clip.creator,
  game: clip.game,
}));
