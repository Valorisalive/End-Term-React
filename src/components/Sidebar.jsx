import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { profile, logout } = useAuth();

  return (
    <div className="sidebar">
      <h3>Uniting Homes</h3>

      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/complaints">Complaints</NavLink>
      <NavLink to="/reservations">Reservations</NavLink>
      <NavLink to="/announcements">Announcements</NavLink>
      <NavLink to="/billing">Billing</NavLink>

      <div style={{ marginTop: "auto" }}>
        <hr style={{ borderColor: "#1f2a44", margin: "15px 0" }} />

        <p className="small">{profile?.role}</p>

        <button className="button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
