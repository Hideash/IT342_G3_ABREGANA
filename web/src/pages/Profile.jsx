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
    cursor: "pointer",
  },
  navRight: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
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
    maxWidth: "700px",
    margin: "0 auto",
    padding: "40px 32px",
  },
  pageTitle: {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "24px",
  },
  card: {
    background: "#111118",
    border: "1px solid #2a2a3d",
    borderRadius: "4px",
    padding: "32px",
    marginBottom: "20px",
  },
  avatarRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "32px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    background: "#6366f1",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff",
    flexShrink: 0,
  },
  avatarInfo: {},
  avatarName: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  avatarEmail: {
    color: "#555570",
    fontSize: "13px",
  },
  sectionTitle: {
    color: "#888899",
    fontSize: "11px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  label: {
    display: "block",
    color: "#888899",
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  value: {
    background: "#0d0d14",
    border: "1px solid #2a2a3d",
    borderRadius: "3px",
    padding: "12px 14px",
    color: "#ffffff",
    fontSize: "14px",
    marginBottom: "20px",
  },
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.7)",
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

export default function Profile() {
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
      {showLogoutModal && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>👋</div>
            <h2 style={s.modalTitle}>Logging Out?</h2>
            <p style={s.modalSubtitle}>Are you sure you want to logout of Patch Notes?</p>
            <div style={s.modalButtons}>
              <button style={s.cancelBtn} onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button style={s.confirmBtn} onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}

      <nav style={s.nav}>
        <div style={s.navBrand} onClick={() => navigate("/dashboard")}>Patch Notes</div>
        <div style={s.navRight}>
          <button style={s.navBtn} onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button style={s.activeNavBtn}>Profile</button>
          <button style={s.logoutBtn} onClick={() => setShowLogoutModal(true)}>Logout</button>
        </div>
      </nav>

      <div style={s.container}>
        <h1 style={s.pageTitle}>My Profile</h1>

        <div style={s.card}>
          <div style={s.avatarRow}>
            <div style={s.avatar}>
              {user.firstName?.charAt(0).toUpperCase()}
            </div>
            <div style={s.avatarInfo}>
              <div style={s.avatarName}>{user.firstName} {user.lastName}</div>
              <div style={s.avatarEmail}>{user.email}</div>
            </div>
          </div>

          <div style={s.sectionTitle}>Personal Information</div>
          <div style={s.row}>
            <div>
              <label style={s.label}>First Name</label>
              <div style={s.value}>{user.firstName || "—"}</div>
            </div>
            <div>
              <label style={s.label}>Last Name</label>
              <div style={s.value}>{user.lastName || "—"}</div>
            </div>
          </div>
          <div style={s.row}>
            <div>
              <label style={s.label}>Age</label>
              <div style={s.value}>{user.age > 0 ? user.age : "—"}</div>
            </div>
            <div>
              <label style={s.label}>Gender</label>
              <div style={s.value}>{user.gender || "—"}</div>
            </div>
          </div>
          <label style={s.label}>Email</label>
          <div style={s.value}>{user.email}</div>
          <label style={s.label}>Bio</label>
          <div style={s.value}>{user.bio || "No bio set yet."}</div>
        </div>
      </div>
    </div>
  );
}