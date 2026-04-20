import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [complaints, setComplaints] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    const { data: c } = await supabase
      .from("complaints")
      .select("*")
      .eq("created_by", user.id);

    const { data: r } = await supabase
      .from("reservations")
      .select("*")
      .eq("user_id", user.id);

    setComplaints(c || []);
    setReservations(r || []);
  };

  return (
    <div className="app">
      <Sidebar />

      <div className="content">
        <Header />

        <div className="main">
          {/* Stats */}
          <div className="grid grid-3">
            <div className="stat">
              <div className="stat-label">Total Complaints</div>
              <div className="stat-value">{complaints.length}</div>
            </div>

            <div className="stat">
              <div className="stat-label">Active Complaints</div>
              <div className="stat-value">
                {complaints.filter(c => c.status !== "resolved").length}
              </div>
            </div>

            <div className="stat">
              <div className="stat-label">Reservations</div>
              <div className="stat-value">{reservations.length}</div>
            </div>
          </div>

          <div style={{ height: 20 }} />

          {/* Activity */}
          <div className="grid grid-2">
            <div className="card">
              <div className="section-title">Recent Complaints</div>

              {complaints.map((c) => (
                <div key={c.id} className="item">
                  <div className="item-title">{c.title}</div>
                  <span className={`badge ${c.status}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="section-title">Recent Reservations</div>

              {reservations.map((r) => (
                <div key={r.id} className="item">
                  <div className="item-title">
                    {r.date} • {r.start_time}
                  </div>
                  <span className={`badge ${r.status}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}