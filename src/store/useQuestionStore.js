import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

const useQuestionStore = create((set) => ({
  questions: [],
  loading: false,
  error: null,
  fetchQuestions: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("add_question")
      .select(
        "id, int_question, que_category, question_difficulty,expected_output"
      )
      .order("created_at", { ascending: false });

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ questions: data, loading: false });
    }
  },

  addQuestion: (question) =>
    set((state) => ({
      questions: [question, ...state.questions],
    })),
  // removeQuestion: async (id) => {
  //   const { error } = await supabase.from("add_question").delete().eq("id", id);

  //   if (error) {
  //     console.error("Failed to delete candidate:", error.message);
  //     return;
  //   }

  //   set((state) => ({
  //     questions: state.questions.filter((question) => question.id !== id),
  //   }));
  // },
}));

export default useQuestionStore;
