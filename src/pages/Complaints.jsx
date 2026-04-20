import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Complaints() {
  const { user, profile } = useAuth();

  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    const { data } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });

    setList(data || []);
  };

  const add = async () => {
    if (!title) return alert("Enter complaint");

    const { error } = await supabase.from("complaints").insert([
      {
        title,
        created_by: user.id,
        status: "pending",
      },
    ]);

    if (error) {
      console.error(error);
      alert("Insert failed");
    } else {
      setTitle("");
      fetchData();
    }
  };

  const updateStatus = async (id, status) => {
    await supabase
      .from("complaints")
      .update({ status })
      .eq("id", id);

    fetchData();
  };

  return (
    <div className="app">
      <Sidebar />

      <div className="content">
        <div className="page-title">Complaints</div>

        <div className="card">
          <div className="section-title">Raise Complaint</div>

          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Describe your issue"
          />

          <button className="button" onClick={add}>
            Submit
          </button>
        </div>

        <div className="card">
          <div className="section-title">All Complaints</div>

          {list.length === 0 && (
            <p className="text-muted">No complaints yet</p>
          )}

          {list.map((c) => (
            <div key={c.id} className="item">
              <div className="item-title">{c.title}</div>

              <span className={`badge ${c.status}`}>
                {c.status}
              </span>

              {(profile?.role === "admin" ||
                profile?.role === "staff") && (
                <div style={{ marginTop: 8 }}>
                  {c.status !== "in_progress" && (
                    <button
                      className="button secondary"
                      onClick={() =>
                        updateStatus(c.id, "in_progress")
                      }
                    >
                      Start
                    </button>
                  )}

                  {c.status !== "resolved" && (
                    <button
                      className="button"
                      onClick={() =>
                        updateStatus(c.id, "resolved")
                      }
                      style={{ marginLeft: 6 }}
                    >
                      Resolve
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}