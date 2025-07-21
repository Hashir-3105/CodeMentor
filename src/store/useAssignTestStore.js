import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
const useAssignTestStore = create((set) => ({
  assignedTest: [],
  loading: false,
  error: null,
  fetchAssignedTest: async (userId = null) => {
    set({ loading: true, error: null });

    let query = supabase
      .from("test_assign_submissions")
      .select(
        "id, interviewer_name, room_name, question_list, scheduled_at, user_id , int_position"
      )
      .order("created_at", { ascending: false });

    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching submissions:", error.message);
      set({ error, loading: false });
    } else {
      set({ assignedTest: data, loading: false });
    }
  },
}));
export default useAssignTestStore;
