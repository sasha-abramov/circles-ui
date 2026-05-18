/* ─── Chat screen ─────────────────────────────────────────── */

const CHAT_CIRCLES = CIRCLES.filter(c => !c.archived);

const CHAT_MESSAGES = {
  /* My Family — contains a shared location and an image */
  1: [
    { id: 27, type: "event", text: "👋 Grandma joined the Circle", date: "Sat, May 3" },
    { id: 1,  sender: "Mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", type: "text",     text: "Morning everyone! Big family BBQ this Saturday at our place 🎉", time: "9:10 AM", date: "Sat, May 3", isOwn: false },
    { id: 2,  sender: "Ben",   initial: "B", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", type: "text",     text: "Count me in! Should I bring something?", time: "9:14 AM", date: "Sat, May 3", isOwn: false },
    { id: 3,  sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "text",     text: "We'll be there! What time does it start?", time: "9:15 AM", date: "Sat, May 3", isOwn: true, read: true },
    { id: 4,  sender: "Mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", type: "text",     text: "Around 3pm! Ben, you can bring dessert 🍰", time: "9:18 AM", date: "Sat, May 3", isOwn: false },
    { id: 5,  sender: "Tanya", initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", type: "text",     text: "I'll be a bit late, finishing up some work stuff", time: "9:20 AM", date: "Sat, May 3", isOwn: false },
    { id: 6,  sender: "Dad",   initial: "D", gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)", type: "text",     text: "Already fired up the grill 🔥", time: "2:45 PM", date: "Sat, May 3", isOwn: false },
    { id: 7,  sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "text",     text: "On our way, 15 mins!", time: "2:47 PM", date: "Sat, May 3", isOwn: true, read: true },
    { id: 8,  sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "location", location: { street: "742 Evergreen Terrace", city: "Springfield, IL", lat: 39.78172, lng: -89.65007 }, time: "2:52 PM", date: "Sat, May 3", isOwn: true, read: true },
    { id: 9,  sender: "Ben",   initial: "B", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", type: "text",     text: "Just parked! Where's the dessert table 😂", time: "3:10 PM", date: "Sat, May 3", isOwn: false },
    { id: 10, sender: "Mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", type: "image",    image: { caption: "The grill is ready 🥩🌽", gradient: "linear-gradient(160deg,#fcd34d,#f97316,#dc2626)" }, time: "3:15 PM", date: "Sat, May 3", isOwn: false },
    { id: 11, sender: "Tanya", initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", type: "text",     text: "Finally here, sorry for being late! 😅", time: "3:42 PM", date: "Sat, May 3", isOwn: false },
    { id: 12, sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "text",     text: "No worries, food is still going strong 🍖", time: "3:43 PM", date: "Sat, May 3", isOwn: true, read: true },
    { id: 13, sender: "Mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", type: "text",     text: "Did everyone get home safe?", time: "2:14 PM", date: "Yesterday", isOwn: false },
    { id: 14, sender: "Ben",   initial: "B", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", type: "text",     text: "Yeah, just got in!", time: "2:15 PM", date: "Yesterday", isOwn: false },
    { id: 15, sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "location", location: { street: "1234 N Cahuenga Blvd", city: "Hollywood, CA", lat: 34.09781, lng: -118.32963 }, time: "2:16 PM", date: "Yesterday", isOwn: true, read: true },
    { id: 16, sender: "Tanya", initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", type: "text",     text: "Still at the office, won't be long", time: "2:18 PM", date: "Today", isOwn: false },
    { id: 17, sender: "Mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", type: "text",     text: "Dinner is ready by 7, don't be late 🍝", time: "2:45 PM", date: "Today", isOwn: false },
    { id: 23, type: "event", text: "📍 Dad arrived at Home", date: "Today" },
    { id: 18, sender: "Mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", type: "image",    image: { caption: "Tonight's dinner 😍", gradient: "linear-gradient(160deg,#f9a8d4,#fcd34d,#6ee7b7)" }, time: "2:47 PM", date: "Today", isOwn: false },
    { id: 19, sender: "Dad",   initial: "D", gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)", type: "text",     text: "On my way!", time: "3:02 PM", date: "Today", isOwn: false },
    { id: 20, sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "text",     text: "Heading home now too 🚗", time: "3:05 PM", date: "Today", isOwn: true, read: false },
    { id: 21, sender: "Ben",  initial: "B", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", type: "sos", sos: { location: { street: "4730 Crystal Springs Dr", city: "Los Angeles, CA", lat: 34.13614, lng: -118.29404 } }, time: "3:22 PM", date: "Today", isOwn: false },
    { id: 22, sender: "You",  initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "sos", sos: { location: { street: "350 S Grand Ave", city: "Los Angeles, CA", lat: 34.05374, lng: -118.25149 } }, time: "4:08 PM", date: "Today", isOwn: true, read: false },
    { id: 24, type: "event", text: "🚶 Tanya left Home", date: "Today" },
    { id: 25, type: "event", text: "🗂 Lake Cabin has been archived by Mom", date: "Today" },
    { id: 26, type: "event", text: "🗑 Old Apartment has been deleted by Dad", date: "Today" },
  ],
  /* Work — contains a shared PDF */
  2: [
    { id: 15, type: "event", text: "👋 Alex joined the Circle", date: "Today" },
    { id: 1, sender: "Tanya", initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", type: "text", text: "Stand-up in 10 minutes", time: "9:50 AM", date: "Today", isOwn: false },
    { id: 2, sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "text", text: "On it, joining now", time: "9:51 AM", date: "Today", isOwn: true, read: true },
    { id: 3, sender: "Ben",   initial: "B", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", type: "text", text: "Running 2 min late", time: "9:58 AM", date: "Today", isOwn: false },
    { id: 13, type: "event", text: "📍 Ben arrived at Office", date: "Today" },
    { id: 4, sender: "Tanya", initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", type: "text", text: "No worries, we just started. Here are the meeting notes:", time: "10:00 AM", date: "Today", isOwn: false },
    { id: 5, sender: "Tanya", initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", type: "file",  file: { name: "Meeting_Notes_May2026.pdf", size: "84 KB", pages: 3 }, time: "10:01 AM", date: "Today", isOwn: false },
    { id: 6, sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "text", text: "Thanks, will review after the call 👍", time: "10:15 AM", date: "Today", isOwn: true, read: true },
    { id: 7, sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "checkin", checkin: { address: "19 Plympton Street", city: "Los Angeles, CA", lat: 34.08247, lng: -118.32104 }, time: "10:32 AM", date: "Today", isOwn: true, read: false },
    { id: 8, sender: "Ben",   initial: "B", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", type: "checkin", checkin: { address: "350 S Grand Ave", city: "Los Angeles, CA", lat: 34.05374, lng: -118.25149 }, time: "10:48 AM", date: "Today", isOwn: false },
    { id: 9, sender: "Tanya", initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", type: "location", location: { street: "1515 Abbot Kinney Blvd", city: "Venice, CA", lat: 33.99139, lng: -118.46591 }, time: "11:05 AM", date: "Today", isOwn: false },
    { id: 10, sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "location", location: { street: "1234 N Cahuenga Blvd", city: "Hollywood, CA", lat: 34.09781, lng: -118.32963 }, time: "11:08 AM", date: "Today", isOwn: true, read: true },
    { id: 11, sender: "Ben",   initial: "B", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", type: "sos", sos: { location: { street: "8800 Sunset Blvd", city: "West Hollywood, CA", lat: 34.09075, lng: -118.38590 } }, time: "11:32 AM", date: "Today", isOwn: false },
    { id: 12, sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "sos", sos: { location: { street: "5905 Wilshire Blvd", city: "Los Angeles, CA", lat: 34.06390, lng: -118.35920 } }, time: "12:05 PM", date: "Today", isOwn: true, read: false },
    { id: 14, type: "event", text: "🚶 Tanya left Office", date: "Today" },
    { id: 16, type: "event", text: "🚪 Chris left the Circle", date: "Today" },
  ],
  /* Beersaurus — contains a shared location */
  3: [
    { id: 8, type: "event", text: "👋 Jo joined the Circle", date: "May 5" },
    { id: 1, sender: "Mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", type: "text",     text: "Anyone up for drinks Friday?", time: "8:12 PM", date: "May 5", isOwn: false },
    { id: 2, sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "text",     text: "Definitely 🍻", time: "8:14 PM", date: "May 5", isOwn: true, read: true },
    { id: 3, sender: "Mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", type: "text",     text: "Great, 8pm — I'll send the spot", time: "8:15 PM", date: "May 5", isOwn: false },
    { id: 4, sender: "Mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", type: "location", location: { street: "1515 Abbot Kinney Blvd", city: "Venice, CA", lat: 33.99139, lng: -118.46591 }, time: "8:16 PM", date: "May 5", isOwn: false },
    { id: 5, sender: "You",   initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", type: "text",     text: "Perfect, see you there!", time: "8:17 PM", date: "May 5", isOwn: true, read: false },
    { id: 6, type: "event", text: "🗂 Rooftop Bar has been archived by Mom", date: "May 5" },
    { id: 7, type: "event", text: "🗑 Old Pub has been deleted by Mom", date: "May 5" },
  ],
};

const UNREAD = { 1: 2, 3: 1 };

/* ── Chat list item — mirrors CircleListItem sizing ── */
function ChatCircleItem({ circle, active, onClick }) {
  const [hov, setHov] = useState(false);
  const msgs = CHAT_MESSAGES[circle.id] || [];
  const last = msgs[msgs.length - 1];
  const unread = UNREAD[circle.id] || 0;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px", cursor: "pointer",
        background: active ? "#F2F7FF" : hov ? "#F5F7FA" : "transparent",
        borderBottom: "1px solid #F0F2F7",
        transition: "background 0.15s",
        minHeight: 80,
      }}
    >
      <CircleAvatar gradient={circle.gradient} icon={circle.icon} size={56} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
          <div style={{ fontSize: 17, fontWeight: 600, color: "#1B1E28", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {circle.name}
          </div>
          <div style={{ fontSize: 12, color: "#9CA3AF", flexShrink: 0, marginLeft: 8 }}>
            {last ? (last.date && last.date !== "Today" ? last.date : last.time) : ""}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, color: "#6B7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
            {last ? (() => {
              if (last.type === "event") return last.text;
              const prefix = last.isOwn ? "You" : last.sender;
              const body = last.type === "location" ? "📍 Location" : last.type === "image" ? "🖼 Photo" : last.type === "file" ? "📎 " + last.file.name : last.type === "sos" ? "🆘 SOS Alert" : last.type === "checkin" ? "📍 Checked in" : last.text;
              return `${prefix}: ${body}`;
            })() : "No messages yet"}
          </div>
          {unread > 0 && (
            <div style={{
              minWidth: 20, height: 20, borderRadius: 100,
              background: "#0F6EFF", color: "#fff",
              fontSize: 11, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 5px", flexShrink: 0, marginLeft: 8,
            }}>
              {unread}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Left panel ── */
function ChatListPanel({ selected, onSelect, isMobile }) {
  return (
    <div style={{
      width: isMobile ? "100%" : 360, height: "100%",
      background: "#fff",
      borderRight: isMobile ? "none" : "1px solid #E9E9E9",
      display: "flex", flexDirection: "column", flexShrink: 0,
    }}>
      <div style={{
        height: isMobile ? 56 : 64, padding: "0 16px",
        display: "flex", alignItems: "center",
        borderBottom: "1px solid #F0F2F7", flexShrink: 0,
      }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: "#1B1E28" }}>Chat</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {CHAT_CIRCLES.map(c => (
          <ChatCircleItem
            key={c.id}
            circle={c}
            active={selected?.id === c.id}
            onClick={() => onSelect(c)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Static OSM map snippet centered on lat/lng ── */
function StaticMapTiles({ lat, lng, width, height, zoom = 15 }) {
  const n = Math.pow(2, zoom);
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const worldX = ((lng + 180) / 360) * n * 256;
  const worldY = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * n * 256;
  const originX = worldX - width / 2;
  const originY = worldY - height / 2;
  const tiles = [];
  for (let tx = Math.floor(originX / 256); tx <= Math.floor((originX + width) / 256); tx++) {
    for (let ty = Math.floor(originY / 256); ty <= Math.floor((originY + height) / 256); ty++) {
      if (ty < 0 || ty >= n) continue;
      tiles.push({ tx, ty, left: tx * 256 - originX, top: ty * 256 - originY });
    }
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#e8edf2" }}>
      {tiles.map(t => (
        <img
          key={t.tx + "_" + t.ty}
          src={"https://tile.openstreetmap.org/" + zoom + "/" + (((t.tx % n) + n) % n) + "/" + t.ty + ".png"}
          width={256}
          height={256}
          draggable={false}
          style={{ position: "absolute", left: t.left, top: t.top, display: "block" }}
          alt=""
        />
      ))}
    </div>
  );
}

/* ── Avatar map pin (matches the Map screen markers) ── */
function MapAvatarPin({ gradient, initial, size = 38 }) {
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-100%)", display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none" }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: gradient || "linear-gradient(135deg,#0F6EFF,#00C7BE)",
        border: "2.5px solid #fff", boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: Math.round(size * 0.42), fontWeight: 700, color: "#fff",
      }}>
        {initial}
      </div>
      <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #fff", filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))", marginTop: -1 }} />
    </div>
  );
}

/* ── "View on map" action button for location cards ── */
function ViewMapButton({ isOwn }) {
  const [hov, setHov] = useState(false);
  const bg = isOwn
    ? (hov ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.16)")
    : (hov ? "#DCE7FF" : "#EBF2FF");
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", height: 32, borderRadius: 4, marginTop: 8,
        background: bg,
        border: "none", cursor: "pointer",
        fontSize: 13, fontWeight: 700, color: isOwn ? "#fff" : "#0F6EFF",
        transition: "background 0.15s",
        fontFamily: '"Google Sans", sans-serif',
      }}
    >View on Map</button>
  );
}

/* ── Message bubble content by type ── */
function LocationBubble({ location, isOwn, sender, gradient, initial }) {
  const hasCoords = typeof location.lat === "number" && typeof location.lng === "number";
  return (
    <div style={{ width: 240, borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      <div style={{ padding: "10px 14px 8px", background: "#fff", borderBottom: "1px solid #F0F2F7" }}>
        {!isOwn && <div style={{ fontSize: 11, fontWeight: 700, color: "#0F6EFF", marginBottom: 2 }}>{sender}</div>}
        <div style={{ fontSize: 14, lineHeight: "20px", color: "#1B1E28" }}>Shared Location</div>
      </div>
      {/* Map */}
      <div style={{ height: 110, position: "relative", overflow: "hidden", background: "#e8edf2" }}>
        {hasCoords && (
          <StaticMapTiles lat={location.lat} lng={location.lng} width={240} height={110} zoom={15} />
        )}
        <MapAvatarPin gradient={gradient} initial={initial} />
      </div>
      {/* Info */}
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1B1E28", marginBottom: 2 }}>{location.street}</div>
        <div style={{ fontSize: 11, color: "#6B7280", lineHeight: "16px" }}>{location.city}</div>
        <ViewMapButton isOwn={false} />
      </div>
    </div>
  );
}

function ImageBubble({ image, isOwn }) {
  return (
    <div style={{ width: 220, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      <div style={{ height: 160, background: image.gradient, position: "relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {/* Simulated photo content */}
        <div style={{ position:"absolute", inset:0, opacity:0.3, backgroundImage:"radial-gradient(circle at 30% 40%, rgba(255,255,255,0.6) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4) 0%, transparent 40%)" }} />
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.7 }}>
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="#fff" strokeWidth="1.5"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="#fff"/>
          <path d="M21 15l-5-5L5 21" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {image.caption && (
        <div style={{ padding: "8px 12px", background: "#fff", fontSize: 14, color: isOwn ? "#0F6EFF" : "#1B1E28" }}>
          {image.caption}
        </div>
      )}
    </div>
  );
}

function FileBubble({ file, isOwn }) {
  const textColor = isOwn ? "#0F6EFF" : "#1B1E28";
  const subColor = isOwn ? "rgba(15,110,255,0.6)" : "#6B7280";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background: "#fff", borderRadius:14, width:240, boxShadow: isOwn ? "0 2px 8px rgba(15,110,255,0.28)" : "0 1px 4px rgba(0,0,0,0.08)" }}>
      {/* PDF icon */}
      <div style={{ width:40, height:48, borderRadius:6, background:"#FF3B30", flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative" }}>
        <span style={{ fontSize:10, fontWeight:800, color:"#fff", letterSpacing:0.5 }}>PDF</span>
        <div style={{ position:"absolute", top:0, right:0, width:10, height:10, background:"rgba(255,255,255,0.25)", borderRadius:"0 6px 0 6px" }} />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:14, fontWeight:700, color:textColor, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{file.name}</div>
        <div style={{ fontSize:11, color:subColor, marginTop:2 }}>{file.size} · {file.pages} pages</div>
      </div>
    </div>
  );
}

function SOSBubble({ msg }) {
  const { sos, isOwn, sender, gradient, initial } = msg;
  const loc = sos && sos.location;
  const hasCoords = loc && typeof loc.lat === "number" && typeof loc.lng === "number";
  return (
    <div style={{ width: 240, borderRadius: 14, overflow: "hidden", background: "#FF3B30", boxShadow: "0 2px 8px rgba(255,59,48,0.3)" }}>
      {/* Header */}
      <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
        {!isOwn && (
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>{sender} needs help</div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 512 512" fill="#fff" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="m265.615 199.5h-23c-8.271 0-15 6.729-15 15v83c0 8.271 6.729 15 15 15h23c8.271 0 15-6.729 15-15v-83c0-8.271-6.729-15-15-15z"/>
            <path d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm-95.063 331.263c-9.413 7.2-21.957 11.157-35.349 11.157-.102 0-.202 0-.304 0-27.207-.122-56.122-17.099-56.122-48.321 0-8.284 6.716-15 15-15s15 6.716 15 15c0 13.262 16.105 18.276 26.256 18.321.049 0 .1.001.151.001 5.641 0 23.189-1.401 23.343-18.604.103-11.417-7.367-15.812-31.407-24.059-.828-.284-3.402-1.107-3.863-1.27-14.952-5.282-46.063-16.273-45.756-50.654.136-15.211 6.52-28.414 17.974-37.177 9.484-7.255 22.112-11.227 35.653-11.157 27.207.122 56.122 17.099 56.122 48.321 0 8.284-6.716 15-15 15s-15-6.716-15-15c0-13.262-16.105-18.276-26.256-18.321-5.447-.063-23.339 1.244-23.494 18.603-.077 8.568 3.312 13.806 22.942 21.08.172.054 4.437 1.521 6.413 2.199 11.271 3.866 22.926 7.864 32.578 14.896 12.811 9.333 19.235 22.054 19.094 37.807-.137 15.212-6.52 28.415-17.975 37.178zm149.678-33.763c0 24.813-20.187 45-45 45h-23c-24.813 0-45-20.187-45-45v-83c0-24.813 20.187-45 45-45h23c24.813 0 45 20.187 45 45zm115.524 33.763c-9.413 7.2-21.957 11.157-35.349 11.157-.102 0-.202 0-.304 0-27.207-.122-56.122-17.099-56.122-48.321 0-8.284 6.716-15 15-15s15 6.716 15 15c0 13.262 16.104 18.276 26.256 18.321 5.486-.001 23.339-1.244 23.494-18.603.103-11.417-7.367-15.812-31.407-24.059-.828-.284-3.402-1.107-3.863-1.27-14.951-5.282-46.063-16.272-45.755-50.654.136-15.211 6.52-28.414 17.974-37.177 9.413-7.2 21.956-11.158 35.349-11.158.101 0 .202.001.304.001 27.207.122 56.122 17.099 56.122 48.321 0 8.284-6.716 15-15 15s-15-6.716-15-15c0-13.262-16.105-18.276-26.256-18.321-5.511-.004-23.338 1.244-23.494 18.603-.077 8.568 3.312 13.806 22.941 21.08.172.054 4.437 1.521 6.413 2.199 11.271 3.866 22.926 7.864 32.578 14.896 12.811 9.334 19.235 22.054 19.094 37.808-.137 15.211-6.521 28.414-17.975 37.177z"/>
          </svg>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: "20px" }}>SOS Alert</div>
        </div>
      </div>
      {/* Map */}
      <div style={{ height: 110, position: "relative", overflow: "hidden", background: "#e8edf2" }}>
        {hasCoords && (
          <StaticMapTiles lat={loc.lat} lng={loc.lng} width={240} height={110} zoom={15} />
        )}
        <MapAvatarPin gradient={gradient} initial={initial} />
      </div>
      {/* Info */}
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{loc.street}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: "16px" }}>{loc.city}</div>
        <ViewMapButton isOwn />
      </div>
    </div>
  );
}

function CheckInBubble({ msg }) {
  const { checkin, isOwn, sender, gradient, initial } = msg;
  const hasCoords = typeof checkin.lat === "number" && typeof checkin.lng === "number";
  return (
    <div>
      <div style={{ width: 240, borderRadius: 14, overflow: "hidden", background: "#0F6EFF", boxShadow: "0 2px 8px rgba(15,110,255,0.28)" }}>
        {/* Header */}
        <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
          {!isOwn && <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 2 }}>{sender}</div>}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <img src="assets/icons/check-in.svg" width={20} height={20} alt=""
              style={{ filter: "brightness(0) invert(1)", display: "block", flexShrink: 0 }} />
            <div style={{ fontSize: 14, fontWeight: 700, lineHeight: "20px", color: "#fff" }}>Checked in</div>
          </div>
        </div>
        {/* Map */}
        <div style={{ height: 110, position: "relative", overflow: "hidden", background: "#e8edf2" }}>
          {hasCoords && (
            <StaticMapTiles lat={checkin.lat} lng={checkin.lng} width={240} height={110} zoom={15} />
          )}
          <MapAvatarPin gradient={gradient} initial={initial} />
        </div>
        {/* Info */}
        <div style={{ padding: "10px 12px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{checkin.address}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: "16px" }}>{checkin.city}</div>
          <ViewMapButton isOwn />
        </div>
      </div>
    </div>
  );
}

function MessageContent({ msg }) {
  if (msg.type === "sos")      return <SOSBubble      msg={msg} />;
  if (msg.type === "checkin")  return <CheckInBubble  msg={msg} />;
  if (msg.type === "location") return <LocationBubble location={msg.location} isOwn={msg.isOwn} sender={msg.sender} gradient={msg.gradient} initial={msg.initial} />;
  if (msg.type === "image")    return <ImageBubble    image={msg.image}       isOwn={msg.isOwn} />;
  if (msg.type === "file")     return <FileBubble     file={msg.file}         isOwn={msg.isOwn} />;
  // text
  return (
    <div style={{
      background: msg.isOwn ? "#0F6EFF" : "#fff",
      color: msg.isOwn ? "#fff" : "#1B1E28",
      borderRadius: msg.isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
      padding: "10px 14px", fontSize: 14, lineHeight: "20px", maxWidth: 320,
      boxShadow: msg.isOwn ? "none" : "0 1px 4px rgba(0,0,0,0.08)",
    }}>
      {!msg.isOwn && <div style={{ fontSize: 11, fontWeight: 700, color: "#0F6EFF", marginBottom: 2 }}>{msg.sender}</div>}
      {msg.text}
    </div>
  );
}

/* ── Date separator ── */
function DateSeparator({ label }) {
  return (
    <div style={{ position: "sticky", top: 8, zIndex: 10, display: "flex", justifyContent: "center", marginBottom: 16, pointerEvents: "none" }}>
      <div style={{
        background: "rgba(100,116,139,0.55)",
        backdropFilter: "blur(6px)",
        color: "#fff",
        borderRadius: 100,
        padding: "4px 14px",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0.2,
      }}>
        {label}
      </div>
    </div>
  );
}

/* ── System event notice (centered between messages) ── */
function EventMessage({ msg }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <div style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(4px)",
        color: "#9CA3AF",
        borderRadius: 100,
        padding: "5px 14px",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: "16px",
        textAlign: "center",
        maxWidth: 340,
      }}>
        {msg.text}
      </div>
    </div>
  );
}

/* ── Messages ── */
function ChatMessage({ msg, showSender }) {
  if (msg.type === "event") return <EventMessage msg={msg} />;
  if (msg.isOwn) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16, paddingLeft: 56 }}>
        <div>
          <MessageContent msg={msg} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 3 }}>
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>{msg.time}</span>
            {msg.read ? (
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M1 5l3 3 5-7" stroke="#0F6EFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 5l3 3 5-7" stroke="#0F6EFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5l3 3 5-7" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16, paddingRight: 56, alignItems: "flex-start" }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: msg.gradient, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{msg.initial}</span>
      </div>
      <div>
        <MessageContent msg={msg} />
        <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>{msg.time}</div>
      </div>
    </div>
  );
}

function AttachMenuItem({ icon, label, onClose, first }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClose}
      style={{
        width: "100%", height: 44, padding: "0 16px",
        background: hov ? "#F5F7FA" : "#fff",
        border: "none", borderTop: first ? "none" : "1px solid #F0F2F7",
        cursor: "pointer", textAlign: "left",
        display: "flex", alignItems: "center", gap: 12,
        fontSize: 15, fontWeight: 500, color: "#1B1E28",
        transition: "background 0.12s",
        fontFamily: '"Google Sans", sans-serif',
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ── Right panel ── */
function ChatPanel({ circle, onBack, isMobile }) {
  const msgs = CHAT_MESSAGES[circle.id] || [];
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(msgs);
  const [hovAttach, setHovAttach] = useState(false);
  const [hovSend, setHovSend] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const inputRef = useRef(null);
  const attachRef = useRef(null);

  useEffect(() => {
    if (!attachOpen) return;
    function handle(e) {
      if (attachRef.current && !attachRef.current.contains(e.target)) setAttachOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [attachOpen]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const bottomRef = useRef(null);
  const searchRef = useRef(null);
  const members = CIRCLE_MEMBERS[circle.id] || [];
  const online = members.filter(m => m.status.includes("now") || m.status.includes("Active")).length;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  function send(txt) {
    if (!txt.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: "You", initial: "S",
      gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)",
      text: txt.trim(), time: "Now", isOwn: true,
    }]);
    setText("");
    if (inputRef.current) inputRef.current.style.height = "auto";
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", minWidth: 0, backgroundImage: "url(assets/bg-chat-pattern.jpg)", backgroundRepeat: "repeat", backgroundSize: "400px" }}>
      {/* Header */}
      <div style={{
        height: isMobile ? 56 : 64, padding: "0 16px",
        borderBottom: "1px solid #F0F2F7",
        background: "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0, gap: 12,
      }}>
        {/* Left: back + title stack — hidden on mobile when search is open */}
        {!(isMobile && searchOpen) && <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0 }}>
          {isMobile && (
            <button onClick={onBack} style={{
              width: 40, height: 40, marginLeft: -8, marginRight: 4,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "none", cursor: "pointer", borderRadius: 8, flexShrink: 0,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="#1B1E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#1B1E28", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{circle.name}</span>
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>{online} online</span>
          </div>
        </div>}

        {/* Right: search */}
        {isMobile ? (
          searchOpen ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <div style={{ flex: 1 }}>
                <DSInputField placeholder="Search messages..." iconSrc="assets/icons/search.svg" autoFocusDemo />
              </div>
              <button
                onClick={() => { setSearchOpen(false); setSearchText(""); }}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#0F6EFF", whiteSpace: "nowrap", padding: "0 4px" }}
              >Cancel</button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} style={{ width: 40, height: 40, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
              <Icon src="assets/icons/search.svg" size={24} color="#9CA3AF" />
            </button>
          )
        ) : (
          <div style={{ width: 240, flexShrink: 0 }}>
            <DSInputField placeholder="Search messages..." iconSrc="assets/icons/search.svg" />
          </div>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", background: "transparent" }}>
        <div style={{ maxWidth: 640, width: "100%", margin: "0 auto", padding: "16px" }}>
          {(() => {
            const groups = [];
            let currentDate = null;
            let currentGroup = [];
            messages.forEach((msg, i) => {
              if (msg.date !== currentDate) {
                if (currentGroup.length > 0) groups.push({ date: currentDate, msgs: currentGroup });
                currentDate = msg.date;
                currentGroup = [];
              }
              currentGroup.push(msg);
            });
            if (currentGroup.length > 0) groups.push({ date: currentDate, msgs: currentGroup });
            return groups.map(group => (
              <div key={group.date}>
                <DateSeparator label={group.date} />
                {group.msgs.map(msg => <ChatMessage key={msg.id} msg={msg} />)}
              </div>
            ));
          })()}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick actions + Input */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ maxWidth: 640, width: "100%", margin: "0 auto", padding: "0 8px 16px", position: "relative" }}>
          {/* Input field */}
          <div
            onClick={() => inputRef.current?.focus()}
            onMouseEnter={() => setInputActive(true)}
            onMouseLeave={() => { if (document.activeElement !== inputRef.current) setInputActive(false); }}
            style={{ minHeight: 48, maxHeight: 140, borderRadius: 24, border: inputActive ? "1px solid #0F6EFF" : "1px solid transparent", background: "#fff", display: "flex", alignItems: "flex-end", paddingLeft: 4, paddingRight: 4, paddingTop: 4, paddingBottom: 4, gap: 2, transition: "border-color 0.15s", cursor: "text", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
          >
            {/* Attach button + dropdown wrapper */}
            <div ref={attachRef} style={{ position: "relative", flexShrink: 0 }}>
              {attachOpen && (
                <div style={{
                  position: "absolute", bottom: "calc(100% + 8px)", left: 0,
                  background: "#fff", borderRadius: 14,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)",
                  minWidth: 220, zIndex: 200, overflow: "hidden",
                }}>
                  {[
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#1B1E28" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" fill="#1B1E28"/><path d="M21 15l-5-5L5 21" stroke="#1B1E28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Photo & Video" },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#1B1E28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#1B1E28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "File" },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#1B1E28"/></svg>, label: "Share location" },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="#1B1E28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="#1B1E28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Share ETA" },
                  ].map(({ icon, label }, i) => (
                    <AttachMenuItem key={label} icon={icon} label={label} first={i === 0} onClose={() => setAttachOpen(false)} />
                  ))}
                </div>
              )}
              <button
                onClick={e => { e.stopPropagation(); setAttachOpen(v => !v); }}
                onMouseEnter={() => setHovAttach(true)}
                onMouseLeave={() => setHovAttach(false)}
                style={{ width: 40, height: 40, borderRadius: 100, border: "none", background: hovAttach ? "#F5F7FA" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="m5.25 9c0-3.72792 3.02208-6.75 6.75-6.75 3.7279 0 6.75 3.02208 6.75 6.75v7c0 .4142-.3358.75-.75.75s-.75-.3358-.75-.75v-7c0-2.8995-2.3505-5.25-5.25-5.25-2.89949 0-5.25 2.35051-5.25 5.25v8c0 1.7949 1.45507 3.25 3.25 3.25 1.7949 0 3.25-1.4551 3.25-3.25v-7c0-.69036-.5596-1.25-1.25-1.25s-1.25.55964-1.25 1.25v6c0 .4142-.3358.75-.75.75-.41421 0-.75-.3358-.75-.75v-6c0-1.51878 1.2312-2.75 2.75-2.75s2.75 1.23122 2.75 2.75v7c0 2.6234-2.1266 4.75-4.75 4.75-2.62335 0-4.75-2.1266-4.75-4.75z" fill={attachOpen ? "#0F6EFF" : hovAttach ? "#1B1E28" : "#9CA3AF"} />
                </svg>
              </button>
            </div>
            <textarea
              ref={inputRef}
              value={text}
              rows={1}
              onChange={e => {
                setText(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
              }}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(text); } }}
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}
              placeholder="Message..."
              style={{ flex: 1, border: "none", outline: "none", resize: "none", overflow: "hidden", fontSize: 14, lineHeight: "20px", color: "#1B1E28", background: "transparent", fontFamily: '"Google Sans", sans-serif', padding: "10px 4px", maxHeight: 128, alignSelf: "stretch", display: "flex", alignItems: "center" }}
            />
            <button
              onClick={() => send(text)}
              onMouseEnter={() => setHovSend(true)}
              onMouseLeave={() => setHovSend(false)}
              style={{ width: 40, height: 40, borderRadius: "50%", background: hovSend ? "#0D60E0" : "#0F6EFF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="m22 11.9844c0 .6009-.3016 1.2018-.9047 1.5023-2.0104 1.2019-5.8301 3.3052-8.6447 4.7074-2.4125 1.2018-5.72961 2.604-8.04157 3.6056-.20104.1001-.5026.2003-.70364.2003-.40208 0-.90467-.2003-1.20623-.5008-.5026-.5008-.60312-1.2019-.40208-1.903l2.11091-6.2097c.10052-.4006.5026-.6009.90468-.6009h5.02603c.402 0 .8041-.3005.8041-.8012 0-.5008-.3015-.8013-.8041-.8013h-5.02603c-.40208 0-.80416-.3005-.90468-.7011l-2.11091-6.2097c-.20104-.60094-.10052-1.30203.5026-1.80282.50259-.50078 1.20623-.60094 1.80935-.30047 1.90988.80126 5.52859 2.40376 8.04157 3.60564 2.8146 1.40219 6.6343 3.60563 8.6447 4.70735.6031.3005.9047.9014.9047 1.5024z" fill="#fff"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoChatSelected() {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#EBF2FF", gap: 12,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%", background: "#EBF2FF",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M21.455 4.73005C22 5.79961 22 7.19974 22 10V11.1842C22 12.8734 22 13.7179 21.798 14.4069C21.3188 16.041 20.041 17.3188 18.4069 17.798C17.7179 18 16.8734 18 15.1842 18H14.6354L14.5703 18.0001C13.5501 18.0066 12.5562 18.3251 11.7222 18.9128L11.6692 18.9506L9.05848 20.8154C8.1635 21.4546 6.98743 20.5314 7.3959 19.5103C7.68525 18.7869 7.15251 18 6.37341 18H5.77166C3.68863 18 2 16.3114 2 14.2283V10C2 7.19974 2 5.79961 2.54497 4.73005C3.02433 3.78924 3.78924 3.02433 4.73005 2.54497C5.79961 2 7.19974 2 10 2H14C16.8003 2 18.2004 2 19.27 2.54497C20.2108 3.02433 20.9757 3.78924 21.455 4.73005ZM9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10ZM13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10ZM16 11C16.5523 11 17 10.5523 17 10C17 9.44772 16.5523 9 16 9C15.4477 9 15 9.44772 15 10C15 10.5523 15.4477 11 16 11Z" fill="#0F6EFF"/>
        </svg>
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#1B1E28" }}>Select a chat</div>
      <div style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center", maxWidth: 220, lineHeight: "20px" }}>
        Choose a circle from the list to start messaging
      </div>
    </div>
  );
}

function ChatScreen({ isMobile, setHideTabBar }) {
  const [selected, setSelected] = useState(isMobile ? null : CHAT_CIRCLES[0]);
  const [view, setView] = useState("list"); // "list" | "chat"

  function handleSelect(c) {
    setSelected(c);
    if (isMobile) {
      setView("chat");
      setHideTabBar && setHideTabBar(true);
    }
  }

  function handleBack() {
    setView("list");
    setSelected(null);
    setHideTabBar && setHideTabBar(false);
  }

  if (isMobile) {
    return (
      <div style={{ flex: 1, width: "100%", minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {view === "chat" && selected
          ? <ChatPanel key={selected.id} circle={selected} onBack={handleBack} isMobile={true} />
          : <ChatListPanel selected={selected} onSelect={handleSelect} isMobile={true} />
        }
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", width: "100%", minWidth: 0, overflow: "hidden" }}>
      <ChatListPanel selected={selected} onSelect={handleSelect} isMobile={false} />
      {selected ? (
        <ChatPanel key={selected.id} circle={selected} onBack={() => {}} isMobile={false} />
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
}
