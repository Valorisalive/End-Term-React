import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Billing() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", user.id);

    setPayments(data || []);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: 20 }}>
        <h2>Billing</h2>

        {payments.map((p) => (
          <div key={p.id}>
            ₹{p.amount} - {p.status}
          </div>
        ))}
      </div>
    </div>
  );
}