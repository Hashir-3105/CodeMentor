import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
const useAssignTestStore = create((set) => ({
  assignedTest: [],
  loading: false,
  error: null,
  hasFetch: false,
  fetchAssignedTest: async (userId = null, id = null) => {
    set({ assignedTest: [], loading: true });
    let query = supabase
      .from("test_assign_submissions")
      .select(
        "id, interviewer_name, room_name, question_list, scheduled_on,scheduled_time, user_id , int_position ,scheduled_datetime"
      )
      .order("created_at", { ascending: false });

    if (userId && id) {
      query = query.eq("user_id", userId).eq("id", id);
    } else if (userId) {
      query = query.eq("user_id", userId);
    } else if (id) {
      query = query.eq("id", id);
    }
    const { data, error } = await query;

    if (error) {
      console.error("Error fetching submissions:", error.message);
      set({ error, loading: false });
    } else {
      set({ assignedTest: data, loading: false, hasFetch: true });
    }
  },
}));
export default useAssignTestStore;
