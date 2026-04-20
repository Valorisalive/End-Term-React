import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { profile } = useAuth();

  return (
    <div className="header">
      <div>
        <div className="header-title">Dashboard</div>
        <div className="header-sub">
          Welcome Back {profile?.role}
        </div>
      </div>
    </div>
  );
}