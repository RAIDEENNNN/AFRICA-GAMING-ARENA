const clans = [
  { rank: 1, name: "Xclusive", game: "CODM", members: "28/30", rate: "78%", points: "12,460", badge: "XC" },
  { rank: 2, name: "Immortals", game: "PUBG", members: "30/30", rate: "75%", points: "11,230", badge: "IM" },
  { rank: 3, name: "7DS Esports", game: "CODM", members: "29/30", rate: "72%", points: "10,120", badge: "7D" },
  { rank: 4, name: "Unstoppable", game: "Free Fire", members: "30/30", rate: "70%", points: "9,450", badge: "UP" },
  { rank: 5, name: "Nova Esports", game: "PUBG", members: "24/30", rate: "68%", points: "8,910", badge: "NV" },
];

const tournaments = [
  { name: "CODM Championship", tag: "Upcoming", prize: "$5,000", date: "May 25, 2026", teams: "32/64", game: "CODM" },
  { name: "PUBG Mobile Cup", tag: "Live now", prize: "$3,000", date: "May 18, 2026", teams: "24/48", game: "PUBG" },
  { name: "Free Fire Arena", tag: "Upcoming", prize: "$2,000", date: "May 30, 2026", teams: "16/32", game: "Free Fire" },
];

const matches = [
  { left: "Xclusive", score: "15 - 12", right: "Nova", state: "Victory", game: "CODM" },
  { left: "Immortals", score: "08 - 10", right: "7DS", state: "Defeat", game: "PUBG" },
  { left: "Unstoppable", score: "13 - 07", right: "Dark Knights", state: "Victory", game: "Free Fire" },
];

const nav = ["Dashboard", "My Clan", "Find Clans", "Tournaments", "Matchmaking", "Leaderboard", "Clips", "News Feed", "Store", "Support"];

export default function Home() {
  return (
    <main className="arena-shell">
      <Sidebar />
      <section className="workspace">
        <Topbar />
        <section className="hero-grid">
          <div className="hero-panel">
            <div className="hero-copy">
              <span className="eyebrow">Clan Arena</span>
              <h1>Built for clans. <em>Made to win.</em></h1>
              <p>
                A competitive command centre for clans to recruit, challenge, run matches,
                join tournaments, publish clips and climb verified rankings.
              </p>
              <div className="button-row">
                <a href="#find-clans" className="btn primary">Find clan</a>
                <a href="#match-request" className="btn secondary">Create clan soon</a>
              </div>
            </div>
            <div className="operator-card" aria-label="Original tactical gaming artwork">
              <div className="operator">
                <span className="helmet" />
                <span className="torso" />
                <span className="rifle" />
                <span className="arm arm-a" />
                <span className="arm arm-b" />
              </div>
            </div>
          </div>
          <ClanShowcase />
          <ClipCard />
        </section>

        <section className="game-row" aria-label="Featured games">
          {[
            ["Call of Duty: Mobile", "2,356 clans", "View clans"],
            ["PUBG Mobile", "1,982 clans", "View clans"],
            ["Free Fire", "1,245 clans", "View clans"],
          ].map(([game, count, action]) => (
            <article className="game-card" key={game}>
              <strong>{game}</strong>
              <span>{count}</span>
              <a href="#find-clans">{action}</a>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <TournamentPanel />
          <RecentMatches />
          <ActionBanner />
        </section>

        <section className="module-grid">
          <FindClans />
          <MatchRequest />
          <ClipUpload />
          <Leaderboard />
          <ClanProfile />
          <ClanChat />
        </section>

        <section className="mobile-and-admin">
          <MobilePreview />
          <AdminRoadmap />
        </section>
      </section>
    </main>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#">
        <span>CA</span>
        <strong>Clan Arena</strong>
        <small>United. Compete. Dominate.</small>
      </a>
      <nav aria-label="App navigation">
        {nav.map((item, index) => (
          <a className={index === 0 ? "active" : ""} href={item === "Find Clans" ? "#find-clans" : "#"} key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item}
          </a>
        ))}
      </nav>
      <div className="mini-block">
        <p>Games</p>
        <div className="chips">
          <span>CODM</span>
          <span>PUBG</span>
          <span>Free Fire</span>
        </div>
      </div>
      <div className="stats-card">
        <span>Your stats</span>
        <strong>128</strong>
        <small>matches / 72 wins / 56% win rate</small>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <nav>
        {["Home", "Clans", "Tournaments", "Matches", "Rankings", "Clips", "News", "Store"].map((item) => (
          <a href="#" key={item}>{item}</a>
        ))}
      </nav>
      <label className="search">
        <span className="sr-only">Search clans, players, tournaments</span>
        <input placeholder="Search clans, players, tournaments..." />
      </label>
      <div className="profile-pill">
        <span />
        <strong>PlayerOne</strong>
        <small>Pro Member</small>
      </div>
    </header>
  );
}

function ClanShowcase() {
  return (
    <section className="panel showcase">
      <div className="panel-head">
        <h2>Clan showcase</h2>
        <a href="#find-clans">View all</a>
      </div>
      <article className="featured-clan">
        <span className="crest">XC</span>
        <div>
          <h3>Xclusive <b>Verified</b></h3>
          <p>Leader: XCL Venom / Europe / Founded Jun 2023</p>
          <small>We do not play for K/D. We play for legacy.</small>
        </div>
        <a className="btn primary small" href="#clan-profile">View profile</a>
      </article>
      {clans.slice(1, 4).map((clan) => (
        <div className="rank-strip" key={clan.name}>
          <span>{clan.rank}</span>
          <b>{clan.name}</b>
          <small>{clan.members}</small>
          <em>Win rate: {clan.rate}</em>
        </div>
      ))}
    </section>
  );
}

function ClipCard() {
  return (
    <section className="panel clip-card">
      <div className="panel-head">
        <h2>Clip of the day</h2>
        <a href="#">View all</a>
      </div>
      <div className="video-thumb">
        <button aria-label="Clip player coming soon">Coming soon</button>
        <span>00:45</span>
      </div>
      <h3>Insane 1v4 Clutch!</h3>
      <p>by XCL Venom / CODM</p>
      <div className="metrics">
        <span>1.2K views</span>
        <span>230 likes</span>
        <span>45 comments</span>
      </div>
    </section>
  );
}

function TournamentPanel() {
  return (
    <section className="panel wide">
      <div className="panel-head">
        <h2>Featured tournaments</h2>
        <a href="#">View all</a>
      </div>
      <div className="tournament-list">
        {tournaments.map((item) => (
          <article className="tournament" key={item.name}>
            <span className={item.tag === "Live now" ? "tag live" : "tag"}>{item.tag}</span>
            <h3>{item.name}</h3>
            <p>{item.game} / {item.date}</p>
            <div>
              <b>{item.prize}</b>
              <small>{item.teams} teams</small>
            </div>
            <a className="btn ghost small" href="#">Details soon</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function RecentMatches() {
  return (
    <section className="panel recent">
      <div className="panel-head">
        <h2>Recent matches</h2>
        <a href="#">View all</a>
      </div>
      {matches.map((match) => (
        <article className="match" key={`${match.left}-${match.right}`}>
          <span>{match.left}</span>
          <strong>{match.score}</strong>
          <span>{match.right}</span>
          <em className={match.state.toLowerCase()}>{match.state}</em>
          <small>{match.game}</small>
        </article>
      ))}
    </section>
  );
}

function ActionBanner() {
  return (
    <section className="panel action-banner">
      <h2>Think your clan has what it takes?</h2>
      <p>Request a match, challenge top clans and prove you are the best.</p>
      <a className="btn primary" href="#match-request">Request a match</a>
    </section>
  );
}

function FindClans() {
  return (
    <section className="panel module" id="find-clans">
      <div className="panel-head">
        <h2>Find clans</h2>
        <button>Filters soon</button>
      </div>
      <input className="field" placeholder="Search clans..." />
      {clans.map((clan) => (
        <article className="clan-row" key={clan.name}>
          <span className="crest mini">{clan.badge}</span>
          <div>
            <strong>{clan.name}</strong>
            <small>{clan.game} / Members {clan.members} / Win rate {clan.rate}</small>
          </div>
          <a href="#clan-profile">View</a>
        </article>
      ))}
      <button className="btn ghost full">Load more soon</button>
    </section>
  );
}

function MatchRequest() {
  return (
    <section className="panel module" id="match-request">
      <div className="panel-head">
        <h2>Match request</h2>
        <span>Step 1 of 3</span>
      </div>
      <label>Opponent clan<input className="field" placeholder="Search clan..." /></label>
      <label>Game<select className="field"><option>CODM</option><option>PUBG</option><option>Free Fire</option></select></label>
      <label>Match type<select className="field"><option>Scrim</option><option>Ranked clan match</option><option>Tournament warm-up</option></select></label>
      <div className="split-fields">
        <input className="field" placeholder="Date" />
        <input className="field" placeholder="Time" />
      </div>
      <textarea className="field" placeholder="Additional message..." />
      <button className="btn primary full">Continue soon</button>
    </section>
  );
}

function ClipUpload() {
  return (
    <section className="panel module">
      <div className="panel-head">
        <h2>Clip upload</h2>
        <span>Storage soon</span>
      </div>
      <div className="dropzone">
        <strong>Drag and drop your clip here</strong>
        <small>Video processing, thumbnails and moderation will connect in backend phase.</small>
      </div>
      <input className="field" placeholder="Clip title..." />
      <select className="field"><option>Select game</option><option>CODM</option><option>PUBG</option></select>
      <textarea className="field" placeholder="Description..." />
      <button className="btn primary full">Upload clip soon</button>
    </section>
  );
}

function Leaderboard() {
  return (
    <section className="panel module">
      <div className="panel-head">
        <h2>Leaderboard</h2>
        <span>Season 5</span>
      </div>
      <div className="leader-table">
        {clans.map((clan) => (
          <div key={clan.name}>
            <span>#{clan.rank}</span>
            <strong>{clan.name}</strong>
            <small>{clan.rate}</small>
            <b>{clan.points}</b>
          </div>
        ))}
      </div>
      <button className="btn ghost full">View full leaderboard soon</button>
    </section>
  );
}

function ClanProfile() {
  return (
    <section className="panel module" id="clan-profile">
      <div className="profile-banner">
        <span className="crest">XC</span>
        <div>
          <h2>Xclusive</h2>
          <p>Leader: XCL Venom / Region: Europe</p>
        </div>
      </div>
      <div className="button-row compact">
        <button className="btn primary small">Request to join soon</button>
        <button className="btn secondary small">Challenge soon</button>
      </div>
      <div className="tabs">
        <span>Overview</span>
        <span>Members</span>
        <span>Matches</span>
        <span>Clips</span>
      </div>
      <p className="body-copy">Competitive clan focused on improving every day and winning major tournaments.</p>
      <div className="stat-grid">
        <strong>78%<small>Win rate</small></strong>
        <strong>245<small>Matches</small></strong>
        <strong>12<small>Tournaments</small></strong>
      </div>
    </section>
  );
}

function ClanChat() {
  return (
    <section className="panel module chat">
      <div className="panel-head">
        <h2>Clan chat</h2>
        <span>Realtime soon</span>
      </div>
      {["Good luck in today's scrim!", "Let's dominate them.", "New upload posted."].map((message, index) => (
        <div className="message" key={message}>
          <span>{index === 0 ? "XCL Venom" : "XCL Shadow"}</span>
          <p>{message}</p>
        </div>
      ))}
      <input className="field" placeholder="Type a message..." />
    </section>
  );
}

function MobilePreview() {
  return (
    <section className="phone-stage">
      <article className="phone">
        <div className="phone-top">9:41 <span>Clan Arena</span></div>
        <div className="welcome-card">
          <span className="avatar" />
          <div>
            <small>Welcome back</small>
            <strong>PlayerOne</strong>
            <em>Legendary</em>
          </div>
        </div>
        <div className="quick-grid">
          <button>Match</button>
          <button>Clan</button>
          <button>Clip</button>
          <button>Store</button>
        </div>
        <h3>Latest events</h3>
        <div className="mobile-event">Tropical Vision <span>75%</span></div>
        <div className="mobile-event purple">Ranked Challenge <span>Live</span></div>
      </article>
      <article className="phone">
        <div className="phone-top">9:41 <span>Profile</span></div>
        <div className="profile-mini">
          <span className="avatar large" />
          <h3>PlayerOne</h3>
          <p>Rank Legendary</p>
        </div>
        <div className="stat-grid">
          <strong>2,450<small>Matches</small></strong>
          <strong>1,680<small>Wins</small></strong>
          <strong>68.6%<small>Rate</small></strong>
        </div>
        <div className="mobile-event">Victory / Ranked MP</div>
        <div className="mobile-event danger">Defeat / Ranked MP</div>
      </article>
    </section>
  );
}

function AdminRoadmap() {
  return (
    <section className="panel admin-panel">
      <div className="panel-head">
        <h2>Full-stack roadmap</h2>
        <span>Backend phase</span>
      </div>
      <div className="roadmap-grid">
        {[
          "Auth, email verification and roles",
          "Clan applications and member permissions",
          "Match rooms, check-ins, evidence and disputes",
          "Tournament brackets and BR scoring",
          "Cloud video uploads and moderation",
          "Realtime chat, messages and notifications",
          "Stripe subscriptions and featured listings",
          "Admin dashboard, reports, audit logs and analytics",
        ].map((item) => (
          <article key={item}>
            <span />
            <p>{item}</p>
          </article>
        ))}
      </div>
      <p className="legal">
        Original Clan Arena branding. Game communities are supported without claiming official
        ownership, sponsorship or endorsement from any game publisher.
      </p>
    </section>
  );
}
