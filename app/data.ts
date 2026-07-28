export const clans = [
  { rank: 1, name: "Xclusive", slug: "xclusive", game: "CODM", region: "Europe", members: "28/30", rate: "78%", points: "12,460", badge: "XC", status: "Recruiting" },
  { rank: 2, name: "Immortals", slug: "immortals", game: "PUBG", region: "MENA", members: "30/30", rate: "75%", points: "11,230", badge: "IM", status: "Invite only" },
  { rank: 3, name: "7DS Esports", slug: "7ds-esports", game: "CODM", region: "Global", members: "29/30", rate: "72%", points: "10,120", badge: "7D", status: "Applications" },
  { rank: 4, name: "Unstoppable", slug: "unstoppable", game: "Free Fire", region: "LATAM", members: "30/30", rate: "70%", points: "9,450", badge: "UP", status: "Recruiting" },
  { rank: 5, name: "Nova Esports", slug: "nova-esports", game: "PUBG", region: "Europe", members: "24/30", rate: "68%", points: "8,910", badge: "NV", status: "Recruiting" },
];

export const tournaments = [
  { name: "CODM Championship", slug: "codm-championship", tag: "Upcoming", prize: "$5,000", date: "May 25, 2026", teams: "32/64", game: "CODM", format: "Double elimination" },
  { name: "PUBG Mobile Cup", slug: "pubg-mobile-cup", tag: "Live now", prize: "$3,000", date: "May 18, 2026", teams: "24/48", game: "PUBG", format: "Group stage" },
  { name: "Free Fire Arena", slug: "free-fire-arena", tag: "Upcoming", prize: "$2,000", date: "May 30, 2026", teams: "16/32", game: "Free Fire", format: "Single elimination" },
];

export const matches = [
  { id: "ca-1024", left: "Xclusive", score: "15 - 12", right: "Nova", state: "Victory", game: "CODM", status: "Result confirmed" },
  { id: "ca-1025", left: "Immortals", score: "08 - 10", right: "7DS", state: "Defeat", game: "PUBG", status: "Evidence review" },
  { id: "ca-1026", left: "Unstoppable", score: "13 - 07", right: "Dark Knights", state: "Victory", game: "Free Fire", status: "Completed" },
];

export const challenges = [
  { id: "ch-2001", challenger: "PlayerOne", game: "CODM", type: "Player vs player", size: "1v1", weaponClass: "Assault Rifle", weapon: "DR-H", map: "Firing Range", mode: "Gunfight", region: "Europe", status: "Open", prize: "No prize" },
  { id: "ch-2002", challenger: "Xclusive", game: "CODM", type: "Clan vs clan", size: "5v5", weaponClass: "Mixed weapons", weapon: "Any weapon", map: "Best of three veto", mode: "Search and Destroy", region: "Europe", status: "Negotiating", prize: "Platform points" },
  { id: "ch-2003", challenger: "GhostKing", game: "PUBG", type: "Team vs team", size: "2v2", weaponClass: "Sniper", weapon: "Any sniper", map: "Opponent chooses", mode: "Custom Room", region: "Middle East", status: "Pending response", prize: "No prize" },
];

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
    stats: ["142 open challenges", "18 tournaments", "2,356 clans"],
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
    stats: ["88 open rooms", "12 tournaments", "1,982 clans"],
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
    stats: ["104 open challenges", "15 tournaments", "1,245 guilds"],
    weapons: ["Assault Rifle", "SMG", "Sniper", "Shotgun", "Pistol", "Melee", "Any weapon"],
    maps: ["Bermuda", "Purgatory", "Kalahari", "Alpine", "Nexterra"],
    modes: ["Clash Squad", "Battle Royale", "Custom Room", "Guild vs Guild", "Ranked Challenge", "Friendly Challenge"],
    vendor: "Diamond vendors",
  },
];

export const clips = [
  { title: "Insane 1v4 Clutch", creator: "XCL Venom", game: "CODM", views: "1.2K", likes: "230" },
  { title: "Final Circle Rotation", creator: "GhostKing", game: "PUBG", views: "980", likes: "146" },
  { title: "Sniper Ace Defense", creator: "NoFear", game: "CODM", views: "760", likes: "119" },
];
