import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        if (session?.user) fetchProfile(session.user.id);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const init = async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    setUser(session?.user || null);

    if (session?.user) {
      await fetchProfile(session.user.id);
    }

    setLoading(false);
  };

  const fetchProfile = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // ✅ FIX

  if (error) {
    console.error("Profile error:", error);
    return;
  }

  setProfile(data);
};

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);