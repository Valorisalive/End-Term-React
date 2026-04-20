import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import Sidebar from "../components/Sidebar";

export default function Announcements() {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from("announcements").select("*");
    setList(data || []);
  };

  const add = async () => {
    await supabase.from("announcements").insert([{ content: text }]);
    setText("");
    fetchData();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: 20 }}>
        <h2>Announcements</h2>

        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={add}>Add</button>

        {list.map((a) => (
          <p key={a.id}>{a.content}</p>
        ))}
      </div>
    </div>
  );
}