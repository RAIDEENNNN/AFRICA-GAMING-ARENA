import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
};

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("player"),
  region: text("region"),
  skillLevel: text("skill_level"),
  ageVerified: integer("age_verified", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export const games = sqliteTable("games", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  status: text("status").notNull().default("active"),
  ...timestamps,
});

export const userProfiles = sqliteTable("user_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  inGameId: text("in_game_id"),
  favoriteGameId: text("favorite_game_id").references(() => games.id),
  favoriteWeapon: text("favorite_weapon"),
  favoriteMap: text("favorite_map"),
  lookingFor: text("looking_for"),
  profileImageUrl: text("profile_image_url"),
  ...timestamps,
});

export const gameOptions = sqliteTable("game_options", {
  id: text("id").primaryKey(),
  gameId: text("game_id").notNull().references(() => games.id),
  kind: text("kind").notNull(),
  label: text("label").notNull(),
  parentLabel: text("parent_label"),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  ...timestamps,
});

export const clans = sqliteTable("clans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ownerUserId: text("owner_user_id").notNull().references(() => users.id),
  gameId: text("game_id").notNull().references(() => games.id),
  region: text("region").notNull(),
  ...timestamps,
});

export const challenges = sqliteTable("challenges", {
  id: text("id").primaryKey(),
  creatorUserId: text("creator_user_id").notNull().references(() => users.id),
  gameId: text("game_id").notNull().references(() => games.id),
  matchKind: text("match_kind").notNull(),
  teamSize: text("team_size").notNull(),
  weaponClass: text("weapon_class").notNull(),
  weapon: text("weapon").notNull(),
  map: text("map").notNull(),
  mode: text("mode").notNull(),
  rules: text("rules").notNull(),
  region: text("region").notNull(),
  server: text("server").notNull(),
  scheduledAt: text("scheduled_at").notNull(),
  prizeType: text("prize_type").notNull(),
  wagerAmount: real("wager_amount").notNull().default(0),
  status: text("status").notNull().default("open"),
  ...timestamps,
});

export const challengeParticipants = sqliteTable("challenge_participants", {
  id: text("id").primaryKey(),
  challengeId: text("challenge_id").notNull().references(() => challenges.id),
  userId: text("user_id").notNull().references(() => users.id),
  side: text("side").notNull(),
  status: text("status").notNull(),
  ...timestamps,
});

export const matchRooms = sqliteTable("match_rooms", {
  id: text("id").primaryKey(),
  challengeId: text("challenge_id").notNull().references(() => challenges.id),
  status: text("status").notNull(),
  moderatorUserId: text("moderator_user_id").references(() => users.id),
  ...timestamps,
});

export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  roomId: text("room_id").notNull().references(() => matchRooms.id),
  authorUserId: text("author_user_id").references(() => users.id),
  body: text("body").notNull(),
  attachmentUrl: text("attachment_url"),
  replyToMessageId: text("reply_to_message_id"),
  isSystem: integer("is_system", { mode: "boolean" }).notNull().default(false),
  isPinned: integer("is_pinned", { mode: "boolean" }).notNull().default(false),
  readAt: text("read_at"),
  ...timestamps,
});

export const agreementVersions = sqliteTable("agreement_versions", {
  id: text("id").primaryKey(),
  roomId: text("room_id").notNull().references(() => matchRooms.id),
  version: integer("version").notNull(),
  termsJson: text("terms_json").notNull(),
  lockedAt: text("locked_at"),
  ...timestamps,
});

export const approvals = sqliteTable("approvals", {
  id: text("id").primaryKey(),
  agreementVersionId: text("agreement_version_id").notNull().references(() => agreementVersions.id),
  userId: text("user_id").notNull().references(() => users.id),
  approvalType: text("approval_type").notNull(),
  approvedAt: text("approved_at"),
  ...timestamps,
});

export const wagerConfirmations = sqliteTable("wager_confirmations", {
  id: text("id").primaryKey(),
  agreementVersionId: text("agreement_version_id").notNull().references(() => agreementVersions.id),
  userId: text("user_id").notNull().references(() => users.id),
  stakePerSide: real("stake_per_side").notNull(),
  totalPrizePool: real("total_prize_pool").notNull(),
  feePercent: real("fee_percent").notNull(),
  feeAmount: real("fee_amount").notNull(),
  winnerPayout: real("winner_payout").notNull(),
  currency: text("currency").notNull(),
  confirmedAt: text("confirmed_at"),
  ...timestamps,
});

export const checkIns = sqliteTable("check_ins", {
  id: text("id").primaryKey(),
  roomId: text("room_id").notNull().references(() => matchRooms.id),
  userId: text("user_id").notNull().references(() => users.id),
  status: text("status").notNull(),
  delayRequestedUntil: text("delay_requested_until"),
  ...timestamps,
});

export const matchResults = sqliteTable("match_results", {
  id: text("id").primaryKey(),
  roomId: text("room_id").notNull().references(() => matchRooms.id),
  submittedByUserId: text("submitted_by_user_id").notNull().references(() => users.id),
  winnerUserId: text("winner_user_id").references(() => users.id),
  score: text("score").notNull(),
  roundScores: text("round_scores").notNull(),
  note: text("note"),
  status: text("status").notNull(),
  ...timestamps,
});

export const evidence = sqliteTable("evidence", {
  id: text("id").primaryKey(),
  resultId: text("result_id").references(() => matchResults.id),
  roomId: text("room_id").notNull().references(() => matchRooms.id),
  uploadedByUserId: text("uploaded_by_user_id").notNull().references(() => users.id),
  kind: text("kind").notNull(),
  url: text("url").notNull(),
  ...timestamps,
});

export const disputes = sqliteTable("disputes", {
  id: text("id").primaryKey(),
  roomId: text("room_id").notNull().references(() => matchRooms.id),
  openedByUserId: text("opened_by_user_id").notNull().references(() => users.id),
  status: text("status").notNull(),
  reason: text("reason").notNull(),
  ...timestamps,
});

export const playerStatistics = sqliteTable("player_statistics", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  gameId: text("game_id").references(() => games.id),
  scope: text("scope").notNull(),
  wins: integer("wins").notNull().default(0),
  losses: integer("losses").notNull().default(0),
  points: integer("points").notNull().default(0),
  ...timestamps,
});

export const leaderboardEntries = sqliteTable("leaderboard_entries", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  clanId: text("clan_id").references(() => clans.id),
  scope: text("scope").notNull(),
  rank: integer("rank").notNull(),
  points: integer("points").notNull(),
  season: text("season").notNull(),
  ...timestamps,
});

export const vendors = sqliteTable("vendors", {
  id: text("id").primaryKey(),
  ownerUserId: text("owner_user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  status: text("status").notNull().default("pending"),
  ...timestamps,
});

export const vendorLinks = sqliteTable("vendor_links", {
  id: text("id").primaryKey(),
  vendorId: text("vendor_id").notNull().references(() => vendors.id),
  kind: text("kind").notNull(),
  url: text("url").notNull(),
  approvedAt: text("approved_at"),
  ...timestamps,
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  vendorId: text("vendor_id").notNull().references(() => vendors.id),
  gameId: text("game_id").notNull().references(() => games.id),
  title: text("title").notNull(),
  price: real("price").notNull(),
  status: text("status").notNull(),
  ...timestamps,
});

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  buyerUserId: text("buyer_user_id").notNull().references(() => users.id),
  vendorId: text("vendor_id").notNull().references(() => vendors.id),
  productId: text("product_id").notNull().references(() => products.id),
  status: text("status").notNull(),
  deliveryConfirmedAt: text("delivery_confirmed_at"),
  ...timestamps,
});

export const walletTransactions = sqliteTable("wallet_transactions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  roomId: text("room_id").references(() => matchRooms.id),
  amount: real("amount").notNull(),
  kind: text("kind").notNull(),
  status: text("status").notNull(),
  ...timestamps,
});

export const notifications = sqliteTable("notifications", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  body: text("body").notNull(),
  readAt: text("read_at"),
  ...timestamps,
});

export const tournamentOrganisations = sqliteTable("tournament_organisations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  parentOrganisationId: text("parent_organisation_id"),
  status: text("status").notNull().default("active"),
  ...timestamps,
});

export const partnerTournaments = sqliteTable("partner_tournaments", {
  id: text("id").primaryKey(),
  organisationId: text("organisation_id").notNull().references(() => tournamentOrganisations.id),
  partnerSlug: text("partner_slug").notNull(),
  gameId: text("game_id").notNull().references(() => games.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tournamentType: text("tournament_type").notNull(),
  gameMode: text("game_mode").notNull(),
  teamSize: text("team_size").notNull(),
  mapPool: text("map_pool").notNull(),
  region: text("region").notNull(),
  server: text("server").notNull(),
  entryType: text("entry_type").notNull(),
  entryFee: real("entry_fee").notNull().default(0),
  currency: text("currency").notNull().default("DEMO"),
  prizePool: text("prize_pool").notNull(),
  maximumTeams: integer("maximum_teams").notNull(),
  registeredTeams: integer("registered_teams").notNull().default(0),
  registrationOpenAt: text("registration_open_at").notNull(),
  registrationCloseAt: text("registration_close_at").notNull(),
  startsAt: text("starts_at").notNull(),
  endsAt: text("ends_at").notNull(),
  status: text("status").notNull(),
  rules: text("rules").notNull(),
  bannerUrl: text("banner_url"),
  thumbnailUrl: text("thumbnail_url"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  createdBy: text("created_by").notNull().references(() => users.id),
  ...timestamps,
});

export const tournamentRegistrations = sqliteTable("tournament_registrations", {
  id: text("id").primaryKey(),
  tournamentId: text("tournament_id").notNull().references(() => partnerTournaments.id),
  userId: text("user_id").notNull().references(() => users.id),
  clanId: text("clan_id").references(() => clans.id),
  registrationType: text("registration_type").notNull(),
  rosterJson: text("roster_json").notNull(),
  gameUid: text("game_uid").notNull(),
  status: text("status").notNull().default("submitted"),
  reviewedBy: text("reviewed_by").references(() => users.id),
  reviewedAt: text("reviewed_at"),
  ...timestamps,
});

export const organiserPermissions = sqliteTable("organiser_permissions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  organisationId: text("organisation_id").notNull().references(() => tournamentOrganisations.id),
  role: text("role").notNull().default("cma_organiser"),
  permissionsJson: text("permissions_json").notNull(),
  revokedAt: text("revoked_at"),
  ...timestamps,
});

export const weeklyAwards = sqliteTable("weekly_awards", {
  id: text("id").primaryKey(),
  organisationId: text("organisation_id").notNull().references(() => tournamentOrganisations.id),
  tournamentId: text("tournament_id").references(() => partnerTournaments.id),
  awardType: text("award_type").notNull(),
  winnerUserId: text("winner_user_id").references(() => users.id),
  winnerClanId: text("winner_clan_id").references(() => clans.id),
  metricLabel: text("metric_label").notNull(),
  metricValue: text("metric_value").notNull(),
  selectedBy: text("selected_by").notNull().references(() => users.id),
  publishedAt: text("published_at"),
  ...timestamps,
});

export const auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  actorUserId: text("actor_user_id").references(() => users.id),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  metadataJson: text("metadata_json"),
  ipAddress: text("ip_address"),
  ...timestamps,
});

export const arenaStateSnapshots = sqliteTable("arena_state_snapshots", {
  id: text("id").primaryKey(),
  stateJson: text("state_json").notNull(),
  ...timestamps,
});
