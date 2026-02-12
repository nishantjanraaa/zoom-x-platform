import { useState } from "react";
import api from "../services/api";
import "../styles/auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const marketingLines = ["Build Better Meetings", "Connect Worldwide", "Collaborate Securely", "Grow Your Network"];

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await api.post("/auth/login", { email: form.email, password: form.password });
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        await api.post("/auth/register", form);
        setIsLogin(true);
      }
    } catch (err) { alert(err.response?.data?.msg || "Login failed"); }
    setLoading(false);
  };

  // Helper to keep the return block clean
  const renderMarketingText = marketingLines.map((line, lIdx) => (
    <div key={lIdx} className="line">
      {line.split(" ").map((word, wIdx) => (
        <span key={wIdx} className="word" style={{ animationDelay: `${(lIdx * 0.8) + (wIdx * 0.2)}s` }}>
          {word}&nbsp;
        </span>
      ))}
    </div>
  ));

  return (
    <div className={`auth-page ${!isLogin ? "register-mode" : ""}`}>
      <div className="side-text">{renderMarketingText}</div>

      <div className="auth-card">
        <h2>{isLogin ? "Sign In" : "Create Account"}</h2>
        <p className="auth-desc">Access your dashboard and manage meetings.</p>

        <form onSubmit={submit}>
          {!isLogin && <input type="text" placeholder="Full Name" onChange={(e) => setForm({...form, name: e.target.value})} required />}
          <input type="email" placeholder="Email Address" onChange={(e) => setForm({...form, email: e.target.value})} required />
          <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} required />
          <button type="submit">{loading ? "..." : isLogin ? "Sign In" : "Register"}</button>
        </form>

        <div className="switch-area">
          <span>{isLogin ? "New here?" : "Joined already?"}</span>
          <span className="switch-btn" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create Account" : "Login"}</span>
        </div>
      </div>

      <div className="brand">ZoomX Platform © 2026</div>
    </div>
  );
}

export default Auth;
