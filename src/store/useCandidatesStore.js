import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

const useCandidatesStore = create((set) => ({
  candidates: [],
  loading: false,
  error: null,
  fetchCandidates: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("id, full_name, email, position , user_id")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching submissions:", error.message);
    } else {
      set({ candidates: data, loading: false });
    }
  },
  addCandidate: (candidate) =>
    set((state) => ({
      candidates: [candidate, ...state.candidate],
    })),
  removeCandidate: async (user_id) => {
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("user_id", user_id);

    if (error) {
      console.error("Failed to delete candidate:", error.message);
      return;
    }

    set((state) => ({
      candidates: state.candidates.filter(
        (candidate) => candidate.user_id !== user_id
      ),
    }));
  },
}));
export default useCandidatesStore;
