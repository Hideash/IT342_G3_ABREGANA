import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const s = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0f",
    fontFamily: "'Courier New', monospace",
    color: "#ffffff",
  },
  nav: {
    background: "#111118",
    borderBottom: "1px solid #2a2a3d",
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "60px",
  },
  navBrand: {
    background: "#6366f1",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: "3px",
    padding: "4px 10px",
    borderRadius: "2px",
    textTransform: "uppercase",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #2a2a3d",
    color: "#888899",
    padding: "8px 16px",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontFamily: "'Courier New', monospace",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 32px",
  },
  profileCard: {
    background: "#111118",
    border: "1px solid #2a2a3d",
    borderRadius: "4px",
    padding: "32px",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  avatar: {
    width: "72px",
    height: "72px",
    background: "#6366f1",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
    flexShrink: 0,
  },
  profileInfo: { flex: 1 },
  username: {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 4px 0",
    color: "#ffffff",
  },
  email: {
    color: "#555570",
    fontSize: "13px",
    margin: "0 0 10px 0",
  },
  bio: {
    color: "#888899",
    fontSize: "13px",
    margin: 0,
    background: "#0d0d14",
    border: "1px solid #2a2a3d",
    borderRadius: "3px",
    padding: "8px 12px",
    display: "inline-block",
  },
  sectionTitle: {
    color: "#888899",
    fontSize: "11px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    marginBottom: "16px",
    marginTop: "0",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    background: "#111118",
    border: "1px solid #2a2a3d",
    borderRadius: "4px",
    padding: "20px 24px",
  },
  statLabel: {
    color: "#555570",
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  statValue: {
    color: "#6366f1",
    fontSize: "28px",
    fontWeight: "bold",
  },
  feedCard: {
    background: "#111118",
    border: "1px solid #2a2a3d",
    borderRadius: "4px",
    padding: "32px",
  },
  emptyFeed: {
    textAlign: "center",
    color: "#555570",
    padding: "40px 0",
    fontSize: "13px",
  },
  emptyIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },
  activeNavBtn: {
  background: "#1a1a2e",
  border: "1px solid #6366f1",
  color: "#6366f1",
  padding: "8px 16px",
  borderRadius: "3px",
  cursor: "pointer",
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  fontFamily: "'Courier New', monospace",
},
navBtn: {
  background: "transparent",
  border: "1px solid #2a2a3d",
  color: "#888899",
  padding: "8px 16px",
  borderRadius: "3px",
  cursor: "pointer",
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  fontFamily: "'Courier New', monospace",
},
  // Modal styles
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#111118",
    border: "1px solid #2a2a3d",
    borderRadius: "4px",
    padding: "40px",
    width: "100%",
    maxWidth: "360px",
    boxShadow: "0 0 40px rgba(99, 102, 241, 0.15)",
    textAlign: "center",
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  modalSubtitle: {
    color: "#555570",
    fontSize: "13px",
    marginBottom: "32px",
  },
  modalButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  cancelBtn: {
    background: "transparent",
    border: "1px solid #2a2a3d",
    color: "#888899",
    padding: "12px",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "12px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontFamily: "'Courier New', monospace",
  },
  confirmBtn: {
    background: "#dc2626",
    border: "none",
    color: "#ffffff",
    padding: "12px",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "12px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontFamily: "'Courier New', monospace",
    fontWeight: "bold",
  },
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user/me")
      .then(res => setUser(res.data))
      .catch(() => navigate("/login"));
  }, []);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return (
    <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#555570", letterSpacing: "2px", fontSize: "12px" }}>LOADING...</p>
    </div>
  );

  return (
    <div style={s.page}>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>👋</div>
            <h2 style={s.modalTitle}>Logging Out?</h2>
            <p style={s.modalSubtitle}>Are you sure you want to logout of Patch Notes?</p>
            <div style={s.modalButtons}>
              <button style={s.cancelBtn} onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button style={s.confirmBtn} onClick={confirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

        <nav style={s.nav}>
        <div style={s.navBrand}>Patch Notes</div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button style={s.activeNavBtn} onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button style={s.navBtn} onClick={() => navigate("/profile")}>Profile</button>
            <button style={s.logoutBtn} onClick={() => setShowLogoutModal(true)}>Logout</button>
        </div>
        </nav>

      <div style={s.container}>
        {/* Profile Card */}
        <div style={s.profileCard}>
          <div style={s.avatar}>
            {user.firstName?.charAt(0).toUpperCase()}
          </div>
          <div style={s.profileInfo}>
            <h2 style={s.username}>{user.firstName} {user.lastName}</h2>
            <p style={s.email}>{user.email}</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {user.age > 0 && <span style={s.bio}>Age: {user.age}</span>}
              {user.gender && <span style={s.bio}>{user.gender}</span>}
              <span style={s.bio}>{user.bio || "No bio set yet."}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <p style={s.sectionTitle}>Overview</p>
        <div style={s.statsRow}>
          <div style={s.statCard}>
            <div style={s.statLabel}>Patch Notes</div>
            <div style={s.statValue}>0</div>
          </div>
          <div style={s.statCard}>
            <div style={s.statLabel}>Messages</div>
            <div style={s.statValue}>0</div>
          </div>
          <div style={s.statCard}>
            <div style={s.statLabel}>Likes</div>
            <div style={s.statValue}>0</div>
          </div>
        </div>

        {/* Feed */}
        <p style={s.sectionTitle}>Recent Activity</p>
        <div style={s.feedCard}>
          <div style={s.emptyFeed}>
            <div style={s.emptyIcon}>📋</div>
            <p>No patch notes posted yet.</p>
            <p>Start sharing game updates with the community!</p>
          </div>
        </div>
      </div>
    </div>
  );
}