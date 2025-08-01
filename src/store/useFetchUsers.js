import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

const useFetchUsers = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });

    const { data, error } = await supabase.from("clerk_users").select("*");

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ users: data, loading: false });
    }
  },
}));

export default useFetchUsers;
