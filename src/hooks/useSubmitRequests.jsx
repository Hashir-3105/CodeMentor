import React from "react";
import { useState, useEffect } from "react";
import { validationsAdmin } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import { toast, Bounce } from "react-toastify";
import makeAnimated from "react-select/animated";
import { totalTime } from "@/lib/Constants";
import useQuestionStore from "@/store/useQuestionStore";
import useCandidatesStore from "@/store/useCandidatesStore";
import { components } from "react-select";

export function useSubmitRequests() {
  const [isSelected, setIsSelected] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const animatedComponents = makeAnimated();
  const { questions, fetchQuestions } = useQuestionStore();
  const {
    // candidates,
    fetchCandidates,
    updateStatus,
    filteredCandidates,
    hasFetch,
    loading,
  } = useCandidatesStore();

  useEffect(() => {
    fetchQuestions();
    fetchCandidates();
  }, [fetchQuestions, fetchCandidates]);

  const [form, setForm] = useState({
    questionInput: [],
    timeInput: null,
  });

  const resetForm = () => {
    setIsSelected(false);
    setForm({
      questionInput: [],
      timeInput: null,
    });
    setSelectedDate(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    const validateErrors = validationsAdmin(form);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return false;
    }
    setErrors({});
    try {
      if (!selectedDate || !selectedTime) {
        alert("Please select both date and time.");
        return;
      }

      const [hours, minutes] = selectedTime.split(":").map(Number);
      const localDateTime = new Date(selectedDate);
      localDateTime.setHours(hours, minutes, 0, 0);

      if (isNaN(localDateTime.getTime())) {
        alert("Invalid date or time format.");
        return;
      }

      const payload = {
        duration_minutes: form.timeInput,
        scheduled_on: selectedDate,
        user_id: selectedCandidate.user_id,
        candidate_name: selectedCandidate.full_name,
        int_position: selectedCandidate.position,
        scheduled_time: selectedTime,
        scheduled_datetime: new Date(
          localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
        ).toISOString(),
      };

      // Create test record
      const { data: testData, error: testError } = await supabase
        .from("test_assign_submissions")
        .insert([payload])
        .select();

      if (testError) throw testError;

      const testId = testData[0].id; // Get test id

      // Insert into test_assign_questions
      const questionInserts = form.questionInput.map((qId) => ({
        test_id: testId,
        question_id: qId,
      }));

      const { error: questionsError } = await supabase
        .from("test_assign_questions")
        .insert(questionInserts);

      if (questionsError) throw questionsError;

      toast.success("Test assigned Successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });

      resetForm();
      setIsSelected(false);
      return true;
    } catch (err) {
      console.error("❌ Submission exception:", err.message);
    }
  };
  const timeOptions = totalTime.map((time) => ({
    label: `${time} minutes`,
    value: time,
  }));
  const questionOptions = questions.map((q) => ({
    label: q.int_question,
    value: q.id,
  }));
  const CustomValueContainer = ({ children, ...props }) => {
    const selected = props.getValue();
    return (
      <components.ValueContainer {...props}>
        {selected.length === 0 ? (
          <components.Placeholder {...props}>
            {props.selectProps.placeholder}
          </components.Placeholder>
        ) : (
          `${selected.length} selected`
        )}
        {React.cloneElement(children[1])}
      </components.ValueContainer>
    );
  };
  return {
    isSelected,
    setIsSelected,
    handleSubmit,
    errors,
    resetForm,
    setForm,
    setSelectedTime,
    selectedTime,
    selectedDate,
    setSelectedDate,
    selectedCandidate,
    setSelectedCandidate,
    animatedComponents,
    timeOptions,
    questionOptions,
    questions,
    updateStatus,
    filteredCandidates,
    hasFetch,
    loading,
    CustomValueContainer,
  };
}
