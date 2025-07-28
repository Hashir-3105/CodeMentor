import { useState } from "react";
import { validationsAdmin } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export function useSubmitRequests() {
  const [isSelected, setIsSelected] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [form, setForm] = useState({
    questionInput: [],
    // roomInput: "",
    // interviewersInput: "",
  });
  const resetForm = () => {
    setIsSelected(false);
    setForm({
      questionInput: [],
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
        // interviewer_name: form.interviewersInput,
        // room_name: form.roomInput,
        question_list: form.questionInput,
        scheduled_on: selectedDate,
        user_id: selectedCandidate.user_id,
        candidate_name: selectedCandidate.full_name,
        int_position: selectedCandidate.position,
        scheduled_time: selectedTime,
        scheduled_datetime: new Date(
          localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
        ).toISOString(),
      };
      console.log("Submitting:", payload);
      const { data, error } = await supabase
        .from("test_assign_submissions")
        .insert([payload])
        .select();
      console.log("Insert response:", { data, error });

      if (error) {
        console.error("Insert error:", error);
        return false;
      }

      resetForm();
      setIsSelected(false);
      return true;
    } catch (err) {
      console.error("Submission exception:", err.message);
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
