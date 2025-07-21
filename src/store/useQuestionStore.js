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
      .select("id, int_question, que_category, question_difficulty")
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
}));

export default useQuestionStore;
