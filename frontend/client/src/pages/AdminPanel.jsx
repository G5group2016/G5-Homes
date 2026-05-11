import React, { useState, useEffect, useCallback } from "react";

// ── CONFIG ────────────────────────────────────────────────────────
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ── DESIGN TOKENS ─────────────────────────────────────────────────
const C = {
  navy: "#0A1535",
  navyMid: "#0E1B4D",
  navyLight: "#1B2F6E",
  red: "#C0292A",
  redDark: "#A01F20",
  gold: "#C9A84C",
  goldLight: "#E2C97E",
  white: "#FFFFFF",
  offWhite: "#F8F6F1",
  lightGray: "#EEF0F5",
  midGray: "#8A93A8",
  green: "#16A34A",
  greenLight: "#DCFCE7",
  amber: "#D97706",
  amberLight: "#FEF3C7",
  blueLight: "#EFF6FF",
  blue: "#2563EB",
  darkText: "#0A1130",
};

// ── STATUS CONFIG ─────────────────────────────────────────────────
const STATUS_CONFIG = {
  new: { label: "New", color: C.blue, bg: C.blueLight, dot: "#2563EB" },
  contacted: { label: "Contacted", color: C.amber, bg: C.amberLight, dot: "#D97706" },
  resolved: { label: "Resolved", color: C.green, bg: C.greenLight, dot: "#16A34A" },
};

const SERVICE_LABELS = {
  "custom-home": "Custom Home",
  "luxury-villa": "Luxury Villa",
  interior: "Interior Design",
  "cost-estimate": "Cost Estimate",
  turnkey: "Turnkey",
  "smart-home": "Smart Home",
  renovation: "Renovation",
  "": "—",
};

// ── HELPERS ───────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── STAT CARD ─────────────────────────────────────────────────────
function StatCard({ label, value, icon, accent }) {
  return (
    <div style={{
      background: C.white,
      borderRadius: 16,
      padding: "24px 22px",
      border: `1px solid rgba(14,27,77,0.08)`,
      boxShadow: "0 4px 20px rgba(10,21,53,0.05)",
      display: "flex",
      alignItems: "center",
      gap: 16,
      transition: "box-shadow 0.3s ease",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(10,21,53,0.1)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(10,21,53,0.05)"}
    >
      <div style={{
        width: 50, height: 50, borderRadius: 14,
        background: accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.5rem", flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 700, color: C.navy, lineHeight: 1, fontFamily: "'Georgia', serif" }}>{value}</div>
        <div style={{ fontSize: 11, color: C.midGray, marginTop: 4, letterSpacing: 1, textTransform: "uppercase", fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

// ── STATUS BADGE ──────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 20,
      background: cfg.bg, color: cfg.color,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
      {cfg.label}
    </span>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function AdminPanel() {
  // Auth state
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("g5_admin_token"));
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // Data state
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, resolved: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filter / search / pagination
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Modal
  const [selected, setSelected] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const token = sessionStorage.getItem("g5_admin_token") || "";

  // ── Login ────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      // Verify credentials by hitting a protected endpoint
      const res = await fetch(`${API_BASE}/api/contact/admin/stats`, {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error("Wrong password. Please try again.");
      sessionStorage.setItem("g5_admin_token", password);
      setAuthed(true);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("g5_admin_token");
    setAuthed(false);
    setPassword("");
  };

  // ── Fetch data ───────────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/contact/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setStats(await res.json());
    } catch (_) {}
  }, [token]);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page, limit: 10 });
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`${API_BASE}/api/contact/admin?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load inquiries.");
      const data = await res.json();
      setInquiries(data.inquiries);
      setTotalPages(data.pages);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, page, statusFilter, search]);

  useEffect(() => {
    if (authed) { fetchStats(); fetchInquiries(); }
  }, [authed, fetchStats, fetchInquiries]);

  // ── Update status ────────────────────────────────────────────────
  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_BASE}/api/contact/admin/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setInquiries(prev => prev.map(q => q._id === id ? { ...q, status } : q));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
      fetchStats();
    } catch (_) {
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────
  const deleteInquiry = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE}/api/contact/admin/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setInquiries(prev => prev.filter(q => q._id !== id));
      if (selected?._id === id) setSelected(null);
      setConfirmDelete(null);
      fetchStats();
    } catch (_) {
      alert("Failed to delete inquiry.");
    } finally {
      setDeletingId(null);
    }
  };

  // ── SEARCH submit ────────────────────────────────────────────────
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  // ─────────────────────────────────────────────────────────────────
  // ── LOGIN PAGE ───────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 60%, #0D1A3A 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}>
        <style>{`
          *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
          @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
          .login-card { animation: fadeUp 0.6s cubic-bezier(0.22,0.85,0.36,1) both; }
          .login-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(192,41,42,0.4) !important; }
          .login-btn:active { transform: translateY(0); }
          .pwd-input:focus { border-color: ${C.red} !important; box-shadow: 0 0 0 3px rgba(192,41,42,0.12) !important; }
        `}</style>

        {/* Background grid */}
        <div style={{ position: "fixed", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: "48px 48px", pointerEvents: "none" }} />

        <div className="login-card" style={{
          width: "100%", maxWidth: 420,
          background: C.white, borderRadius: 24,
          boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
          overflow: "hidden", position: "relative", zIndex: 2,
        }}>
          {/* Top bar */}
          <div style={{ height: 4, background: `linear-gradient(90deg,${C.red},${C.gold},${C.red})` }} />

          <div style={{ padding: "44px 40px 40px" }}>
            {/* Logo */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: `linear-gradient(135deg,${C.navy},${C.navyLight})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px", boxShadow: "0 8px 24px rgba(10,21,53,0.2)",
              }}>
                <span style={{ fontSize: "1.8rem" }}>🏠</span>
              </div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: C.navy, fontFamily: "'Georgia',serif" }}>G5 Homes</h1>
              <p style={{ fontSize: 12, color: C.midGray, marginTop: 4, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>Admin Dashboard</p>
            </div>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#4A5270", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Admin Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="pwd-input"
                    type={showPwd ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setLoginError(""); }}
                    required
                    autoFocus
                    style={{
                      width: "100%", padding: "14px 48px 14px 16px",
                      borderRadius: 12, border: `1.5px solid rgba(14,27,77,0.15)`,
                      fontSize: 14, color: C.darkText,
                      background: C.offWhite, outline: "none",
                      transition: "all 0.3s ease",
                    }}
                  />
                  <button type="button" onClick={() => setShowPwd(p => !p)}
                    style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: C.midGray }}>
                    {showPwd ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {loginError && (
                <div style={{ padding: "10px 14px", background: "#FEF2F2", border: `1px solid rgba(192,41,42,0.2)`, borderRadius: 10, fontSize: 12.5, color: C.red, display: "flex", gap: 8, alignItems: "center" }}>
                  ⚠️ {loginError}
                </div>
              )}

              <button
                className="login-btn"
                type="submit"
                disabled={loginLoading}
                style={{
                  padding: "15px", background: `linear-gradient(135deg,${C.red},${C.redDark})`,
                  color: C.white, border: "none", borderRadius: 40,
                  fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase",
                  cursor: loginLoading ? "not-allowed" : "pointer",
                  transition: "all 0.35s ease",
                  boxShadow: `0 8px 20px rgba(192,41,42,0.3)`,
                  marginTop: 4, opacity: loginLoading ? 0.7 : 1,
                }}
              >
                {loginLoading ? "Verifying..." : "Access Dashboard →"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: C.midGray }}>
              🔒 Restricted access — G5 Homes staff only
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // ── ADMIN DASHBOARD ──────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.darkText }}>
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .dashboard-content { animation: fadeIn 0.4s ease; }
        .inquiry-row { transition: background 0.2s ease; }
        .inquiry-row:hover { background: ${C.offWhite} !important; }
        .filter-btn { transition: all 0.25s ease; }
        .filter-btn:hover { opacity: 0.85; }
        .action-btn { transition: all 0.25s ease; border: none; cursor: pointer; }
        .action-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .modal-overlay { animation: fadeIn 0.2s ease; }
        .modal-box { animation: slideUp 0.3s cubic-bezier(0.22,0.85,0.36,1); }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: ${C.lightGray}; }
        ::-webkit-scrollbar-thumb { background: ${C.midGray}; border-radius: 2px; }
        @media (max-width:768px) {
          .dash-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .table-wrap { overflow-x: auto; }
          .hide-mobile { display: none !important; }
          .dash-pad { padding: 16px !important; }
        }
        @media (max-width:480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .filter-row { flex-wrap: wrap !important; }
          .search-form { width: 100% !important; }
          .search-form input { width: 100% !important; }
        }
      `}</style>

      {/* ── TOPBAR ── */}
      <header style={{
        background: C.navy, padding: "0 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 16px rgba(0,0,0,0.2)", position: "sticky", top: 0, zIndex: 100,
        height: 64,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${C.red},${C.redDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🏠</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.white, fontFamily: "'Georgia',serif", lineHeight: 1.2 }}>G5 Homes</div>
            <div style={{ fontSize: 10, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>Admin Panel</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
            <span className="hide-mobile">Live</span>
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 18px", background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20,
              color: C.white, cursor: "pointer", fontSize: 12, fontWeight: 500,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            🚪 Logout
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="dash-pad dashboard-content" style={{ padding: "28px 28px 60px", maxWidth: 1280, margin: "0 auto" }}>

        {/* Title row */}
        <div className="dash-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 700, color: C.navy, fontFamily: "'Georgia',serif" }}>
              Customer Inquiries
            </h1>
            <p style={{ fontSize: 13, color: C.midGray, marginTop: 4 }}>
              {total} total inquiry{total !== 1 ? "s" : ""} received
            </p>
          </div>
          <button onClick={() => { fetchInquiries(); fetchStats(); }}
            style={{ padding: "10px 20px", background: C.white, border: `1px solid rgba(14,27,77,0.12)`, borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.navy, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.offWhite; e.currentTarget.style.boxShadow = "0 4px 12px rgba(10,21,53,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.boxShadow = "none"; }}>
            🔄 Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
          <StatCard label="Total Inquiries" value={stats.total} icon="📋" accent={`rgba(10,21,53,0.07)`} />
          <StatCard label="New" value={stats.new} icon="🆕" accent={`rgba(37,99,235,0.1)`} />
          <StatCard label="Contacted" value={stats.contacted} icon="📞" accent={`rgba(217,119,6,0.1)`} />
          <StatCard label="Resolved" value={stats.resolved} icon="✅" accent={`rgba(22,163,74,0.1)`} />
        </div>

        {/* Filters */}
        <div style={{ background: C.white, borderRadius: 16, padding: "16px 20px", marginBottom: 20, border: `1px solid rgba(14,27,77,0.08)`, boxShadow: "0 2px 12px rgba(10,21,53,0.04)" }}>
          <div className="filter-row" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            {/* Status filters */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["all", "new", "contacted", "resolved"].map(s => (
                <button key={s} className="filter-btn"
                  onClick={() => { setStatusFilter(s); setPage(1); }}
                  style={{
                    padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer",
                    fontSize: 12, fontWeight: 600, textTransform: "capitalize",
                    background: statusFilter === s ? C.navy : C.lightGray,
                    color: statusFilter === s ? C.white : "#4A5270",
                    letterSpacing: 0.3,
                  }}>
                  {s === "all" ? "All" : STATUS_CONFIG[s]?.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <form className="search-form" onSubmit={handleSearch}
              style={{ display: "flex", gap: 8, marginLeft: "auto", alignItems: "center" }}>
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search name, email, phone..."
                style={{
                  padding: "8px 16px", borderRadius: 10,
                  border: `1.5px solid rgba(14,27,77,0.12)`, fontSize: 13,
                  background: C.offWhite, outline: "none", width: 230,
                  color: C.darkText, transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = C.red}
                onBlur={e => e.target.style.borderColor = "rgba(14,27,77,0.12)"}
              />
              <button type="submit"
                style={{ padding: "8px 16px", background: C.red, color: C.white, border: "none", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 0.5 }}>
                Search
              </button>
              {search && (
                <button type="button"
                  onClick={() => { setSearch(""); setSearchInput(""); setPage(1); }}
                  style={{ padding: "8px 12px", background: C.lightGray, border: "none", borderRadius: 10, fontSize: 12, cursor: "pointer", color: "#4A5270" }}>
                  ✕ Clear
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: C.white, borderRadius: 16, border: `1px solid rgba(14,27,77,0.08)`, boxShadow: "0 2px 16px rgba(10,21,53,0.04)", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "60px 0", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
              <p style={{ color: C.midGray, fontSize: 14 }}>Loading inquiries...</p>
            </div>
          ) : error ? (
            <div style={{ padding: "60px 0", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
              <p style={{ color: C.red, fontSize: 14 }}>{error}</p>
              <button onClick={fetchInquiries}
                style={{ marginTop: 16, padding: "8px 20px", background: C.red, color: C.white, border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
                Retry
              </button>
            </div>
          ) : inquiries.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <p style={{ color: C.midGray, fontSize: 14 }}>No inquiries found.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                <thead>
                  <tr style={{ background: C.offWhite, borderBottom: `1px solid rgba(14,27,77,0.08)` }}>
                    {["#", "Name", "Contact", "Service", "Status", "Date", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.midGray, letterSpacing: 1.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq, idx) => (
                    <tr key={inq._id} className="inquiry-row"
                      style={{ borderBottom: `1px solid rgba(14,27,77,0.05)`, background: C.white, cursor: "pointer" }}
                      onClick={() => setSelected(inq)}>
                      <td style={{ padding: "14px 16px", fontSize: 12, color: C.midGray, fontWeight: 600 }}>
                        {(page - 1) * 10 + idx + 1}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{inq.name}</div>
                        <div style={{ fontSize: 11, color: C.midGray, marginTop: 2 }}>{inq.email}</div>
                      </td>
                      <td className="hide-mobile" style={{ padding: "14px 16px", fontSize: 13, color: "#4A5270" }}>{inq.phone || "—"}</td>
                      <td className="hide-mobile" style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: 12, color: "#4A5270", background: C.lightGray, padding: "3px 10px", borderRadius: 20 }}>
                          {SERVICE_LABELS[inq.service] || inq.service || "—"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}><StatusBadge status={inq.status} /></td>
                      <td className="hide-mobile" style={{ padding: "14px 16px", fontSize: 12, color: C.midGray, whiteSpace: "nowrap" }}>
                        {formatDate(inq.createdAt)}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }} onClick={e => e.stopPropagation()}>
                          <button className="action-btn"
                            title="View details" onClick={() => setSelected(inq)}
                            style={{ padding: "6px 10px", background: C.blueLight, borderRadius: 8, fontSize: 13, color: C.blue }}>👁</button>
                          <button className="action-btn"
                            title="Delete" onClick={() => setConfirmDelete(inq)}
                            style={{ padding: "6px 10px", background: "#FEF2F2", borderRadius: 8, fontSize: 13, color: C.red }}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid rgba(14,27,77,0.06)`, flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: 12, color: C.midGray }}>
                Page {page} of {totalPages}
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <button disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  style={{ padding: "7px 16px", borderRadius: 10, border: `1px solid rgba(14,27,77,0.12)`, fontSize: 12, background: page === 1 ? C.lightGray : C.white, color: page === 1 ? C.midGray : C.navy, cursor: page === 1 ? "default" : "pointer", fontWeight: 600 }}>
                  ← Prev
                </button>
                <button disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  style={{ padding: "7px 16px", borderRadius: 10, border: `1px solid rgba(14,27,77,0.12)`, fontSize: 12, background: page === totalPages ? C.lightGray : C.white, color: page === totalPages ? C.midGray : C.navy, cursor: page === totalPages ? "default" : "pointer", fontWeight: 600 }}>
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── DETAIL MODAL ── */}
      {selected && (
        <div className="modal-overlay"
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(10,21,53,0.55)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="modal-box"
            onClick={e => e.stopPropagation()}
            style={{ background: C.white, borderRadius: 24, width: "100%", maxWidth: 520, boxShadow: "0 32px 80px rgba(0,0,0,0.25)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>

            {/* Modal top bar */}
            <div style={{ height: 4, background: `linear-gradient(90deg,${C.red},${C.gold})` }} />

            {/* Modal header */}
            <div style={{ padding: "24px 28px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid rgba(14,27,77,0.08)` }}>
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: C.navy, fontFamily: "'Georgia',serif" }}>Inquiry Details</h2>
                <p style={{ fontSize: 11, color: C.midGray, marginTop: 3 }}>#{selected._id?.slice(-8).toUpperCase()}</p>
              </div>
              <button onClick={() => setSelected(null)}
                style={{ background: C.lightGray, border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✕
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
              {/* Info rows */}
              {[
                { icon: "👤", label: "Full Name", value: selected.name },
                { icon: "✉️", label: "Email", value: selected.email },
                { icon: "📞", label: "Phone", value: selected.phone || "—" },
                { icon: "🏗️", label: "Service", value: SERVICE_LABELS[selected.service] || selected.service || "—" },
                { icon: "📅", label: "Submitted", value: formatDate(selected.createdAt) },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < 4 ? `1px solid rgba(14,27,77,0.06)` : "none", alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, background: C.offWhite, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{row.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: 1, color: C.midGray, textTransform: "uppercase", fontWeight: 600, marginBottom: 3 }}>{row.label}</div>
                    <div style={{ fontSize: 14, color: C.darkText, fontWeight: 500 }}>{row.value}</div>
                  </div>
                </div>
              ))}

              {/* Status update */}
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: "#4A5270", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>Update Status</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["new", "contacted", "resolved"].map(s => {
                    const cfg = STATUS_CONFIG[s];
                    const isActive = selected.status === s;
                    return (
                      <button key={s}
                        disabled={updatingId === selected._id}
                        onClick={() => updateStatus(selected._id, s)}
                        style={{
                          padding: "8px 18px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                          border: isActive ? `2px solid ${cfg.dot}` : `1.5px solid rgba(14,27,77,0.12)`,
                          background: isActive ? cfg.bg : C.white,
                          color: isActive ? cfg.color : "#4A5270",
                          cursor: updatingId ? "not-allowed" : "pointer",
                          transition: "all 0.25s ease",
                        }}>
                        {isActive && "✓ "}{cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div style={{ padding: "16px 28px 24px", borderTop: `1px solid rgba(14,27,77,0.08)`, display: "flex", justifyContent: "space-between", gap: 10 }}>
              <button
                onClick={() => { setConfirmDelete(selected); setSelected(null); }}
                style={{ padding: "10px 20px", background: "#FEF2F2", border: `1px solid rgba(192,41,42,0.2)`, borderRadius: 10, color: C.red, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                🗑 Delete
              </button>
              <button onClick={() => setSelected(null)}
                style={{ padding: "10px 24px", background: C.navy, border: "none", borderRadius: 10, color: C.white, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRM DELETE MODAL ── */}
      {confirmDelete && (
        <div className="modal-overlay"
          onClick={() => setConfirmDelete(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(10,21,53,0.6)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="modal-box"
            onClick={e => e.stopPropagation()}
            style={{ background: C.white, borderRadius: 20, width: "100%", maxWidth: 400, padding: "36px 32px", boxShadow: "0 24px 60px rgba(0,0,0,0.25)", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: C.navy, fontFamily: "'Georgia',serif", marginBottom: 10 }}>Delete Inquiry?</h3>
            <p style={{ fontSize: 13.5, color: "#5A6380", lineHeight: 1.7, marginBottom: 24 }}>
              This will permanently delete the inquiry from <strong>{confirmDelete.name}</strong>. This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setConfirmDelete(null)}
                style={{ padding: "11px 24px", background: C.lightGray, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#4A5270" }}>
                Cancel
              </button>
              <button
                disabled={deletingId === confirmDelete._id}
                onClick={() => deleteInquiry(confirmDelete._id)}
                style={{ padding: "11px 24px", background: C.red, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.white, opacity: deletingId ? 0.7 : 1 }}>
                {deletingId === confirmDelete._id ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}