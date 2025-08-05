import { useState } from "react";
import { validationsAdmin } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import { toast, Bounce } from "react-toastify";
export function useSubmitRequests() {
  const [isSelected, setIsSelected] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [form, setForm] = useState({
    questionInput: [],
    timeInput: null,
    // roomInput: "",
    // interviewersInput: "",
  });
  const resetForm = () => {
    setIsSelected(false);
    setForm({
      questionInput: [],
      timeInput: null,
      // roomInput: "",
      // interviewersInput: "",
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

      // 1️⃣ Create test record
      const { data: testData, error: testError } = await supabase
        .from("test_assign_submissions")
        .insert([payload])
        .select();

      if (testError) throw testError;

      const testId = testData[0].id; // ✅ Get test id

      // 2️⃣ Insert into test_assign_questions
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
  };
}
