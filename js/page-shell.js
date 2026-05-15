const TAB_BAR_H = 56;

const TOAST_COLORS = {
  success: "#34C55A",
  warning: "#FF9500",
  error:   "#FF3B30",
};

function ToastItem({ toast, onDismiss }) {
  const bg = TOAST_COLORS[toast.type] || TOAST_COLORS.success;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      background: bg, color: "#fff",
      borderRadius: 14, padding: "12px 16px",
      width: "min(360px, calc(100vw - 32px))",
      boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
      fontSize: 15, fontWeight: 500,
      fontFamily: '"Google Sans", sans-serif',
      animation: toast.exiting
        ? "toastOut 0.28s ease forwards"
        : "toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      pointerEvents: "auto",
    }}>
      <span style={{ flex: 1, lineHeight: "20px" }}>{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} style={{
        background: "rgba(255,255,255,0.25)", border: "none",
        borderRadius: "50%", width: 24, height: 24, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "#fff", fontSize: 13,
        fontFamily: '"Google Sans", sans-serif',
      }}>✕</button>
    </div>
  );
}

function ToastContainer({ toasts, isMobile, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div style={{
      position: "fixed",
      bottom: isMobile ? TAB_BAR_H + 16 : 24,
      left: "50%", transform: "translateX(-50%)",
      zIndex: 2000,
      display: "flex", flexDirection: "column", gap: 8,
      alignItems: "center",
      pointerEvents: "none",
    }}>
      {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />)}
    </div>
  );
}

function PageShell({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hideTabBar, setHideTabBar] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toastIdRef = React.useRef(0);

  const dismissToast = React.useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
  }, []);

  useEffect(() => {
    window.showToast = (message, type = "success") => {
      const id = ++toastIdRef.current;
      setToasts(prev => [...prev, { id, message, type, exiting: false }]);
      setTimeout(() => dismissToast(id), 3500);
    };
    return () => { delete window.showToast; };
  }, [dismissToast]);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {!isMobile && <SidebarNav />}
        {typeof children === "function" ? children(isMobile, setHideTabBar) : children}
      </div>
      {isMobile && !hideTabBar && <BottomTabBar />}
      <ToastContainer toasts={toasts} isMobile={isMobile} onDismiss={dismissToast} />
    </div>
  );
}
