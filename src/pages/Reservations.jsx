import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function Reservations() {
  const { user } = useAuth();

  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [facility, setFacility] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    const { data: f } = await supabase.from("facilities").select("*");

    const { data: b } = await supabase
      .from("reservations")
      .select("*, facilities(name)")
      .eq("user_id", user.id);

    setFacilities(f || []);
    setBookings(b || []);
  };

  const book = async () => {
    if (!facility || !date || !start || !end) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("reservations").insert([
      {
        user_id: user.id,
        facility_id: facility,
        date,
        start_time: start,
        end_time: end,
        status: "pending",
      },
    ]);

    if (error) {
      alert("Booking failed");
    } else {
      fetchData();
    }
  };

  return (
    <div className="app">
      <Sidebar />

      <div className="content">
        <Header />

        <div className="main">
          {/* FORM */}
          <div className="card form-card">
            <div className="section-title">Reserve Facility</div>

            <div className="form-grid">
              <select
                className="input"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
              >
                <option value="">Select facility</option>
                {facilities.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>

              <input
                className="input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <input
                className="input"
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />

              <input
                className="input"
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>

            <button className="button" onClick={book}>
              Book Facility
            </button>
          </div>

          {/* BOOKINGS */}
          <div className="card">
            <div className="section-title">My Reservations</div>

            {bookings.length === 0 && (
              <div className="text-muted">No reservations yet</div>
            )}

            {bookings.map((b) => (
              <div key={b.id} className="item">
                <div className="item-title">
                  {b.facilities?.name}
                </div>

                <div className="small">
                  {b.date} • {b.start_time} - {b.end_time}
                </div>

                <span className={`badge ${b.status}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}