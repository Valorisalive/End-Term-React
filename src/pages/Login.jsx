import { useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Uniting Homes</h1>
        <p className="login-sub">Resident Portal</p>

        <input
          className="input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button full" onClick={handleLogin}>
          Sign In
        </button>

        <div className="login-footer">
          New here? <a href="/register">Request access</a>
        </div>
      </div>
    </div>
  );
}