export type CoreGame = "CODM" | "PUBG Mobile" | "Free Fire";
export type TeamSize = "1v1" | "2v2" | "4v4" | "5v5";
export type PlayerRole = "IGL" | "Slayer" | "Sniper" | "Support" | "Flex" | "Entry" | "Anchor";
export type RankTier = "Unranked" | "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Master" | "Grandmaster" | "Champion";
export type MatchLifecycle = "Created" | "Waiting" | "Check-In" | "Ready" | "Live" | "Result Pending" | "Under Review" | "Completed" | "Cancelled";
export type TournamentStatus = "Draft" | "Registration Open" | "Registration Closed" | "Check-In" | "Live" | "Completed" | "Cancelled";
export type AchievementRarity = "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";

export const rankTiers: Array<{ tier: RankTier; minMmr: number; accent: string }> = [
  { tier: "Unranked", minMmr: 0, accent: "muted" },
  { tier: "Bronze", minMmr: 700, accent: "bronze" },
  { tier: "Silver", minMmr: 900, accent: "silver" },
  { tier: "Gold", minMmr: 1100, accent: "gold" },
  { tier: "Platinum", minMmr: 1300, accent: "cyan" },
  { tier: "Diamond", minMmr: 1500, accent: "cyan" },
  { tier: "Master", minMmr: 1700, accent: "purple" },
  { tier: "Grandmaster", minMmr: 1900, accent: "purple" },
  { tier: "Champion", minMmr: 2150, accent: "gold" },
];

export const currentSeason = {
  id: "aga-s2",
  name: "AGA Season 2",
  previous: "AGA Season 1",
  resetModel: "Soft reset: returning players keep 70% of MMR above 1000 and replay placements.",
  startsAt: "2026-09-01",
  endsAt: "2026-11-30",
};

export type CorePlayer = {
  id: string;
  gamerTag: string;
  username: string;
  country: string;
  region: string;
  verified: boolean;
  mainGame: CoreGame;
  secondaryGames: CoreGame[];
  clanSlug: string;
  clanName: string;
  role: PlayerRole;
  level: number;
  xp: number;
  mmr: number;
  rankPoints: number;
  placementMatches: number;
  peakRank: RankTier;
  leaderboardPosition: number;
  reputationScore: number;
  sportsmanshipRating: number;
  tournamentWins: number;
  totalMatches: number;
  wins: number;
  losses: number;
  mvpCount: number;
  followers: number;
  following: number;
  currentStreak: number;
  bestStreak: number;
  rankMovement: number;
  availability: string;
  language: string;
  tournamentExperience: string;
  clanHistory: string;
};

export const corePlayers: CorePlayer[] = [
  player("p01", "Raiden", "raiden", "United Kingdom", "EU West", true, "CODM", ["PUBG Mobile"], "xclusive", "XCLusive", "IGL", 38, 42840, 1818, 420, 0, "Master", 1, 96, 94, 6, 214, 142, 72, 39, 1280, 311, 4, 11, 2, "Weeknights 19:00-23:00", "English", "CMA finalist, AGA launch ladder", "XCLusive since 2025"),
  player("p02", "NovaAce", "novaace", "Nigeria", "Africa West", true, "CODM", ["Free Fire"], "lagos-titans", "Lagos Titans", "Slayer", 34, 36120, 1744, 366, 0, "Master", 2, 91, 89, 4, 188, 121, 67, 31, 920, 208, 3, 9, 1, "Daily evenings", "English, Yoruba", "Open qualifier champion", "Lagos Titans academy graduate"),
  player("p03", "KairoVex", "kairovex", "Ghana", "Africa West", true, "PUBG Mobile", ["CODM"], "accra-wolves", "Accra Wolves", "Flex", 31, 30900, 1698, 332, 0, "Diamond", 3, 88, 92, 3, 164, 106, 58, 24, 741, 182, 2, 8, 3, "Friday-Sunday", "English, Twi", "PUBG Mobile cup finalist", "Accra Wolves captain"),
  player("p04", "ZuriStorm", "zuristorm", "South Africa", "Africa South", true, "Free Fire", ["PUBG Mobile"], "cape-valkyries", "Cape Valkyries", "Entry", 29, 28740, 1642, 291, 0, "Diamond", 4, 86, 90, 2, 152, 97, 55, 19, 690, 166, 1, 7, -1, "Weekends", "English, Zulu", "Free Fire regional top 8", "Cape Valkyries founder"),
  player("p05", "LagosPhantom", "lagosphantom", "Nigeria", "Africa West", false, "CODM", ["PUBG Mobile"], "lagos-titans", "Lagos Titans", "Sniper", 27, 24950, 1584, 252, 1, "Diamond", 5, 84, 87, 1, 141, 88, 53, 18, 602, 134, 2, 6, 4, "Mon/Wed/Sat", "English", "CMA weekly top 4", "Joined Lagos Titans 2026"),
  player("p06", "AccraPulse", "accrapulse", "Ghana", "Africa West", false, "CODM", ["Free Fire"], "accra-wolves", "Accra Wolves", "Support", 25, 22100, 1532, 220, 2, "Diamond", 6, 82, 93, 1, 133, 82, 51, 13, 488, 121, 1, 5, 1, "Evenings", "English", "Two local finals", "Accra Wolves"),
  player("p07", "CapeGhost", "capeghost", "South Africa", "Africa South", true, "PUBG Mobile", ["Free Fire"], "cape-valkyries", "Cape Valkyries", "Anchor", 24, 21030, 1488, 197, 2, "Platinum", 7, 80, 91, 1, 126, 77, 49, 12, 430, 97, 0, 5, -2, "Late nights", "English, Afrikaans", "PUBG invitational groups", "Cape Valkyries"),
  player("p08", "NairobiNova", "nairobionova", "Kenya", "Africa East", true, "Free Fire", ["CODM"], "nairobi-reapers", "Nairobi Reapers", "IGL", 24, 20780, 1464, 185, 3, "Platinum", 8, 79, 90, 1, 119, 73, 46, 16, 402, 88, 2, 6, 5, "Daily 18:00-21:00", "English, Swahili", "Guild league winner", "Nairobi Reapers"),
  player("p09", "MambaScope", "mambascope", "Kenya", "Africa East", false, "CODM", ["PUBG Mobile"], "nairobi-reapers", "Nairobi Reapers", "Sniper", 22, 18800, 1418, 166, 3, "Platinum", 9, 76, 88, 0, 101, 61, 40, 11, 344, 76, 0, 4, 2, "Weeknights", "English, Swahili", "Qualifier regular", "Open to transfer"),
  player("p10", "DeltaRift", "deltarift", "Nigeria", "Africa West", false, "PUBG Mobile", ["Free Fire"], "sahara-pulse", "Sahara Pulse", "Entry", 21, 17140, 1372, 144, 4, "Platinum", 10, 75, 86, 0, 96, 58, 38, 9, 306, 72, 1, 4, 0, "Flexible", "English", "Arena league playoffs", "Sahara Pulse trial"),
  player("p11", "VantaSlayer", "vantaslayer", "Egypt", "MENA", true, "CODM", ["Free Fire"], "sahara-pulse", "Sahara Pulse", "Slayer", 20, 16220, 1330, 131, 4, "Gold", 11, 74, 85, 0, 89, 53, 36, 8, 280, 66, 0, 4, -3, "Weekends", "Arabic, English", "CODM ladder grinder", "Independent"),
  player("p12", "EchoSaint", "echosaint", "Morocco", "MENA", false, "Free Fire", ["CODM"], "atlas-byte", "Atlas Byte", "Flex", 19, 15410, 1296, 118, 5, "Gold", 12, 73, 87, 0, 83, 49, 34, 7, 251, 61, 1, 3, 6, "Afternoons", "Arabic, French", "Community cup winner", "Atlas Byte"),
  player("p13", "RaptorIQ", "raptoriq", "Uganda", "Africa East", false, "PUBG Mobile", ["CODM"], "nairobi-reapers", "Nairobi Reapers", "Support", 18, 14200, 1260, 102, 5, "Gold", 13, 72, 91, 0, 77, 45, 32, 6, 230, 59, 0, 3, 2, "Scrim nights", "English", "Analyst/player hybrid", "Nairobi Reapers academy"),
  player("p14", "KuduFlex", "kuduflex", "Botswana", "Africa South", false, "Free Fire", ["PUBG Mobile"], "cape-valkyries", "Cape Valkyries", "Flex", 17, 13140, 1222, 94, 6, "Gold", 14, 71, 89, 0, 72, 41, 31, 5, 214, 51, 1, 3, 1, "Weekends", "English, Setswana", "Guild academy", "Cape Valkyries academy"),
  player("p15", "BlitzNomad", "blitznomad", "Senegal", "Africa West", false, "CODM", ["Free Fire"], "atlas-byte", "Atlas Byte", "Entry", 16, 12280, 1198, 82, 6, "Gold", 15, 70, 84, 0, 69, 39, 30, 4, 188, 45, 0, 3, -1, "Evenings", "French, English", "CODM open ladder", "Looking for team"),
  player("p16", "AtlasByte", "atlasbyte", "Morocco", "MENA", true, "PUBG Mobile", ["CODM"], "atlas-byte", "Atlas Byte", "IGL", 15, 11660, 1160, 72, 7, "Silver", 16, 69, 88, 0, 61, 34, 27, 4, 166, 41, 0, 3, 0, "Fri/Sat", "Arabic, French", "PUBG groups", "Atlas Byte owner"),
  player("p17", "RogueMusa", "roguemusa", "Nigeria", "Africa West", false, "Free Fire", ["CODM"], "lagos-titans", "Lagos Titans", "Support", 14, 10120, 1112, 58, 7, "Silver", 17, 68, 90, 0, 56, 31, 25, 3, 142, 38, 0, 2, 3, "Daily", "English, Hausa", "Free Fire grassroots", "Lagos Titans academy"),
  player("p18", "SierraByte", "sierrabyte", "Sierra Leone", "Africa West", false, "CODM", ["PUBG Mobile"], "sahara-pulse", "Sahara Pulse", "Anchor", 12, 8800, 1048, 43, 8, "Silver", 18, 65, 82, 0, 49, 26, 23, 2, 101, 31, 0, 2, -2, "Weekends", "English", "New competitor", "Independent"),
  player("p19", "AshantiAim", "ashantiaim", "Ghana", "Africa West", false, "CODM", ["Free Fire"], "accra-wolves", "Accra Wolves", "Slayer", 11, 7600, 988, 28, 8, "Bronze", 19, 64, 86, 0, 41, 21, 20, 1, 84, 24, 0, 2, 1, "After school hours", "English, Twi", "Placement player", "Accra Wolves academy"),
  player("p20", "SaharaPeak", "saharapeak", "Algeria", "MENA", false, "PUBG Mobile", ["Free Fire"], "sahara-pulse", "Sahara Pulse", "Sniper", 9, 6100, 920, 15, 9, "Bronze", 20, 62, 83, 0, 34, 17, 17, 1, 68, 20, 0, 2, 0, "Flexible", "Arabic, French", "Placement player", "Sahara Pulse academy"),
];

export type CoreClan = {
  id: string;
  name: string;
  slug: string;
  tag: string;
  game: CoreGame;
  country: string;
  region: string;
  founded: string;
  members: number;
  record: string;
  trophies: number;
  ranking: number;
  winRate: number;
  status: "Recruiting" | "Invite only" | "Academy open";
  logo: string;
  banner: string;
  roles: Array<{ name: string; role: "Owner" | "Manager" | "Captain" | "Coach" | "Analyst" | "Player" | "Academy Player" }>;
};

export const coreClans: CoreClan[] = [
  clan("cl01", "XCLusive", "xclusive", "XCL", "CODM", "United Kingdom", "EU West", "Jan 2025", 28, "142-72", 12, 1, 66, "Invite only", "X"),
  clan("cl02", "Lagos Titans", "lagos-titans", "LGT", "CODM", "Nigeria", "Africa West", "Mar 2025", 35, "121-67", 9, 2, 64, "Recruiting", "LT"),
  clan("cl03", "Accra Wolves", "accra-wolves", "ACW", "PUBG Mobile", "Ghana", "Africa West", "May 2025", 31, "106-58", 7, 3, 65, "Academy open", "AW"),
  clan("cl04", "Cape Valkyries", "cape-valkyries", "CPV", "Free Fire", "South Africa", "Africa South", "Jun 2025", 29, "97-55", 6, 4, 63, "Recruiting", "CV"),
  clan("cl05", "Nairobi Reapers", "nairobi-reapers", "NBR", "Free Fire", "Kenya", "Africa East", "Aug 2025", 26, "73-46", 4, 5, 61, "Academy open", "NR"),
  clan("cl06", "Sahara Pulse", "sahara-pulse", "SHP", "PUBG Mobile", "Morocco", "MENA", "Nov 2025", 24, "58-38", 3, 6, 60, "Recruiting", "SP"),
  clan("cl07", "Atlas Byte", "atlas-byte", "ATB", "PUBG Mobile", "Morocco", "MENA", "Feb 2026", 22, "49-34", 2, 7, 59, "Recruiting", "AB"),
];

export type CoreMatch = {
  id: string;
  game: CoreGame;
  mode: string;
  map: string;
  lifecycle: MatchLifecycle;
  scheduledTime: string;
  teamA: string;
  teamB: string;
  playersA: string[];
  playersB: string[];
  score: string;
  winner: string;
  mvp: string;
  referee: string;
  rules: string;
};

export const coreMatches: CoreMatch[] = [
  { id: "ranked-core-2001", game: "CODM", mode: "Search and Destroy", map: "Raid", lifecycle: "Ready", scheduledTime: "Tonight 20:30", teamA: "XCLusive", teamB: "Lagos Titans", playersA: ["Raiden", "LagosPhantom"], playersB: ["NovaAce", "RogueMusa"], score: "0-0", winner: "Pending", mvp: "Pending", referee: "AGA Referee Queue", rules: "No operator skills, evidence required, result confirmation from both sides." },
  { id: "ranked-core-1998", game: "PUBG Mobile", mode: "4v4 Arena", map: "Warehouse", lifecycle: "Completed", scheduledTime: "Yesterday 21:00", teamA: "Accra Wolves", teamB: "Sahara Pulse", playersA: ["KairoVex", "AccraPulse"], playersB: ["DeltaRift", "SaharaPeak"], score: "2-1", winner: "Accra Wolves", mvp: "KairoVex", referee: "Auto review", rules: "Custom room, screenshots and final scoreboard required." },
  { id: "ranked-core-1994", game: "Free Fire", mode: "Clash Squad", map: "Bermuda", lifecycle: "Completed", scheduledTime: "Aug 31 19:00", teamA: "Cape Valkyries", teamB: "Nairobi Reapers", playersA: ["ZuriStorm", "CapeGhost"], playersB: ["NairobiNova", "MambaScope"], score: "4-2", winner: "Cape Valkyries", mvp: "ZuriStorm", referee: "Auto review", rules: "Guild vs guild room, no account sharing, evidence required." },
  { id: "ranked-core-1987", game: "CODM", mode: "Hardpoint", map: "Firing Range", lifecycle: "Under Review", scheduledTime: "Aug 30 22:15", teamA: "XCLusive", teamB: "Accra Wolves", playersA: ["Raiden", "VantaSlayer"], playersB: ["KairoVex", "AshantiAim"], score: "154-148", winner: "Under review", mvp: "Pending", referee: "AGA Admin", rules: "Screenshot evidence and lobby proof required." },
];

export type CoreTournament = {
  id: string;
  name: string;
  slug: string;
  game: CoreGame;
  format: "Single Elimination" | "Double Elimination" | "Round Robin" | "Groups + Knockout" | "League Table";
  status: TournamentStatus;
  registration: string;
  startsAt: string;
  entrants: string;
  prize: string;
  organiser: string;
};

export const coreTournaments: CoreTournament[] = [
  { id: "trn01", name: "AGA CODM Open Qualifier", slug: "aga-codm-open-qualifier", game: "CODM", format: "Groups + Knockout", status: "Registration Open", registration: "Solo and team", startsAt: "Sep 19, 2026", entrants: "24/64", prize: "Demo trophies and XP", organiser: "AGA" },
  { id: "trn02", name: "PUBG Mobile Zone Cup", slug: "pubg-mobile-zone-cup", game: "PUBG Mobile", format: "League Table", status: "Registration Open", registration: "Squad", startsAt: "Sep 26, 2026", entrants: "18/40", prize: "Sponsor review pending", organiser: "AGA Partner Desk" },
  { id: "trn03", name: "Free Fire Guild Arena", slug: "free-fire-guild-arena", game: "Free Fire", format: "Double Elimination", status: "Check-In", registration: "Team", startsAt: "Sep 12, 2026", entrants: "16/16", prize: "Badges and XP", organiser: "AGA" },
  { id: "trn04", name: "CMA Community Cup", slug: "cma-community-cup", game: "CODM", format: "Single Elimination", status: "Draft", registration: "Clan", startsAt: "TBA", entrants: "0/32", prize: "Not announced", organiser: "CMA" },
];

export type Achievement = {
  id: string;
  icon: string;
  title: string;
  description: string;
  rarity: AchievementRarity;
  xpReward: number;
  unlockedByPlayerIds: string[];
};

export const achievements: Achievement[] = [
  achievement("first-blood", "FB", "First Blood", "Win the opening round of a verified match.", "Common", 100, ["p01", "p02", "p03", "p04"]),
  achievement("first-match", "FM", "First Match", "Complete your first verified AGA match.", "Common", 150, ["p01", "p02", "p03", "p04", "p05"]),
  achievement("first-win", "FW", "First Win", "Win your first verified AGA match.", "Common", 200, ["p01", "p02", "p03", "p04"]),
  achievement("five-wins", "5W", "5 Wins", "Record five verified wins.", "Rare", 300, ["p01", "p02", "p03", "p04", "p05"]),
  achievement("ten-wins", "10", "10 Wins", "Record ten verified wins.", "Rare", 450, ["p01", "p02", "p03", "p04"]),
  achievement("twenty-five-wins", "25", "25 Wins", "Record twenty-five verified wins.", "Epic", 700, ["p01", "p02", "p03"]),
  achievement("fifty-wins", "50", "50 Wins", "Record fifty verified wins.", "Epic", 1000, ["p01", "p02"]),
  achievement("hundred-wins", "100", "100 Wins", "Record one hundred verified wins.", "Legendary", 1800, ["p01"]),
  achievement("five-streak", "S5", "5 Win Streak", "Win five verified matches in a row.", "Epic", 800, ["p01", "p02", "p03"]),
  achievement("ten-streak", "S10", "10 Win Streak", "Win ten verified matches in a row.", "Legendary", 1600, ["p01"]),
  achievement("tournament-debut", "TD", "Tournament Debut", "Play your first AGA tournament.", "Common", 250, ["p01", "p02", "p03", "p04"]),
  achievement("tournament-champion", "TC", "Tournament Champion", "Win an AGA tournament.", "Legendary", 2200, ["p01", "p02"]),
  achievement("mvp", "MV", "MVP", "Earn MVP in a verified match.", "Rare", 500, ["p01", "p02", "p03", "p04"]),
  achievement("mvp-x10", "M10", "MVP x10", "Earn ten MVP awards.", "Epic", 1200, ["p01", "p02"]),
  achievement("top-100", "T100", "Top 100", "Reach the top 100 of a seasonal ladder.", "Epic", 900, ["p01", "p02", "p03", "p04", "p05"]),
  achievement("top-10", "T10", "Top 10", "Reach the top 10 of a seasonal ladder.", "Legendary", 1700, ["p01", "p02", "p03"]),
  achievement("aga-champion", "AC", "AGA Champion", "Finish a season as an AGA Champion tier player.", "Mythic", 3000, []),
  achievement("clan-champion", "CC", "Clan Champion", "Win an event with your clan.", "Legendary", 2000, ["p01", "p02"]),
  achievement("giant-killer", "GK", "Giant Killer", "Beat an opponent ranked at least two tiers higher.", "Epic", 1100, ["p04", "p08"]),
  achievement("veteran", "VT", "Veteran", "Stay active for two AGA seasons.", "Rare", 500, ["p01", "p02", "p03"]),
  achievement("hundred-matches", "100M", "100 Matches", "Complete one hundred verified matches.", "Epic", 1000, ["p01", "p02", "p03", "p04"]),
  achievement("five-hundred-matches", "500M", "500 Matches", "Complete five hundred verified matches.", "Legendary", 2500, []),
  achievement("thousand-matches", "1K", "1000 Matches", "Complete one thousand verified matches.", "Mythic", 5000, []),
  achievement("clip-creator", "CL", "Clip Creator", "Upload an approved gameplay clip.", "Common", 200, ["p01", "p03", "p04", "p08"]),
  achievement("rising-star", "RS", "Rising Star", "Gain 250 rank points in one season.", "Rare", 650, ["p02", "p08"]),
];

export const coreClips = [
  { id: "clip-01", title: "Raid retake, final round", creator: "Raiden", game: "CODM", duration: "00:45", reactions: 312 },
  { id: "clip-02", title: "Warehouse 1v3 clutch", creator: "KairoVex", game: "PUBG Mobile", duration: "00:38", reactions: 224 },
  { id: "clip-03", title: "Clash Squad entry ace", creator: "ZuriStorm", game: "Free Fire", duration: "00:31", reactions: 198 },
  { id: "clip-04", title: "Hardpoint anchor hold", creator: "AccraPulse", game: "CODM", duration: "00:52", reactions: 144 },
];

export const rankedQueues = [
  { game: "CODM" as CoreGame, mode: "Search and Destroy", teamSize: "5v5" as TeamSize, searching: 18, estimated: "01:40", rankBand: "Diamond to Master" },
  { game: "CODM" as CoreGame, mode: "Gunfight", teamSize: "1v1" as TeamSize, searching: 11, estimated: "00:55", rankBand: "Gold to Master" },
  { game: "PUBG Mobile" as CoreGame, mode: "4v4 Arena", teamSize: "4v4" as TeamSize, searching: 14, estimated: "02:10", rankBand: "Platinum to Master" },
  { game: "Free Fire" as CoreGame, mode: "Clash Squad", teamSize: "4v4" as TeamSize, searching: 9, estimated: "01:25", rankBand: "Silver to Diamond" },
];

export const scoutProfiles = corePlayers
  .filter((player) => ["IGL", "Slayer", "Sniper", "Support", "Flex", "Entry", "Anchor"].includes(player.role))
  .slice(4, 16)
  .map((player) => ({
    ...player,
    lookingForTeam: player.clanHistory.includes("Independent") || player.clanHistory.includes("Open") || player.placementMatches > 4,
    ageEligibility: player.country === "United Kingdom" ? "18+ verified required for restricted flows" : "Eligibility check required",
  }));

export const championshipEvents = [
  { stage: "Open Qualifier", game: "CODM", date: "Sep 19, 2026", status: "Registration Open", qualified: "0/64" },
  { stage: "Regional Qualifier", game: "PUBG Mobile", date: "Oct 03, 2026", status: "Scheduled", qualified: "0/32" },
  { stage: "National Finals", game: "Free Fire", date: "Oct 24, 2026", status: "Scheduled", qualified: "0/16" },
  { stage: "Continental Finals", game: "All Games", date: "Nov 14, 2026", status: "Locked", qualified: "0/12" },
  { stage: "Championship Final", game: "All Games", date: "Nov 28, 2026", status: "Locked", qualified: "0/6" },
];

export const championshipStandings = [
  { rank: 1, name: "XCLusive", country: "United Kingdom", points: 420, status: "Regional seed", game: "CODM" },
  { rank: 2, name: "Lagos Titans", country: "Nigeria", points: 366, status: "Regional seed", game: "CODM" },
  { rank: 3, name: "Accra Wolves", country: "Ghana", points: 332, status: "Qualifier zone", game: "PUBG Mobile" },
  { rank: 4, name: "Cape Valkyries", country: "South Africa", points: 291, status: "Qualifier zone", game: "Free Fire" },
  { rank: 5, name: "Nairobi Reapers", country: "Kenya", points: 185, status: "Open qualifier", game: "Free Fire" },
];

export const predictionCards = [
  { id: "pred-01", title: "XCLusive vs Lagos Titans", type: "Match winner", game: "CODM", options: ["XCLusive", "Lagos Titans"], closes: "Tonight 20:15", reward: "75 XP" },
  { id: "pred-02", title: "AGA CODM Open Qualifier", type: "Tournament winner", game: "CODM", options: ["XCLusive", "Lagos Titans", "Accra Wolves"], closes: "Sep 19 12:00", reward: "250 XP" },
  { id: "pred-03", title: "Raid SND MVP", type: "MVP", game: "CODM", options: ["Raiden", "NovaAce", "LagosPhantom"], closes: "Tonight 20:20", reward: "100 XP" },
];

export const liveCards = [
  { id: "live-01", title: "XCLusive vs Lagos Titans", teams: "XCL 0 - 0 LGT", game: "CODM", tournament: "AGA Ranked", status: "Ready", viewers: "Preview only", href: "/matches/ranked-core-2001" },
  { id: "live-02", title: "Free Fire Guild Arena", teams: "Cape Valkyries 4 - 2 Nairobi Reapers", game: "Free Fire", tournament: "Guild Arena", status: "Replay review", viewers: "Embed pending", href: "/tournaments/free-fire-guild-arena" },
  { id: "live-03", title: "PUBG Zone Cup Lobby", teams: "18 squads checked", game: "PUBG Mobile", tournament: "PUBG Mobile Zone Cup", status: "Upcoming", viewers: "Embed pending", href: "/tournaments/pubg-mobile-zone-cup" },
];

export const notificationTypes = [
  "match found",
  "ranked match ready",
  "clan invitation",
  "clan application",
  "tournament registration",
  "tournament check-in",
  "tournament match ready",
  "score submitted",
  "dispute update",
  "achievement unlocked",
  "rank up",
  "rank down",
  "new follower",
  "clip reaction",
  "scouting invitation",
  "championship qualification",
];

export const currentPlayer = corePlayers[0];
export const leaderboardRows = [...corePlayers].sort((a, b) => b.mmr - a.mmr).map((player, index) => ({ ...player, leaderboardPosition: index + 1 }));

export function rankForMmr(mmr: number): RankTier {
  return [...rankTiers].reverse().find((rank) => mmr >= rank.minMmr)?.tier ?? "Unranked";
}

export function winRate(player: Pick<CorePlayer, "wins" | "totalMatches">) {
  return player.totalMatches ? Math.round((player.wins / player.totalMatches) * 100) : 0;
}

export function xpForLevel(level: number) {
  return Math.round(420 * Math.pow(Math.max(1, level), 1.34));
}

export function levelProgress(totalXp: number) {
  let level = 1;
  let spent = 0;
  while (level < 100 && spent + xpForLevel(level + 1) <= totalXp) {
    spent += xpForLevel(level + 1);
    level += 1;
  }
  const current = totalXp - spent;
  const needed = xpForLevel(level + 1);
  return { level, current, needed, percent: Math.min(100, Math.round((current / needed) * 100)) };
}

export function achievementsForPlayer(playerId: string) {
  return achievements.map((achievement) => ({
    ...achievement,
    unlocked: achievement.unlockedByPlayerIds.includes(playerId),
    unlockDate: achievement.unlockedByPlayerIds.includes(playerId) ? "Season 2" : "",
  }));
}

function player(
  id: string,
  gamerTag: string,
  username: string,
  country: string,
  region: string,
  verified: boolean,
  mainGame: CoreGame,
  secondaryGames: CoreGame[],
  clanSlug: string,
  clanName: string,
  role: PlayerRole,
  level: number,
  xp: number,
  mmr: number,
  rankPoints: number,
  placementMatches: number,
  peakRank: RankTier,
  leaderboardPosition: number,
  reputationScore: number,
  sportsmanshipRating: number,
  tournamentWins: number,
  totalMatches: number,
  wins: number,
  losses: number,
  mvpCount: number,
  followers: number,
  following: number,
  currentStreak: number,
  bestStreak: number,
  rankMovement: number,
  availability: string,
  language: string,
  tournamentExperience: string,
  clanHistory: string,
): CorePlayer {
  return { id, gamerTag, username, country, region, verified, mainGame, secondaryGames, clanSlug, clanName, role, level, xp, mmr, rankPoints, placementMatches, peakRank, leaderboardPosition, reputationScore, sportsmanshipRating, tournamentWins, totalMatches, wins, losses, mvpCount, followers, following, currentStreak, bestStreak, rankMovement, availability, language, tournamentExperience, clanHistory };
}

function clan(
  id: string,
  name: string,
  slug: string,
  tag: string,
  game: CoreGame,
  country: string,
  region: string,
  founded: string,
  members: number,
  record: string,
  trophies: number,
  ranking: number,
  winRateValue: number,
  status: CoreClan["status"],
  logo: string,
): CoreClan {
  const roster = corePlayers.filter((player) => player.clanSlug === slug).slice(0, 5);
  const roles = roster.length
    ? roster.map((member, index) => ({
        name: member.gamerTag,
        role: (index === 0 ? "Owner" : index === 1 ? "Captain" : index === 2 ? "Analyst" : "Player") as CoreClan["roles"][number]["role"],
      }))
    : [{ name: "Recruiting roster", role: "Manager" as const }];
  return { id, name, slug, tag, game, country, region, founded, members, record, trophies, ranking, winRate: winRateValue, status, logo, banner: `${game} ${region} command banner`, roles };
}

function achievement(
  id: string,
  icon: string,
  title: string,
  description: string,
  rarity: AchievementRarity,
  xpReward: number,
  unlockedByPlayerIds: string[],
): Achievement {
  return { id, icon, title, description, rarity, xpReward, unlockedByPlayerIds };
}
