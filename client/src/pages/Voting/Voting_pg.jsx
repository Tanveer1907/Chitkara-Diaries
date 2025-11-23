// src/pages/Voting/Voting_pg.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import MainNavbar from "../../components/navbar/main_navbar";
import "./Voting_pg.css";

/*
 Voting page (full file)
 - Shows 6 pie charts (3 + 3) at top
 - Preview area below charts (stretches to review panel)
 - "Voting Section" heading then voting cards (all original cards preserved)
 - Rightmost: Review panel (sticky)
 - Left: Voting menu — hidden while charts/preview are visible, appears (fixed on desktop) once Voting Section enters viewport and stays visible for the whole voting section
 - New: hovering pie slices / legend items shows a summary on the right side of the preview box
*/

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function getDefaultColors() {
  return ["#ff6b6b", "#c00000", "#9a1f1f", "#ff2b4f", "#621414", "#0b66ff", "#f57c7c", "#f5b7b7"];
}

function PieChartSmall({ dataMap, title, onHoverOption, hoveredOption, colors }) {
  const entries = Object.entries(dataMap).filter(([k, v]) => v > 0);
  const total = entries.reduce((s, [, v]) => s + v, 0);

  const sorted = entries.sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 5);
  const others = sorted.slice(5);
  const othersCount = others.reduce((s, [, v]) => s + v, 0);

  const final = top.map(([k, v]) => ({ key: k, value: v }));
  if (othersCount > 0) final.push({ key: "Others", value: othersCount });

  const computed = final.length > 0 ? final : [{ key: "No votes yet", value: 1 }];

  let cumulative = 0;
  const radius = 48;
  const cx = 60;
  const cy = 60;

  const slices = computed.map((slice, i) => {
    const value = slice.value;
    const angle = (value / (total || computed.reduce((s, x) => s + x.value, 0))) * 360;
    const startAngle = cumulative;
    const endAngle = cumulative + angle;
    cumulative = endAngle;

    const start = polarToCartesian(cx, cy, radius, endAngle);
    const end = polarToCartesian(cx, cy, radius, startAngle);
    const largeArcFlag = angle > 180 ? 1 : 0;

    const d = [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      "Z",
    ].join(" ");

    const color = colors[i % colors.length];
    return {
      d,
      color,
      label: slice.key,
      value: slice.value,
      percent: total ? Math.round((slice.value / total) * 100) : 0,
      idx: i,
    };
  });

  return (
    <div className="cat-pie-card">
      <div className="cat-pie-header">
        <h4>{title}</h4>
        <div className="cat-pie-total">{total} votes</div>
      </div>

      <div className="cat-pie-body">
        <svg className="cat-pie-svg" viewBox="0 0 120 120" width="120" height="120" role="img" aria-label={title}>
          {slices.map((s) => (
            <path
              key={s.label}
              d={s.d}
              fill={s.color}
              className={`cat-pie-slice ${hoveredOption === s.label ? "hovered" : ""}`}
              onMouseEnter={() => onHoverOption(s.label)}
              onMouseLeave={() => onHoverOption(null)}
            />
          ))}

          <g>
            <circle cx={cx} cy={cy} r="28" fill="#fff" />
            <text x={cx} y={cy - 4} textAnchor="middle" className="cat-pie-center-title">Top</text>
            <text x={cx} y={cy + 18} textAnchor="middle" className="cat-pie-center-sub">{total}</text>
          </g>
        </svg>

        <div className="cat-pie-legend">
          {slices.map((s) => (
            <div
              key={s.label}
              className={`cat-legend-item ${hoveredOption === s.label ? "hovered" : ""}`}
              onMouseEnter={() => onHoverOption(s.label)}
              onMouseLeave={() => onHoverOption(null)}
            >
              <span className="cat-legend-color" style={{ background: s.color }} />
              <span className="cat-legend-text">{s.label}</span>
              <span className="cat-legend-val">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VotingPg() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null);

  // seeded counts so charts are populated immediately
  const seededCounts = {
    "Square 1": 12,
    "Subway": 6,
    "Hostel Common Room": 3,
    "Hostel": 2,
    "Library": 9,
    "Alpha Zone": 4,
    "Hostel Room": 1,
    "Maggi": 7,
    "First Coffee": 4,
    "Square 2": 2,
    "Rangrezz": 5,
    "Sports Fest": 3,
    "Freshers'": 2,
    "Music Club": 6,
    "Coding Club": 4,
    "Dance Club": 3,
    "Football": 5,
    "Cricket": 3
  };

  const [counts, setCounts] = useState(() => {
    try {
      const raw = localStorage.getItem("votingCounts_v1");
      if (raw) return JSON.parse(raw);
      localStorage.setItem("votingCounts_v1", JSON.stringify(seededCounts));
      return { ...seededCounts };
    } catch {
      return { ...seededCounts };
    }
  });

  const colors = useMemo(() => getDefaultColors(), []);

  // 6 categories (makes 6 pie cards)
  const categories = [
    { key: "hangout", title: "Best place to hangout", options: ["Subway", "Square 1", "Hostel Common Room", "Hostel", "Other"] },
    { key: "study", title: "Best place for studying", options: ["Library", "Alpha Zone", "Temple", "Hostel Room"] },
    { key: "food", title: "Best food spot / snack", options: ["Square 1", "Square 2", "Subway", "First Coffee", "Maggi", "Sandwich", "Chaat", "Pasta"] },
    { key: "events", title: "Favorite event", options: ["Freshers'", "Rangrezz", "Sports Fest", "Hostel Night", "Other"] },
    { key: "clubs", title: "Popular clubs", options: ["Music Club", "Dance Club", "Coding Club", "Drama Club"] },
    { key: "sports", title: "Top sports", options: ["Football", "Cricket", "Basketball", "Volleyball", "Pickleball"] },
  ];

  const imageMap = {
    "Square 1": "/src/assets/square_one.png",
    "Library": "/src/assets/library.jpeg",
    "Hostel Common Room": "/src/assets/hostel_room.png",
    "Hostel": "/src/assets/hostel.jpg",
    "Subway": "/src/assets/subway.jpeg",
    "Maggi": "/src/assets/maggi.jpg",
    "First Coffee": "/src/assets/firstcoffee.jpeg",
    "Alpha Zone": "/src/assets/alpha_zone.jpeg",
    "Square 2": "/src/assets/square2.jpeg",
     "Maggi": "/src/assets/maggi.jpeg",
    "Hostel": "/src/assets/hostel.jpeg",
    "Hostel Room": "/src/assets/hostel_room.png",
    "Rangrezz": "/src/assets/rangrezz.png",
    "Sports Fest": "/src/assets/sports_fest.png",
    "Music Club": "/src/assets/music_club.jpeg",
    "Freshers'": "/src/assets/freshers.png",
    "Dance Club": "/src/assets/dance.png",
    "Drama Club": "/src/assets/drama_club.png",
    "Coding Club": "/src/assets/coding_club.png",
    "Football": "/src/assets/football.jpeg",
    "Basketball": "/src/assets/basketball.jpeg",
    "Cricket": "/src/assets/cricket.jpeg",
    "No votes yet": "/src/assets/default_place.jpg",
    "Others": "/src/assets/default_place.jpg",
  };

  // ---- Summaries / descriptions for preview-right ----
  // Keep these concise (one or two lines). Add or edit any entries to match real content.
  const summaries = {
    "Square 1": {
      title: "Square 1",
      desc: "A lively open plaza where students meet, events are often held and it's great for photos.",
      why: "Popular hangout — comfortable benches, greenery and frequent student gatherings."
    },
    "Subway": {
      title: "Subway",
      desc: "A cozy cafe style spot known for quick bites and group chats.",
      why: "Top food pick for casual hangouts and fast service."
    },
    "Hostel Common Room": {
      title: "Hostel Common Room",
      desc: "Casual lounge inside hostels perfect for group studies and board games.",
      why: "Popular for spontaneous meetups and late-night hangs."
    },
    "Hostel": {
      title: "Hostel",
      desc: "The residential zone full of student life and shared memories.",
      why: "Common pick for spending downtime with friends."
    },
    "Library": {
      title: "Library",
      desc: "Quiet study spaces, large book collection and individual cubicles — great for focused work.",
      why: "Often chosen for studying and group projects."
    },
    "Alpha Zone": {
      title: "Alpha Zone",
      desc: "A dedicated study hub with comfortable seating and power outlets.",
      why: "Favoured for long study sessions and group meetups."
    },
    "Hostel Room": {
      title: "Hostel Room",
      desc: "Private, cozy space for solo studying and relaxation.",
      why: "Good for late-night individual work."
    },
    "Maggi": {
      title: "Maggi",
      desc: "The quick and comforting snack stall serving hot Maggi and instant meals.",
      why: "Top snack pick among students for late-night cravings."
    },
    "First Coffee": {
      title: "First Coffee",
      desc: "A small coffee shop known for its espresso and chill vibe.",
      why: "Popular when students want to grab coffee and chat."
    },
    "Square 2": {
      title: "Square 2",
      desc: "Another open area that hosts smaller events and student interactions.",
      why: "Good for quick meetups and photo ops."
    },
    "Rangrezz": {
      title: "Rangrezz",
      desc: "Annual cultural fest with music, food stalls and performances.",
      why: "Top event for campus celebration and entertainment."
    },
    "Sports Fest": {
      title: "Sports Fest",
      desc: "Campus-wide sports competitions and active crowd participation.",
      why: "Chosen by many who love games and team events."
    },
    "Freshers'": {
      title: "Freshers' Party",
      desc: "Welcome event for new students with performances and fun activities.",
      why: "Memorable event for newcomers."
    },
    "Music Club": {
      title: "Music Club",
      desc: "Club for musicians, jamming sessions and stage performances.",
      why: "Favoured by those into music and stage events."
    },
    "Coding Club": {
      title: "Coding Club",
      desc: "Tech community hosting hackathons, workshops and coding sessions.",
      why: "Popular among students focused on programming."
    },
    "Dance Club": {
      title: "Dance Club",
      desc: "Performance group organizing choreographies and dance battles.",
      why: "Loved for high-energy performances."
    },
    "Football": {
      title: "Football",
      desc: "Competitive outdoor sport — many students play and watch matches.",
      why: "One of the top sports by participation."
    },
    "Cricket": {
      title: "Cricket",
      desc: "Campus cricket matches and friendly tournaments are often organised.",
      why: "A top pick among sports enthusiasts."
    },
    "No votes yet": {
      title: "No votes yet",
      desc: "This option hasn't received votes — encourage peers to vote!",
      why: "Be the first to cast a vote."
    },
    "Others": {
      title: "Others",
      desc: "A catch-all for options not listed explicitly.",
      why: "Select if none of the existing options fit."
    }
  };
  // ---- end summaries ----

  const persistCounts = (next) => {
    try {
      localStorage.setItem("votingCounts_v1", JSON.stringify(next));
    } catch {}
  };

  const updateCount = (optionName, delta = 1) => {
    setCounts((prev) => {
      const next = { ...prev };
      next[optionName] = (next[optionName] || 0) + delta;
      persistCounts(next);
      return next;
    });
  };

  useEffect(() => {
    fetch("/reviews")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setReviews(arr);
      })
      .catch(() => {
        // ignore (we have seeded counts)
      });
  }, []);

  const handleVote = (e) => {
    const btn = e.currentTarget;
    const card = btn.closest(".card");
    if (!card) return;
    const selected = card.querySelector('input[type="radio"]:checked');
    if (selected) {
      const value = selected.value;
      btn.innerText = "Voted ✔";
      btn.disabled = true;
      btn.style.background = "#9ca3af";
      updateCount(value, 1);
      alert(`Vote registered for: ${value}`);
    } else {
      alert("Please select an option before voting!");
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newReview = {
      author: form.author.value,
      text: form.text.value,
      optionName: form.option.value,
    };

    setReviews((prev) => {
      const next = Array.isArray(prev) ? [newReview, ...prev] : [newReview];
      return next;
    });

    updateCount(newReview.optionName, 1);

    fetch("/add-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    }).catch(() => {});

    form.reset();
    setIsModalOpen(false);
    alert("Review Added!");
  };

  const categoryCounts = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      const obj = {};
      cat.options.forEach((opt) => {
        obj[opt] = counts[opt] || 0;
      });
      map[cat.key] = obj;
    });
    return map;
  }, [counts]);

  const flatReviews = useMemo(() => (Array.isArray(reviews) ? reviews : Object.values(reviews).flat()), [reviews]);
  const hoverImageSrc = hoveredOption ? imageMap[hoveredOption] || "/src/assets/default_place.jpg" : null;

  // ---------- Menu visibility: show after preview / while in voting section ----------
  const [chartsVisible, setChartsVisible] = useState(true); // top charts+preview visible initially
  const [votingInView, setVotingInView] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const chartsTop = document.querySelector(".charts-top");
    const chartsPreview = document.querySelector(".charts-preview-under");
    const votingEl = document.querySelector(".voting-section");

    if (!votingEl) return;

    // initial check (in case elements are on screen at route load)
    const initialCheck = () => {
      let anyVisible = false;
      [chartsTop, chartsPreview].forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) anyVisible = true;
      });
      setChartsVisible(anyVisible);

      if (votingEl) {
        const rectV = votingEl.getBoundingClientRect();
        setVotingInView(rectV.bottom > 0 && rectV.top < window.innerHeight && rectV.height > 0);
      }
    };

    initialCheck();

    // observe chartsTop and chartsPreview: if either intersects, consider charts area visible
    const chartsObserver = new IntersectionObserver(
      (entries) => {
        // If any entries are intersecting, set chartsVisible true
        const any = entries.some((ent) => ent.isIntersecting && ent.intersectionRatio > 0);
        if (any) {
          setChartsVisible(true);
          return;
        }

        // If none intersect according to observer, double-check bounding rects
        let stillVisible = false;
        [chartsTop, chartsPreview].forEach((el) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) stillVisible = true;
        });
        setChartsVisible(stillVisible);
      },
      { root: null, threshold: [0, 0.01, 0.05, 0.25] }
    );

    if (chartsTop) chartsObserver.observe(chartsTop);
    if (chartsPreview) chartsObserver.observe(chartsPreview);

    // voting observer: mark voting section in view when ~10% visible
    const votingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVotingInView(entry.intersectionRatio >= 0.10);
        });
      },
      { root: null, threshold: [0, 0.05, 0.1, 0.25] }
    );
    votingObserver.observe(votingEl);

    // scroll/resize fallback to correct edge cases
    const onScrollResize = () => {
      initialCheck();
    };
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);

    return () => {
      chartsObserver.disconnect();
      votingObserver.disconnect();
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
    };
  }, []);

  // menu visible when voting section is in view AND charts area is NOT visible
  const menuVisible = votingInView && !chartsVisible;

  // ---------- end menu visibility logic ----------

  // preview summary content derived from 'summaries' map + live counts
  const PreviewSummary = ({ option }) => {
    if (!option) {
      return (
        <>
          <h4 style={{ margin: 0, color: "var(--primary)" }}>Top picks</h4>
          <p style={{ color: "#666" }}>
            Quick summary and stats appear here. Hover a slice or legend item to preview an image of the place.
          </p>
          <div style={{ marginTop: "auto", color: "#666", fontSize: "0.95rem" }}>
            <strong>Note:</strong> these charts are seeded with sample counts so you can see trends immediately.
          </div>
        </>
      );
    }

    const s = summaries[option] || {
      title: option,
      desc: "No summary available.",
      why: ""
    };
    const count = counts[option] ?? 0;

    return (
      <>
        <h4 style={{ margin: 0, color: "var(--primary)" }}>{s.title}</h4>
        <p className="preview-summary-desc">{s.desc}</p>
        <div className="preview-summary-meta">
          <span><strong>{count}</strong> votes</span>
          {s.why ? <span className="meta-divider">•</span> : null}
          {s.why ? <span className="preview-why">{s.why}</span> : null}
        </div>
        <div style={{ marginTop: "auto", color: "#666", fontSize: "0.9rem" }}>
          Tip: Click the corresponding card in the Voting section below to cast your vote.
        </div>
      </>
    );
  };

  return (
    <>
      <MainNavbar />
      <div id="top" style={{ paddingTop: 0 }}></div>

      <div className="main">
        {/* LEFT: content (charts + content-row) */}
        <div className="main-content-wrapper">

          {/* TOP charts area (grid that allows preview to span) */}
          <section className="charts-top">
            <h2 className="charts-heading">Trending picks — see what others like</h2>

            <div className="charts-grid">
              {categories.map((cat) => (
                <PieChartSmall
                  key={cat.key}
                  dataMap={categoryCounts[cat.key] || {}}
                  title={cat.title}
                  onHoverOption={setHoveredOption}
                  hoveredOption={hoveredOption}
                  colors={colors}
                />
              ))}
            </div>

            <div className="charts-preview-under">
              <div className="preview-box-top">
                <div className="preview-left">
                  {hoverImageSrc ? (
                    <img src={hoverImageSrc} alt={hoveredOption || "preview"} className="preview-img-top" />
                  ) : (
                    <div className="preview-empty-top">Hover a slice or name to preview</div>
                  )}
                  <div className="preview-caption-top">{hoveredOption || "No selection"}</div>
                </div>

                <div className="preview-right">
                  {/* show summary when hoveredOption exists */}
                  <PreviewSummary option={hoveredOption} />
                </div>
              </div>
            </div>
          </section>

          {/* Voting Section heading */}
          <section className="voting-section">
            <h2 className="voting-heading">Voting Section</h2>
          </section>

          {/* CONTENT ROW: left = voting menu, right = voting cards */}
          <div className="content-row">
            {/* left column: menu will be rendered but visibility controlled by classes */}
            <div className="left-col">
              <div
                ref={menuRef}
                className={`hamburger-menu ${menuVisible ? "visible-in-voting" : "hidden-while-charts"}`}
                aria-hidden={!menuVisible}
              >
                <div className="menu-header">
                  <i className="fas fa-bars"></i>
                  <span>Voting Menu</span>
                </div>
                <div className="hamburger-links">
                  <a href="#fav-place-domain" className="hamburger-link"><i className="fas fa-map-marker-alt"></i><span>Fav Place</span></a>
                  <a href="#hangout-domain" className="hamburger-link"><i className="fas fa-users"></i><span>Hangout</span></a>
                  <a href="#food-domain" className="hamburger-link"><i className="fas fa-utensils"></i><span>Food</span></a>
                  <a href="#events-domain" className="hamburger-link"><i className="fas fa-calendar-alt"></i><span>Events</span></a>
                  <a href="#clubs-domain" className="hamburger-link"><i className="fas fa-music"></i><span>Clubs</span></a>
                  <a href="#sports-domain" className="hamburger-link"><i className="fas fa-futbol"></i><span>Sports</span></a>
                  <a href="#library-domain" className="hamburger-link"><i className="fas fa-book"></i><span>Library</span></a>
                  <a href="#hostel-domain" className="hamburger-link"><i className="fas fa-bed"></i><span>Hostel</span></a>
                  <a href="#memories-domain" className="hamburger-link"><i className="fas fa-star"></i><span>Memories</span></a>
                </div>
              </div>
            </div>

            {/* right column: voting cards */}
            <div className="right-col">
              <div className="questions-grid">
                {/* --- All your original domain sections and cards preserved below (unchanged) --- */}

                {/* Domain: Favorite Place */}
                <div className="domain-section" id="fav-place-domain" style={{ marginTop: "0.5rem" }}>
                  <div className="domain-title">Favorite Place</div>
                  <div className="domain-cards">
                    <div className="card">
                      <h3>What is your most favorite place to visit in Chitkara University?</h3>
                      <div className="options">
                        <label><input type="radio" name="q1" value="Square 1" /> Square 1</label>
                        <label><input type="radio" name="q1" value="Library" /> Library</label>
                        <label><input type="radio" name="q1" value="Sportorium" /> Sportorium</label>
                        <label><input type="radio" name="q1" value="Other" /> Other</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Which is the most photogenic spot on campus?</h3>
                      <div className="options">
                        <label><input type="radio" name="q2" value="Alpha Zone" /> Alpha Zone</label>
                        <label><input type="radio" name="q2" value="Hostel Road" /> Hostel Road</label>
                        <label><input type="radio" name="q2" value="Exploretorium" /> Exploretorium</label>
                        <label><input type="radio" name="q2" value="Other" /> Other</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Where do you go for peace and quiet?</h3>
                      <div className="options">
                        <label><input type="radio" name="q3" value="Library" /> Library</label>
                        <label><input type="radio" name="q3" value="Alpha Zone" /> Alpha Zone</label>
                        <label><input type="radio" name="q3" value="Temple" /> Temple</label>
                        <label><input type="radio" name="q3" value="Hostel Room" /> Hostel Room</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>


                    
                  </div>
                </div>

                {/* Domain: Hangout */}
                <div className="domain-section" id="hangout-domain">
                  <div className="domain-title">Hangout</div>
                  <div className="domain-cards">
                    <div className="card">
                      <h3>Favorite place to hangout with friends?</h3>
                      <div className="options">
                        <label><input type="radio" name="q4" value="Subway" /> Subway</label>
                        <label><input type="radio" name="q4" value="Square 1" /> Square 1 </label>
                        <label><input type="radio" name="q4" value="Hostel Common Room" /> Hostel Common Room</label>
                        <label><input type="radio" name="q4" value="Other" /> Other</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Where do you spend most of your free time?</h3>
                      <div className="options">
                        <label><input type="radio" name="q5" value="Hostel" /> Hostel</label>
                        <label><input type="radio" name="q5" value="Square 1" /> Square 1</label>
                        <label><input type="radio" name="q5" value="Library" /> Library</label>
                        <label><input type="radio" name="q5" value="Sports Ground" /> Sports Ground</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Best place for group study?</h3>
                      <div className="options">
                        <label><input type="radio" name="q6" value="Library" /> Library</label>
                        <label><input type="radio" name="q6" value="Hostel Room" /> Hostel Room</label>
                        <label><input type="radio" name="q6" value="Square 1" /> Square 1</label>
                        <label><input type="radio" name="q6" value="CSE Block" /> CSE Block</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>
                  </div>
                </div>

                {/* Domain: Food */}
                <div className="domain-section" id="food-domain">
                  <div className="domain-title">Food</div>
                  <div className="domain-cards">
                    <div className="card">
                      <h3>Best food spot on campus?</h3>
                      <div className="options">
                        <label><input type="radio" name="q7" value="Square 1" /> Square 1</label>
                        <label><input type="radio" name="q7" value="Square 2" /> Square 2</label>
                        <label><input type="radio" name="q7" value="Subway" /> Subway </label>
                        <label><input type="radio" name="q7" value="First Coffee" /> First Coffee</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Favorite snack at Chitkara?</h3>
                      <div className="options">
                        <label><input type="radio" name="q8" value="Maggi" /> Maggi</label>
                        <label><input type="radio" name="q8" value="Sandwich" /> Sandwich</label>
                        <label><input type="radio" name="q8" value="Chaat" /> Chaat</label>
                        <label><input type="radio" name="q8" value="Pasta" /> Pasta</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Where do you get the best coffee?</h3>
                      <div className="options">
                        <label><input type="radio" name="q9" value="Dohful" /> Dohful</label>
                        <label><input type="radio" name="q9" value="Chai Nagri" /> Chai Nagri</label>
                        <label><input type="radio" name="q9" value="First Coffee" /> First Coffee</label>
                        <label><input type="radio" name="q9" value="Hostel Mess" /> Hostel Mess</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>
                  </div>
                </div>

                {/* Domain: Events */}
                <div className="domain-section" id="events-domain">
                  <div className="domain-title">Events</div>
                  <div className="domain-cards">
                    <div className="card">
                      <h3>Which event do you enjoy the most?</h3>
                      <div className="options">
                        <label><input type="radio" name="q10" value="Freshers'" /> Freshers'</label>
                        <label><input type="radio" name="q10" value="Rangrezz" /> Rangrezz</label>
                        <label><input type="radio" name="q10" value="Sports Fest" /> Sports Fest</label>
                        <label><input type="radio" name="q10" value="Other" /> Other</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Which event has the best food stalls?</h3>
                      <div className="options">
                        <label><input type="radio" name="q11" value="Rangrezz" /> Rangrezz</label>
                        <label><input type="radio" name="q11" value="Sports Fest" /> Sports Fest</label>
                        <label><input type="radio" name="q11" value="Hostel Night" /> Hostel Night</label>
                        <label><input type="radio" name="q11" value="Other" /> Other</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Which event do you participate in the most?</h3>
                      <div className="options">
                        <label><input type="radio" name="q12" value="Sports Fest" /> Sports Fest</label>
                        <label><input type="radio" name="q12" value="Freshers'" /> Freshers'</label>
                        <label><input type="radio" name="q12" value="Hostel Night" /> Hostel Night</label>
                        <label><input type="radio" name="q12" value="None" /> None</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>
                  </div>
                </div>

                {/* Domain: Clubs */}
                <div className="domain-section" id="clubs-domain">
                  <div className="domain-title">Clubs</div>
                  <div className="domain-cards">
                    <div className="card">
                      <h3>Which club is your favorite?</h3>
                      <div className="options">
                        <label><input type="radio" name="q13" value="Music Club" /> Music Club</label>
                        <label><input type="radio" name="q13" value="Dance Club" /> Dance Club</label>
                        <label><input type="radio" name="q13" value="Coding Club" /> Coding Club</label>
                        <label><input type="radio" name="q13" value="Drama Club" /> Drama Club</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Which club organizes the best events?</h3>
                      <div className="options">
                        <label><input type="radio" name="q14" value="Music Club" /> Music Club</label>
                        <label><input type="radio" name="q14" value="Dance Club" /> Dance Club</label>
                        <label><input type="radio" name="q14" value="Coding Club" /> Coding Club</label>
                        <label><input type="radio" name="q14" value="Drama Club" /> Drama Club</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Which club would you like to join?</h3>
                      <div className="options">
                        <label><input type="radio" name="q15" value="Music Club" /> Music Club</label>
                        <label><input type="radio" name="q15" value="Dance Club" /> Dance Club</label>
                        <label><input type="radio" name="q15" value="Coding Club" /> Coding Club</label>
                        <label><input type="radio" name="q15" value="Drama Club" /> Drama Club</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>
                  </div>
                </div>

                {/* Domain: Sports, Library, Hostel, Memories preserved below unchanged */}
                <div className="domain-section" id="sports-domain">
                  <div className="domain-title">Sports</div>
                  <div className="domain-cards">
                    <div className="card">
                      <h3>Favorite sport to play at Chitkara?</h3>
                      <div className="options">
                        <label><input type="radio" name="q16" value="Football" /> Football</label>
                        <label><input type="radio" name="q16" value="Basketball" /> Basketball</label>
                        <label><input type="radio" name="q16" value="Cricket" /> Cricket</label>
                        <label><input type="radio" name="q16" value="Badminton" /> Badminton</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Which sport do you watch the most?</h3>
                      <div className="options">
                        <label><input type="radio" name="q17" value="Football" /> Football</label>
                        <label><input type="radio" name="q17" value="Basketball" /> Basketball</label>
                        <label><input type="radio" name="q17" value="Cricket" /> Cricket</label>
                        <label><input type="radio" name="q17" value="Volleyball" /> Volleyball</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Which sport would you like to see more events for?</h3>
                      <div className="options">
                        <label><input type="radio" name="q18" value="Football" /> Football</label>
                        <label><input type="radio" name="q18" value="Basketball" /> Basketball</label>
                        <label><input type="radio" name="q18" value="Cricket" /> Cricket</label>
                        <label><input type="radio" name="q18" value="Pickleball" /> Pickleball</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>
                  </div>
                </div>

                <div className="domain-section" id="library-domain">
                  <div className="domain-title">Library</div>
                  <div className="domain-cards">
                    <div className="card">
                      <h3>How often do you visit the library?</h3>
                      <div className="options">
                        <label><input type="radio" name="q19" value="Daily" />Daily</label>
                        <label><input type="radio" name="q19" value="Weekly" /> Weekly</label>
                        <label><input type="radio" name="q19" value="Rarely" /> Rarely</label>
                        <label><input type="radio" name="q19" value="Never" /> Never</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Favorite spot in the library?</h3>
                      <div className="options">
                        <label><input type="radio" name="q20" value="Reading Room" /> Reading Room</label>
                        <label><input type="radio" name="q20" value="Computer Section" /> Computer Section</label>
                        <label><input type="radio" name="q20" value="Group Study Area" /> Group Study Area</label>
                        <label><input type="radio" name="q20" value="Stacks" /> Stacks</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>What do you use the library for most?</h3>
                      <div className="options">
                        <label><input type="radio" name="q21" value="Study" /> Study</label>
                        <label><input type="radio" name="q21" value="Group Work" /> Group Work</label>
                        <label><input type="radio" name="q21" value="Research" /> Research</label>
                        <label><input type="radio" name="q21" value="Reading Novels" /> Reading Novels</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>
                  </div>
                </div>

                <div className="domain-section" id="hostel-domain">
                  <div className="domain-title">Hostel</div>
                  <div className="domain-cards">
                    <div className="card">
                      <h3>Best thing about hostel life?</h3>
                      <div className="options">
                        <label><input type="radio" name="q22" value="Friends" /> Friends</label>
                        <label><input type="radio" name="q22" value="Food" /> Food</label>
                        <label><input type="radio" name="q22" value="Freedom" /> Freedom</label>
                        <label><input type="radio" name="q22" value="Events" /> Events</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>What do you miss most about hostel during holidays?</h3>
                      <div className="options">
                        <label><input type="radio" name="q23" value="Friends" /> Friends</label>
                        <label><input type="radio" name="q23" value="Hostel Food" /> Hostel Food</label>
                        <label><input type="radio" name="q23" value="Hostel Events" /> Hostel Events</label>
                        <label><input type="radio" name="q23" value="Nothing" /> Nothing</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Favorite hostel event?</h3>
                      <div className="options">
                        <label><input type="radio" name="q24" value="Hostel Night" /> Hostel Night</label>
                        <label><input type="radio" name="q24" value="DJ Night" /> DJ Night</label>
                        <label><input type="radio" name="q24" value="Sports" /> Sports</label>
                        <label><input type="radio" name="q24" value="Other" /> Other</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>
                  </div>
                </div>

                <div className="domain-section" id="memories-domain">
                  <div className="domain-title">Memories</div>
                  <div className="domain-cards">
                    <div className="card">
                      <h3>Your most memorable moment at Chitkara?</h3>
                      <div className="options">
                        <label><input type="radio" name="q25" value="First Day" /> First Day</label>
                        <label><input type="radio" name="q25" value="Fests" /> Fests</label>
                        <label><input type="radio" name="q25" value="Hostel Nights" /> Hostel Nights</label>
                        <label><input type="radio" name="q25" value="Other" /> Other</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Best memory with friends?</h3>
                      <div className="options">
                        <label><input type="radio" name="q26" value="Group Study" /> Group Study</label>
                        <label><input type="radio" name="q26" value="Night Outs" /> Night Outs</label>
                        <label><input type="radio" name="q26" value="Hostel Fun" /> Hostel Fun</label>
                        <label><input type="radio" name="q26" value="Trips" /> Trips</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>

                    <div className="card">
                      <h3>Which moment would you relive?</h3>
                      <div className="options">
                        <label><input type="radio" name="q27" value="First Day" /> First Day</label>
                        <label><input type="radio" name="q27" value="Fests" /> Fests</label>
                        <label><input type="radio" name="q27" value="Hostel Nights" /> Hostel Nights</label>
                        <label><input type="radio" name="q27" value="Other" /> Other</label>
                      </div>
                      <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: review panel stays sticky */}
        <aside className="review-panel" id="reviewPanel">
          <div className="review-header">
            <h3><i className="fas fa-comments"></i> Recent Reviews</h3>
            <button className="add-review-btn-header" onClick={() => setIsModalOpen(true)}>
              <i className="fas fa-plus"></i> Add Review
            </button>
          </div>
          <div className="review-content">
            {flatReviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first!</p>
            ) : (
              flatReviews.map((rev, index) => (
                <div key={index} className="review-card">
                  <p className="review-text">"{rev.text}"</p>
                  <span className="review-option">Re: <strong>{rev.optionName}</strong></span>
                  <span className="review-author">- {rev.author}</span>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Write a Review</h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-content">
              <form onSubmit={handleReviewSubmit}>
                <div className="form-group">
                  <label htmlFor="reviewAuthor">Your Name:</label>
                  <input type="text" id="reviewAuthor" name="author" required />
                </div>
                <div className="form-group">
                  <label htmlFor="reviewOptionSelect">Which option are you reviewing?</label>
                  <select id="reviewOptionSelect" name="option" required>
                    <option value="Square 1">Square 1</option>
                    <option value="Library">Library</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Sports">Sports</option>
                    <option value="Dohful">Dohful</option>
                    <option value="Maggi">Maggi</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="reviewText">Your Review:</label>
                  <textarea id="reviewText" name="text" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-btn modal-submit-btn">Submit Review</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
