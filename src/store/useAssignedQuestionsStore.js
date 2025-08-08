import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

const useAssignedQuestionsStore = create((set) => ({
  assignedQuestions: [],
  fetchAssignedQuestions: async (testId) => {
    try {
      //  Fetch assigned questions with question details using a join
      const { data, error } = await supabase
        .from("test_assign_questions")
        .select(
          `
          question_id,
          add_question (
            id,
            int_question,
            que_category
          )
        `
        )
        .eq("test_id", testId);

      if (error) throw error;

      if (!data || data.length === 0) {
        set({ assignedQuestions: [] });
        return;
      }

      // 2️⃣ Save questions
      set({ assignedQuestions: data });
    } catch (err) {
      console.error("❌ Error fetching assigned questions:", err);
      set({ assignedQuestions: [] });
    }
  },
}));

export default useAssignedQuestionsStore;
