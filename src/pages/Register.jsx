import { useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    block: "",
    flat: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const { error } = await supabase.from("pending_users").insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        block: form.block,
        flat_number: form.flat,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Request Submitted</h2>
          <p style={{ marginTop: 10 }}>
            Info sent for validation. This may take 1–2 days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Create Account</h2>

        <input className="input" name="name" placeholder="Full Name" onChange={handleChange} />
        <input className="input" name="email" placeholder="Email" onChange={handleChange} />
        <input className="input" name="phone" placeholder="Phone" onChange={handleChange} />
        <input className="input" name="block" placeholder="Block (A/B/C)" onChange={handleChange} />
        <input className="input" name="flat" placeholder="Flat Number" onChange={handleChange} />

        <button className="button" onClick={submit}>
          Submit for Approval
        </button>
      </div>
    </div>
  );
}