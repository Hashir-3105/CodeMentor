import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

const useCandidatesStore = create((set, get) => ({
  candidates: [],
  filteredCandidates: [],
  loading: false,
  hasFetch: false,
  error: null,

  fetchCandidates: async () => {
    set({ loading: true, error: null });

    const { data, error } = await supabase
      .from("contact_submissions")
      .select("id, full_name, email, position , user_id ,status")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching submissions:", error.message);
      set({ loading: false, error: error.message });
    } else {
      const pending = data.filter((c) => c.status === "pending");
      set({
        candidates: data,
        filteredCandidates: pending,
        loading: false,
        hasFetch: true,
      });
    }
  },

  filterCandidatesByStatus: (status) => {
    const all = get().candidates;
    const filtered = all.filter((c) => c.status === status);
    set({ filteredCandidates: filtered });
  },

  updateStatus: async (id) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status: "assigned" })
      .eq("id", id);

    if (error) {
      console.error("Failed to update status:", error.message);
      return;
    }

    await get().fetchCandidates();
  },
}));

export default useCandidatesStore;
