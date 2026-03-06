import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const s = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Courier New', monospace",
    padding: "40px 20px",
  },
  card: {
    background: "#111118",
    border: "1px solid #2a2a3d",
    borderRadius: "4px",
    padding: "48px",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 0 40px rgba(99, 102, 241, 0.1)",
  },
  badge: {
    display: "inline-block",
    background: "#6366f1",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: "3px",
    padding: "4px 10px",
    borderRadius: "2px",
    marginBottom: "16px",
    textTransform: "uppercase",
  },
  title: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 0 6px 0",
  },
  subtitle: {
    color: "#555570",
    fontSize: "13px",
    margin: "0 0 32px 0",
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
  input: {
    width: "100%",
    background: "#0d0d14",
    border: "1px solid #2a2a3d",
    borderRadius: "3px",
    padding: "12px 14px",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "'Courier New', monospace",
    marginBottom: "20px",
    boxSizing: "border-box",
    outline: "none",
  },
  select: {
    width: "100%",
    background: "#0d0d14",
    border: "1px solid #2a2a3d",
    borderRadius: "3px",
    padding: "12px 14px",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "'Courier New', monospace",
    marginBottom: "20px",
    boxSizing: "border-box",
    outline: "none",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    background: "#6366f1",
    color: "#ffffff",
    border: "none",
    borderRadius: "3px",
    padding: "14px",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "2px",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    marginTop: "4px",
  },
  error: {
    background: "#2a0d0d",
    border: "1px solid #5a1a1a",
    color: "#ff6b6b",
    padding: "10px 14px",
    borderRadius: "3px",
    fontSize: "13px",
    marginBottom: "20px",
  },
  footer: {
    textAlign: "center",
    marginTop: "24px",
    color: "#555570",
    fontSize: "13px",
  },
  link: { color: "#6366f1", textDecoration: "none" },
};

export default function Register() {
  const [form, setForm] = useState({
    email: "", password: "", username: "",
    firstName: "", lastName: "", age: "", gender: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/register", {
        ...form,
        age: parseInt(form.age)
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Registration failed. Email may already be in use.");
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.badge}>Patch Notes</div>
        <h1 style={s.title}>Create Account</h1>
        <p style={s.subtitle}>Join the gaming community</p>
        {error && <div style={s.error}>{error}</div>}

        <label style={s.label}>Email</label>
        <input style={s.input} placeholder="you@email.com" onChange={set("email")} />

        <div style={s.row}>
          <div>
            <label style={s.label}>First Name</label>
            <input style={s.input} placeholder="John" onChange={set("firstName")} />
          </div>
          <div>
            <label style={s.label}>Last Name</label>
            <input style={s.input} placeholder="Doe" onChange={set("lastName")} />
          </div>
        </div>

        <label style={s.label}>Password</label>
        <input style={s.input} type="password" placeholder="••••••••" min="0" onChange={set("password")} />

        <div style={s.row}>
          <div>
            <label style={s.label}>Age</label>
            <input style={s.input} type="number" placeholder="18" min="0" onChange={set("age")} />
          </div>
          <div>
            <label style={s.label}>Gender</label>
            <select style={s.select} onChange={set("gender")} defaultValue="">
              <option value="" disabled>Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <button style={s.button} onClick={handleSubmit}>Create Account</button>
        <div style={s.footer}>
          Already have an account?{" "}
          <Link to="/login" style={s.link}>Login</Link>
        </div>
      </div>
    </div>
  );
}