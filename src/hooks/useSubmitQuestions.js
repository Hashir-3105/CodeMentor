import { validationsTestCatalog } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import useQuestionStore from "@/store/useQuestionStore";
import { useState } from "react";
import { questionDifficulty } from "@/lib/Constants";
import makeAnimated from "react-select/animated";
import { useEffect } from "react";

export function useSubmitQuestions() {
  const [isSelected, setIsSelected] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    intQ: "",
    // expectedOutput: "",
    intCategory: "",
    diffLevel: "",
  });

  const {
    addQuestion,
    questions: dbQuestions,
    fetchQuestions,
  } = useQuestionStore();

  const animatedComponents = makeAnimated();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const { intQ, intCategory, diffLevel } = form;
  const handleSubmit = async () => {
    const validateErrors = validationsTestCatalog(form);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return false;
    }

    try {
      const { data, error } = await supabase
        .from("add_question")
        .insert([
          {
            int_question: intQ,
            // expected_output: JSON.stringify(testCases),
            que_category: intCategory,
            question_difficulty: diffLevel,
          },
        ])
        .select();

      if (error) throw error;

      addQuestion(data[0]);
      setForm({ intQ: "", intCategory: "", diffLevel: "" });
      setIsSelected(false);
    } catch (err) {
      console.error("Submission error:", err.message);
    }
  };
  const difficultyOptions = questionDifficulty.map((diff) => ({
    label: diff,
    value: diff,
  }));
  return {
    handleSubmit,
    isSelected,
    setIsSelected,
    errors,
    setErrors,
    setForm,
    intQ,
    intCategory,
    diffLevel,
    // expectedOutput,
    difficultyOptions,
    dbQuestions,
    animatedComponents,
  };
}
