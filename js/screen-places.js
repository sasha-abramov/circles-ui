/* PlaceMap (Leaflet mini-map) */
function PlaceMap({ lat, lng, radius, onLocationChange }) {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current || typeof L === "undefined") return;
    const initLat = lat || 34.0522, initLng = lng || -118.2437;

    const map = L.map(mapRef.current, {
      center: [initLat, initLng], zoom: 15,
      zoomControl: false, attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | MapLibre',
    }).addTo(map);

    const pinHtml = `<div style="width:22px;height:22px;background:#0F6EFF;border:3px solid #fff;border-radius:50%;box-sizing:border-box;box-shadow:0 2px 8px rgba(15,110,255,0.45);"></div>`;
    const icon = L.divIcon({ html: pinHtml, className: "", iconSize: [22, 22], iconAnchor: [11, 11] });
    const marker = L.marker([initLat, initLng], { icon, draggable: true }).addTo(map);
    const circle = L.circle([initLat, initLng], {
      radius: radius || 150, color: "#0F6EFF", fillColor: "#0F6EFF", fillOpacity: 0.08, weight: 1.5,
    }).addTo(map);

    const updatePos = (latlng) => {
      marker.setLatLng(latlng); circle.setLatLng(latlng);
      if (onLocationChange) onLocationChange(latlng.lat, latlng.lng);
    };
    marker.on("dragend", () => updatePos(marker.getLatLng()));
    map.on("click", (e) => updatePos(e.latlng));
    markerRef.current = marker; circleRef.current = circle; leafletMapRef.current = map;

    return () => { map.remove(); leafletMapRef.current = null; markerRef.current = null; circleRef.current = null; };
  }, []);

  useEffect(() => { if (circleRef.current) circleRef.current.setRadius(radius || 150); }, [radius]);

  return <div ref={mapRef} style={{ height: 240, borderRadius: 12, overflow: "hidden", border: "1px solid #E2E6EF" }} />;
}

/* PlaceListItem */
function PlaceListItem({ place, isActive, onSelect }) {
  const [hov, setHov] = useState(false);
  const def = PLACE_ICON_DEFS[place.icon] || PLACE_ICON_DEFS.home;
  return (
    <div
      onClick={() => onSelect(place)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 16px", cursor: "pointer",
        background: isActive ? "#F2F7FF" : hov ? "#F5F7FA" : "#fff",
        borderBottom: "1px solid #F0F2F7",
        transition: "background 0.15s, opacity 0.15s",
        opacity: place.archived ? (hov ? 0.85 : 0.55) : 1,
      }}
    >
      <PlacesAvatar gradient={def.gradient} icon={placeIcon(place.icon)} size={56} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {place.name}
        </div>
        <div style={{ fontSize: 14, color: "#6B7280", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {place.radius} m · {place.address || "—"}
        </div>
      </div>
    </div>
  );
}

function CircleSectionHeader({ name }) {
  return (
    <div style={{
      padding: "10px 16px 4px",
      fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
      color: "#9CA3AF",
    }}>
      {name}
    </div>
  );
}

const PLACE_PRESETS = [
  { name: "School",  icon: "star",     gradient: PLACE_ICON_DEFS.star.gradient },
  { name: "Gym",     icon: "dumbbell", gradient: PLACE_ICON_DEFS.dumbbell.gradient },
];

function PlacePresetItem({ preset }) {
  const [hov, setHov] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 16px",
        background: hov ? "#F5F7FA" : "#fff",
        borderBottom: "1px solid #F0F2F7",
        transition: "background 0.15s",
      }}
    >
      <PlacesAvatar gradient={preset.gradient} icon={placeIcon(preset.icon)} size={56} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 500, color: "#1B1E28" }}>{preset.name}</div>
        <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 2 }}>Add your {preset.name}</div>
      </div>
      <button
        onMouseEnter={() => setBtnHov(true)} onMouseLeave={() => setBtnHov(false)}
        style={{
          width: 36, height: 36, borderRadius: 100, border: "none",
          background: btnHov ? "#2563EB" : "#0F6EFF",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", flexShrink: 0, transition: "background 0.15s",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

/* PlacesListPanel */
function PlacesListPanel({ selected, onSelect, onNewPlace, onVisitHistory, isMobile }) {
  const [hovNew, setHovNew] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [hovArchivedToggle, setHovArchivedToggle] = useState(false);
  const activePlaces   = PLACES.filter(p => !p.archived);
  const archivedPlaces = PLACES.filter(p => p.archived);

  return (
    <div style={{
      width: isMobile ? "100%" : 360, height: "100%", background: "#fff",
      borderRight: isMobile ? "none" : "1px solid #E9E9E9",
      display: "flex", flexDirection: "column", flexShrink: 0,
    }}>
      <div style={{ height: isMobile ? 56 : 64, padding: "0 16px", display: "flex", alignItems: "center", borderBottom: "1px solid #F0F2F7", flexShrink: 0 }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: "#1B1E28" }}>Places</span>
      </div>

      <div style={{ padding: 16, borderBottom: "1px solid #F0F2F7", flexShrink: 0 }}>
        <button
          onClick={onNewPlace}
          onMouseEnter={() => setHovNew(true)}
          onMouseLeave={() => setHovNew(false)}
          style={{
            width: "100%", height: 44, borderRadius: 100,
            background: hovNew ? "#2563EB" : "#0F6EFF",
            border: "none", cursor: "pointer",
            fontSize: 16, fontWeight: 700, color: "#fff",
            fontFamily: '"Google Sans", sans-serif',
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            transition: "background 0.15s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          New place
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {CIRCLES.filter(c => !c.archived).map(circle => {
          const circlePlaces = activePlaces.filter(p => p.circleId === circle.id);
          if (!circlePlaces.length) return null;
          return (
            <React.Fragment key={circle.id}>
              <CircleSectionHeader name={circle.name} />
              {circlePlaces.map(p => (
                <PlaceListItem key={p.id} place={p} isActive={selected?.id === p.id} onSelect={onSelect} />
              ))}
            </React.Fragment>
          );
        })}

        <CircleSectionHeader name="Preset" />
        {PLACE_PRESETS.map(p => <PlacePresetItem key={p.name} preset={p} />)}

        {archivedPlaces.length > 0 && (
          <div
            onClick={() => setShowArchived(v => !v)}
            onMouseEnter={() => setHovArchivedToggle(true)}
            onMouseLeave={() => setHovArchivedToggle(false)}
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid #F0F2F7",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              cursor: "pointer",
              fontSize: 14, fontWeight: 700,
              color: hovArchivedToggle ? "#2563EB" : "#0F6EFF",
              transition: "color 0.15s",
            }}
          >
            {showArchived ? "Hide archived" : "Show archived"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ transform: showArchived ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        {showArchived && CIRCLES.filter(c => !c.archived).map(circle => {
          const circlePlaces = archivedPlaces.filter(p => p.circleId === circle.id);
          if (!circlePlaces.length) return null;
          return (
            <React.Fragment key={circle.id}>
              <CircleSectionHeader name={circle.name} />
              {circlePlaces.map(p => (
                <PlaceListItem key={p.id} place={p} isActive={selected?.id === p.id} onSelect={onSelect} />
              ))}
            </React.Fragment>
          );
        })}

        <div style={{ padding: "16px 16px 4px", display: "flex", gap: 20 }}>
          <FooterLink label="Visit history" onClick={onVisitHistory} />
        </div>
        <div style={{ padding: "10px 16px 16px", display: "flex", alignItems: "flex-start", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="8" cy="8" r="6.5" stroke="#9CA3AF" strokeWidth="1.2" />
            <path d="M8 7v4" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="5.5" r="0.7" fill="#9CA3AF" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 400, color: "#6B7280", lineHeight: "20px" }}>
            Geofences trigger arrival and departure alerts for your circle.
          </span>
        </div>
      </div>
    </div>
  );
}

function FooterLink({ label, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "none", border: "none", padding: 0,
        fontSize: 14, fontWeight: 500,
        color: hov ? "#2563EB" : "#0F6EFF",
        cursor: "pointer", textDecoration: "underline",
        fontFamily: '"Google Sans", sans-serif', transition: "color 0.15s",
      }}
    >{label}</button>
  );
}

/* PlacesEmptyState */
function PlacesEmptyState() {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#F5F7FA", gap: 10, animation: "fadeIn 0.2s ease",
    }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#EBF2FF,#E0F0FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M19.0074 5.02083C17.2556 3.14583 14.6793 2 12 2C9.3207 2 6.74444 3.04167 4.99259 5.02083C3.54989 6.6875 2.82854 8.77083 3.03464 10.8542C3.03464 11.2708 3.13769 11.6875 3.24074 12C4.16819 16.375 8.9085 20.2292 10.9695 21.6875C11.2786 21.8958 11.5878 22 12 22C12.4122 22 12.7214 21.8958 13.0305 21.6875C14.9885 20.2292 19.8318 16.375 20.7593 12C20.8623 11.6875 20.8623 11.2708 20.9654 10.8542C21.1715 8.77083 20.4501 6.6875 19.0074 5.02083ZM12 13.9792C10.4542 13.9792 9.1146 12.7292 9.1146 11.0625C9.1146 9.39583 10.3512 8.14583 12 8.14583C13.6488 8.14583 14.8854 9.39583 14.8854 11.0625C14.8854 12.7292 13.5458 13.9792 12 13.9792Z" fill="#0F6EFF" />
        </svg>
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#1B1E28" }}>Select a place</div>
      <div style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center", maxWidth: 220, lineHeight: "20px" }}>
        Choose a place from the list to view or edit it
      </div>
    </div>
  );
}

function PlaceAlertPreferences({ place }) {
  const members = CIRCLE_MEMBERS[place.circleId] || [];
  const [alerts, setAlerts] = useState(() => {
    const s = {};
    members.forEach(m => {
      s[`${m.name}_enter`] = true;
      s[`${m.name}_exit`]  = true;
    });
    return s;
  });
  const toggle = key => setAlerts(s => ({ ...s, [key]: !s[key] }));

  return (
    <>
      <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 16, lineHeight: "20px" }}>
        Choose which members trigger arrival and departure alerts for this place.
      </div>
      {members.map((m, mi) => (
        <div key={m.name} style={{
          padding: "12px 0",
          borderTop: mi === 0 ? "1px solid #F0F2F7" : "none",
          borderBottom: mi < members.length - 1 ? "1px solid #F0F2F7" : "none",
          display: "flex", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
            <CircleAvatar gradient={m.gradient} initial={m.initial} size={28} />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28" }}>{m.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <DSCheckbox label="Enter" checked={!!alerts[`${m.name}_enter`]} onChange={() => toggle(`${m.name}_enter`)} labelStyle={{ fontSize: 14, color: "#6B7280" }} />
            <DSCheckbox label="Exit"  checked={!!alerts[`${m.name}_exit`]}  onChange={() => toggle(`${m.name}_exit`)}  labelStyle={{ fontSize: 14, color: "#6B7280" }} />
          </div>
        </div>
      ))}
    </>
  );
}

/* PlaceDetailPanel — follows CircleDetail pattern */
function PlaceDetailPanel({ place, onBack, isMobile }) {
  const [name, setName]         = useState(place.name);
  const [iconKey, setIconKey]   = useState(place.icon);
  const [circleId, setCircleId] = useState(place.circleId);
  const [radius, setRadius]     = useState(place.radius);
  const [lat, setLat]           = useState(place.lat);
  const [lng, setLng]           = useState(place.lng);
  const [sensitive, setSensitive] = useState(place.sensitive || false);
  const [confirm, setConfirm]   = useState(null); // "archive" | "delete" | null

  const def = PLACE_ICON_DEFS[iconKey] || PLACE_ICON_DEFS.home;
  const displayCircle = CIRCLES.find(c => c.id === circleId);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F5F7FA", overflow: "hidden" }}>

      <div style={{
        height: isMobile ? 56 : 64, background: "#fff", borderBottom: "1px solid #E9E9E9",
        display: "flex", alignItems: "center", padding: "0 16px", gap: 4, flexShrink: 0,
      }}>
        {isMobile && (
          <button onClick={onBack} style={{ width: 40, height: 40, marginLeft: -8, marginRight: 4, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#1B1E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <span style={{ fontSize: 20, fontWeight: 500, color: "#1B1E28" }}>Place details</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

          <div style={{ padding: "24px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
            <PlacesAvatar gradient={def.gradient} icon={placeIcon(iconKey)} size={72} />
            <div style={{ marginTop: 14, fontSize: 24, fontWeight: 700, color: "#1B1E28" }}>{name}</div>
            <div style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>
              {radius} m radius · {place.address || `${lat.toFixed(4)}, ${lng.toFixed(4)}`}
            </div>
            <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 2 }}>
              Circle: {displayCircle?.name}
            </div>
          </div>

          {place.archived && (
            <div style={{ background: "#FFF8EE", border: "1px solid #FDE68A", borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontSize: 14, color: "#92400E", lineHeight: "20px" }}>
              This place is archived. Unarchive it to re-enable geofence alerts.
            </div>
          )}

          {/* Location card */}
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #F0F2F7", fontSize: 17, fontWeight: 500, color: "#1B1E28", lineHeight: "20px" }}>
              Location
            </div>
            <div style={{ padding: "16px 16px 6px" }}>
              <div style={{ marginBottom: 12 }}>
                <DSInputField placeholder="Search places…" iconSrc="assets/icons/search.svg" />
              </div>
              <PlaceMap key={`detail-${place.id}`} lat={lat} lng={lng} radius={radius} onLocationChange={(la, ln) => { setLat(la); setLng(ln); }} />
              <div style={{ fontSize: 14, color: "#6B7280", marginTop: 8, marginBottom: 16, lineHeight: "20px" }}>
                Search an address, or click the map / drag the pin to position your geofence.
              </div>
            </div>
            <div style={{ padding: "0 16px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28" }}>Radius</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28" }}>{radius} m</span>
              </div>
              <input type="range" min={50} max={1000} value={radius} onChange={e => setRadius(Number(e.target.value))} className="radius-slider" style={{ "--pct": `${((radius - 50) / 950 * 100).toFixed(1)}%` }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 14, color: "#9CA3AF" }}>50 m</span>
                <span style={{ fontSize: 14, color: "#9CA3AF" }}>1000 m</span>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #F0F2F7", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28" }}>Mark as sensitive</div>
                  <div style={{ fontSize: 14, color: "#6B7280", marginTop: 3, lineHeight: "20px" }}>
                    Sensitive Places (clinics, therapy, support groups) stay visible to you but will never contribute to any Circle-shared heatmap.
                  </div>
                </div>
                <div onClick={() => setSensitive(!sensitive)}
                  style={{ width: 44, height: 26, borderRadius: 100, flexShrink: 0, cursor: "pointer",
                    background: sensitive ? "#0F6EFF" : "#E2E6EF", position: "relative", transition: "background 0.2s" }}>
                  <div style={{ position: "absolute", top: 3, left: sensitive ? 21 : 3,
                    width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Alert preferences card */}
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #F0F2F7", fontSize: 17, fontWeight: 500, color: "#1B1E28", lineHeight: "20px" }}>
              Alert preferences
            </div>
            <div style={{ padding: 16 }}>
              <PlaceAlertPreferences place={place} />
            </div>
            <div style={{ borderTop: "1px solid #F0F2F7", padding: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28", marginBottom: 6 }}>Quiet hours</div>
              <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px" }}>
                Quiet hours apply to all push notifications including arrivals, departures, and messages.{" "}
                Configure them in{" "}
                <span
                  onMouseEnter={e => e.target.style.color = "#0D60E0"}
                  onMouseLeave={e => e.target.style.color = "#0F6EFF"}
                  style={{ color: "#0F6EFF", cursor: "pointer", textDecoration: "underline" }}>Notification settings</span>.
              </div>
            </div>
          </div>

          {/* Place settings card */}
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #F0F2F7", fontSize: 17, fontWeight: 500, color: "#1B1E28", lineHeight: "20px" }}>
              Place settings
            </div>
            <div style={{ padding: 20 }}>
              <FormSection label="Name">
                <FocusInput value={name} onChange={e => setName(e.target.value)} placeholder="Place name" />
              </FormSection>
              <FormSection label="Icon">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {PLACE_ICON_KEYS.map(key => {
                    const sel = iconKey === key;
                    const [hovIcon, setHovIcon] = useState(false);
                    return (
                      <div key={key} onClick={() => setIconKey(key)}
                        onMouseEnter={() => setHovIcon(true)} onMouseLeave={() => setHovIcon(false)}
                        style={{
                          width: 52, height: 52, borderRadius: 100, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          border: sel ? "1px solid #0F6EFF" : "1px solid transparent",
                          boxSizing: "border-box", transition: "border-color 0.15s, background 0.15s",
                          background: sel ? "#fff" : hovIcon ? "#E8F1FF" : "#F5F7FA",
                        }}>
                        <PlacesAvatar gradient={PLACE_ICON_DEFS[key].gradient} icon={placeIcon(key)} size={40} />
                      </div>
                    );
                  })}
                </div>
              </FormSection>
            </div>
          </div>

          {/* Bottom action bar */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
            <ActionBtn primary onClick={() => {}}>Save changes</ActionBtn>
            <div style={{ display: "flex", gap: 10 }}>
              <ActionBtn outline onClick={() => setConfirm("archive")}>{place.archived ? "Unarchive" : "Archive"}</ActionBtn>
              <ActionBtn danger onClick={() => setConfirm("delete")}>Delete</ActionBtn>
            </div>
          </div>

        </div>
      </div>

      {confirm === "archive" && (
        <ConfirmModal
          title={place.archived ? "Unarchive place?" : "Archive place?"}
          highlightName={place.name}
          confirmLabel={place.archived ? "Unarchive" : "Archive"}
          tone="primary"
          description={place.archived
            ? "The place will be restored to your active list and resume geofence alerts."
            : "The place will be hidden from your active list. Geofence alerts will pause until you restore it."}
          onClose={() => setConfirm(null)}
        />
      )}
      {confirm === "delete" && (
        <ConfirmModal
          title="Delete place?"
          highlightName={place.name}
          confirmLabel="Delete"
          tone="danger"
          description="This action cannot be undone. The geofence and visit history for this place will be permanently removed."
          onClose={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

/* NewPlacePanel */
function NewPlacePanel({ onBack, isMobile }) {
  const [name, setName]         = useState("");
  const [iconKey, setIconKey]   = useState("home");
  const [circleId, setCircleId] = useState(CIRCLES[0].id);
  const [radius, setRadius]     = useState(150);
  const [lat, setLat]           = useState(34.0522);
  const [lng, setLng]           = useState(-118.2437);

  const def = PLACE_ICON_DEFS[iconKey] || PLACE_ICON_DEFS.home;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F5F7FA", overflow: "hidden" }}>
      <div style={{ height: isMobile ? 56 : 64, background: "#fff", borderBottom: "1px solid #E9E9E9", display: "flex", alignItems: "center", padding: "0 16px", gap: 4, flexShrink: 0 }}>
        {isMobile && (
          <button onClick={onBack} style={{ width: 40, height: 40, marginLeft: -8, marginRight: 4, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#1B1E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <span style={{ fontSize: 20, fontWeight: 500, color: "#1B1E28" }}>New place</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

          <div style={{ padding: "24px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#EBF2FF,#E0F0FF)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M19.0074 5.02083C17.2556 3.14583 14.6793 2 12 2C9.3207 2 6.74444 3.04167 4.99259 5.02083C3.54989 6.6875 2.82854 8.77083 3.03464 10.8542C3.03464 11.2708 3.13769 11.6875 3.24074 12C4.16819 16.375 8.9085 20.2292 10.9695 21.6875C11.2786 21.8958 11.5878 22 12 22C12.4122 22 12.7214 21.8958 13.0305 21.6875C14.9885 20.2292 19.8318 16.375 20.7593 12C20.8623 11.6875 20.8623 11.2708 20.9654 10.8542C21.1715 8.77083 20.4501 6.6875 19.0074 5.02083ZM12 13.9792C10.4542 13.9792 9.1146 12.7292 9.1146 11.0625C9.1146 9.39583 10.3512 8.14583 12 8.14583C13.6488 8.14583 14.8854 9.39583 14.8854 11.0625C14.8854 12.7292 13.5458 13.9792 12 13.9792Z" fill="#0F6EFF" />
              </svg>
            </div>
            <div style={{ marginTop: 10, fontSize: 14, color: "#6B7280", lineHeight: "20px", textAlign: "center" }}>
              Drop a pin, pick an icon, and choose how large the geofence should be.
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 20px 24px", marginBottom: 16 }}>
            <FormSection label="Name">
              <FocusInput value={name} onChange={e => setName(e.target.value)} placeholder="Home, School, Work…" />
            </FormSection>
            <FormSection label="Icon">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {PLACE_ICON_KEYS.map(key => {
                  const sel = iconKey === key;
                  const [hovIcon, setHovIcon] = useState(false);
                  return (
                    <div key={key} onClick={() => setIconKey(key)}
                      onMouseEnter={() => setHovIcon(true)} onMouseLeave={() => setHovIcon(false)}
                      style={{
                        width: 52, height: 52, borderRadius: 100, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: sel ? "1px solid #0F6EFF" : "1px solid transparent",
                        boxSizing: "border-box", transition: "border-color 0.15s, background 0.15s",
                        background: sel ? "#fff" : hovIcon ? "#E8F1FF" : "#F5F7FA",
                      }}>
                      <PlacesAvatar gradient={PLACE_ICON_DEFS[key].gradient} icon={placeIcon(key)} size={40} />
                    </div>
                  );
                })}
              </div>
            </FormSection>
            <FormSection label="Circle">
              <CircleSelect value={circleId} onChange={setCircleId} />
            </FormSection>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 16 }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #F0F2F7", fontSize: 17, fontWeight: 500, color: "#1B1E28", borderRadius: "16px 16px 0 0" }}>Location</div>
            <div style={{ padding: "16px 16px 6px" }}>
              <div style={{ marginBottom: 12 }}>
                <DSInputField placeholder="Search places…" iconSrc="assets/icons/search.svg" />
              </div>
              <PlaceMap key="new-map" lat={lat} lng={lng} radius={radius} onLocationChange={(la, ln) => { setLat(la); setLng(ln); }} />
              <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 8, marginBottom: 16, lineHeight: "20px" }}>
                Search an address, or click the map / drag the pin to position your geofence.
              </div>
            </div>
            <div style={{ padding: "0 16px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28" }}>Radius</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28" }}>{radius} m</span>
              </div>
              <input type="range" min={50} max={1000} value={radius} onChange={e => setRadius(Number(e.target.value))} className="radius-slider" style={{ "--pct": `${((radius - 50) / 950 * 100).toFixed(1)}%` }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 14, color: "#9CA3AF" }}>50 m</span>
                <span style={{ fontSize: 14, color: "#9CA3AF" }}>1000 m</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <ActionBtn primary onClick={() => {}}>Create place</ActionBtn>
            <div style={{ flex: 1 }} />
            <CancelBtn onClick={onBack} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Shared helpers */
function FormSection({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <div style={{ fontSize: 14, fontWeight: 700, color: "#1B1E28", marginBottom: 8 }}>{label}</div>}
      {children}
    </div>
  );
}

function FocusInput({ value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const active = focused || hovered;
  return (
    <input
      value={value} onChange={onChange} placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: "100%", height: 44, borderRadius: 12, border: `1px solid ${active ? "#0F6EFF" : "#E2E6EF"}`, padding: "0 12px", fontSize: 14, color: "#1B1E28", fontFamily: '"Google Sans", sans-serif', outline: "none", background: "#fff", transition: "border-color 0.15s" }}
    />
  );
}

function CircleSelect({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const active = focused || hovered;
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value} onChange={e => onChange(Number(e.target.value))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ width: "100%", height: 44, borderRadius: 12, border: `1px solid ${active ? "#0F6EFF" : "#E2E6EF"}`, padding: "0 36px 0 12px", fontSize: 14, color: "#1B1E28", fontFamily: '"Google Sans", sans-serif', outline: "none", background: "#fff", appearance: "none", cursor: "pointer", transition: "border-color 0.15s" }}
      >
        {CIRCLES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function CancelBtn({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 44, borderRadius: 100, padding: "0 24px", background: hov ? "#F5F7FA" : "#fff", border: "1px solid #E2E6EF", fontSize: 16, fontWeight: 700, color: "#1B1E28", cursor: "pointer", fontFamily: '"Google Sans", sans-serif', transition: "background 0.15s", flexShrink: 0 }}
    >Cancel</button>
  );
}

function ActionBtn({ primary, outline, danger, children, onClick }) {
  const [hov, setHov] = useState(false);
  let bg, border, color;
  if (primary)     { bg = hov ? "#2563EB" : "#0F6EFF"; border = "none"; color = "#fff"; }
  else if (danger) { bg = hov ? "#E0322A" : "#FF3B30"; border = "none"; color = "#fff"; }
  else             { bg = hov ? "#F0F2F7" : "#fff"; border = "1px solid #E2E6EF"; color = "#1B1E28"; }
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 44, borderRadius: 100, padding: "0 24px", background: bg, border, color, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: '"Google Sans", sans-serif', transition: "background 0.15s" }}
    >{children}</button>
  );
}

/* VisitHistoryPanel */
const VISIT_HISTORY = [
  { id:1, type:"enter", placeName:"Home",   placeIcon:"home",      memberName:"Sasha", memberGrad:"linear-gradient(135deg,#0F6EFF,#00C7BE)", time:"Today · 22:23" },
  { id:2, type:"exit",  placeName:"Office", placeIcon:"briefcase", memberName:"Dad",   memberGrad:"linear-gradient(135deg,#2DD16A,#1EDEC2)", time:"Today · 18:45" },
  { id:3, type:"enter", placeName:"Cafe",   placeIcon:"coffee",    memberName:"Mom",   memberGrad:"linear-gradient(135deg,#9B87F5,#7EC8E3)", time:"Today · 14:12" },
  { id:4, type:"exit",  placeName:"Home",   placeIcon:"home",      memberName:"Sasha", memberGrad:"linear-gradient(135deg,#0F6EFF,#00C7BE)", time:"Yesterday · 09:30" },
  { id:5, type:"enter", placeName:"Cill",   placeIcon:"heart",     memberName:"Ben",   memberGrad:"linear-gradient(135deg,#F857A6,#FF5858)", time:"Yesterday · 08:15" },
  { id:6, type:"exit",  placeName:"Cafe",   placeIcon:"coffee",    memberName:"Tanya", memberGrad:"linear-gradient(135deg,#F0922A,#EFC03A)", time:"2 days ago · 16:00" },
];

function VisitHistoryPanel({ onBack, isMobile }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F5F7FA", overflow: "hidden" }}>
      <div style={{ height: isMobile ? 56 : 64, background: "#fff", borderBottom: "1px solid #E9E9E9", display: "flex", alignItems: "center", padding: "0 16px", gap: 4, flexShrink: 0 }}>
        {isMobile && (
          <button onClick={onBack} style={{ width: 40, height: 40, marginLeft: -8, marginRight: 4, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1B1E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        <span style={{ fontSize: 20, fontWeight: 500, color: "#1B1E28" }}>Visit history</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 20 }}>Recent arrivals and departures from your places.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {VISIT_HISTORY.map(v => {
              const def = PLACE_ICON_DEFS[v.placeIcon] || PLACE_ICON_DEFS.home;
              return (
                <div key={v.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <PlacesAvatar gradient={def.gradient} icon={placeIcon(v.placeIcon)} size={40} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#1B1E28" }}>
                      {v.type === "enter" ? "Arrived at" : "Left"} {v.placeName}
                    </div>
                    <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                      <CircleAvatar gradient={v.memberGrad} size={24} initial={v.memberName[0]} />
                      <span style={{ color: "#6B7280", fontWeight: 500 }}>{v.memberName}</span>
                      <span>·</span>
                      {v.time}
                    </div>
                  </div>
                  <div style={{
                    height: 24, borderRadius: 100, padding: "0 10px",
                    background: v.type === "enter" ? "#EDFAF2" : "#FFF3F0",
                    color: v.type === "enter" ? "#1A9E4A" : "#D94033",
                    fontSize: 12, fontWeight: 600,
                    display: "flex", alignItems: "center",
                  }}>
                    {v.type === "enter" ? "Enter" : "Exit"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* AlertPreferencesPanel */
function AlertPreferencesPanel({ onBack, isMobile }) {
  const activePlaces = PLACES.filter(p => !p.archived);
  const initState = () => {
    const s = {};
    activePlaces.forEach(place => {
      (CIRCLE_MEMBERS[place.circleId] || []).forEach(m => {
        s[`${place.id}_${m.name}_enter`] = true;
        s[`${place.id}_${m.name}_exit`]  = true;
      });
    });
    return s;
  };
  const [alerts, setAlerts] = useState(initState);
  const toggle = (key) => setAlerts(s => ({ ...s, [key]: !s[key] }));

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F5F7FA", overflow: "hidden" }}>
      <div style={{ height: isMobile ? 56 : 64, background: "#fff", borderBottom: "1px solid #E9E9E9", display: "flex", alignItems: "center", padding: "0 16px", gap: 4, flexShrink: 0 }}>
        {isMobile && (
          <button onClick={onBack} style={{ width: 40, height: 40, marginLeft: -8, marginRight: 4, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1B1E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        <span style={{ fontSize: 18, fontWeight: 700, color: "#1B1E28" }}>Alert preferences</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 20, lineHeight: "20px" }}>
            Choose which members trigger arrival and departure alerts for this place.
          </div>

          {/* Quiet hours */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "16px", marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28", marginBottom: 8 }}>Quiet hours</div>
            <div style={{ fontSize: 14, color: "#9CA3AF", lineHeight: "20px" }}>
              Quiet hours apply to all push notifications including arrivals, departures, and messages. Configure them in{" "}
              <span style={{ color: "#0F6EFF", cursor: "pointer", textDecoration: "underline" }}>Notification settings</span>.
            </div>
          </div>

          {/* Per-place */}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.06em", marginBottom: 12 }}>PER-PLACE, PER-MEMBER</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {activePlaces.map(place => {
              const def = PLACE_ICON_DEFS[place.icon] || PLACE_ICON_DEFS.home;
              const members = CIRCLE_MEMBERS[place.circleId] || [];
              return (
                <div key={place.id} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #F0F2F7", display: "flex", alignItems: "center", gap: 10 }}>
                    <PlacesAvatar gradient={def.gradient} icon={placeIcon(place.icon)} size={32} />
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#1B1E28" }}>{place.name}</span>
                  </div>
                  {members.map((m, mi) => (
                    <div key={m.name} style={{ padding: "12px 16px", borderBottom: mi < members.length - 1 ? "1px solid #F0F2F7" : "none", display: "flex", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                        <CircleAvatar gradient={m.gradient} initial={m.initial} size={28} />
                        <span style={{ fontSize: 14, color: "#1B1E28" }}>{m.name}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <DSCheckbox
                          label="Enter"
                          checked={!!alerts[`${place.id}_${m.name}_enter`]}
                          onChange={() => toggle(`${place.id}_${m.name}_enter`)}
                        />
                        <DSCheckbox
                          label="Exit"
                          checked={!!alerts[`${place.id}_${m.name}_exit`]}
                          onChange={() => toggle(`${place.id}_${m.name}_exit`)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 20 }}>
            <ActionBtn primary onClick={() => {}}>Save preferences</ActionBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* PlacesScreen */
function PlacesScreen({ isMobile }) {
  const [selected, setSelected] = useState(null);
  const [mode, setMode]         = useState("empty");
  const [view, setView]         = useState("list");

  const handleNewPlace     = () => { setSelected(null); setMode("new");     if (isMobile) setView("detail"); };
  const handleSelect       = (place) => { setSelected(place); setMode("edit"); if (isMobile) setView("detail"); };
  const handleBack         = () => { setMode("empty"); setSelected(null); setView("list"); };
  const handleVisitHistory = () => { setSelected(null); setMode("history"); if (isMobile) setView("detail"); };
  const handleAlertPrefs   = () => { setSelected(null); setMode("alerts");  if (isMobile) setView("detail"); };

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {(!isMobile || view === "list") && (
        <PlacesListPanel selected={selected} onSelect={handleSelect} onNewPlace={handleNewPlace} onVisitHistory={handleVisitHistory} isMobile={isMobile} />
      )}
      {(!isMobile || view === "detail") && (
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {mode === "new"     && <NewPlacePanel key="new" onBack={handleBack} isMobile={isMobile} />}
          {mode === "edit"    && selected && <PlaceDetailPanel key={`detail-${selected.id}`} place={selected} onBack={handleBack} isMobile={isMobile} />}
          {mode === "history" && <VisitHistoryPanel onBack={handleBack} isMobile={isMobile} />}
          {mode === "alerts"  && <AlertPreferencesPanel onBack={handleBack} isMobile={isMobile} />}
          {mode === "empty"   && <PlacesEmptyState />}
        </div>
      )}
    </div>
  );
}
