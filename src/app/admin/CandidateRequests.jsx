import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, User2, Mail, ClipboardList } from "lucide-react";
import { DialogComponent } from "@/components/common/DialogComponent";
import { interviewers, rooms } from "@/lib/Constants";
import { CalenderComponent } from "@/components/CalenderComponent";
import { supabase } from "@/lib/supabaseClient";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { components } from "react-select";
import { validationsAdmin } from "@/lib/utils";
import useQuestionStore from "@/store/useQuestionStore";
import useCandidatesStore from "@/store/useCandidatesStore";
import { TimerPicker } from "@/components/TimerPicker";
import { FadeLoader } from "react-spinners";
import Skeleton from "./Skeleton";
// import { createInputHandler } from "@/lib/utils";

const animatedComponents = makeAnimated();

function CandidateRequests() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const { questions, fetchQuestions } = useQuestionStore();
  const {
    // candidates,
    fetchCandidates,
    updateStatus,
    // filterCandidatesByStatus,
    filteredCandidates,
    hasFetch,
    loading,
  } = useCandidatesStore();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [form, setForm] = useState({
    questionInput: [],
    roomInput: "",
    interviewersInput: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCandidates();
    fetchQuestions();
  }, []);

  const resetForm = () => {
    setIsSelected(false);
    setForm({
      questionInput: [],
      roomInput: "",
      interviewersInput: "",
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
        interviewer_name: form.interviewersInput,
        room_name: form.roomInput,
        question_list: form.questionInput,
        scheduled_on: selectedDate,
        user_id: selectedCandidate.user_id,
        int_position: selectedCandidate.position,
        scheduled_time: selectedTime,
        scheduled_datetime: new Date(
          localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
        ).toISOString(),
      };
      console.log("Submitting:", payload);
      const { data, error } = await supabase
        .from("test_assign_submissions2")
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

  const questionOptions = questions.map((q) => ({
    label: q.int_question,
    value: q,
  }));

  const roomOptions = rooms.map((r) => ({
    label: r.name,
    value: r,
  }));

  const interviewerOptions = interviewers.map((int) => ({
    label: int.name,
    value: int,
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

  // const handleInputChange = createInputHandler(setErrors, setForm, errors);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Candidate Requests
      </h2>

      <div className="">
        {loading ? (
          <div>
            <Skeleton />
          </div>
        ) : hasFetch && filteredCandidates.length === 0 ? (
          <div className="col-span-full flex justify-center items-center py-10 text-gray-500 text-lg font-medium border rounded-xl bg-white shadow">
            No Requests yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-2 text-base font-semibold">
                    <User2 className="w-4 h-4 text-blue-600" />
                    {candidate.full_name}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {candidate.email}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    <ClipboardList className="w-4 h-4 text-gray-400" />
                    Applied for:
                    <span className="text-gray-800 font-medium ml-1">
                      {candidate.position}
                    </span>
                  </p>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      candidate.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : candidate.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {candidate.status || "Pending"}
                  </span>

                  <Button
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setIsSelected(true);
                    }}
                    className="text-sm bg-blue-600 text-white px-4 py-1.5 hover:bg-blue-700 transition-colors rounded-md"
                  >
                    Assign Test
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isSelected && (
        <DialogComponent
          description="Assign a test to the selected candidate. Choose the test type, set the interview date and time, and click Assign to send the test invitation."
          isOpen={isSelected}
          onClose={resetForm}
          cancelLabel="Cancel"
          submitLabel="Submit"
          onSubmit={async () => {
            const isProcessed = await handleSubmit();
            if (!isProcessed) return;
            await updateStatus(selectedCandidate.id);
            setIsSelected(false);
          }}
          children={
            <>
              <div className="flex flex-col gap-0.5">
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  options={questionOptions}
                  placeholder="Select Questions"
                  components={{
                    ...animatedComponents,
                    ValueContainer: CustomValueContainer,
                  }}
                  onChange={(selectedOptions) => {
                    setForm((prev) => ({
                      ...prev,
                      questionInput: selectedOptions.map(
                        (option) => option.label
                      ),
                    }));
                  }}
                />
                {errors.questionInput && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.questionInput}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <Select
                  options={roomOptions}
                  placeholder="Select Room"
                  components={animatedComponents}
                  onChange={(selectedOption) => {
                    setForm((prev) => ({
                      ...prev,
                      roomInput: selectedOption.label,
                    }));
                  }}
                />
                {errors.roomInput && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.roomInput}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <Select
                  options={interviewerOptions}
                  placeholder="Select Interviewer"
                  components={animatedComponents}
                  onChange={(selectedOption) => {
                    setForm((prev) => ({
                      ...prev,
                      interviewersInput: selectedOption.label,
                    }));
                  }}
                />
                {errors.interviewersInput && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.interviewersInput}
                  </p>
                )}
              </div>

              <CalenderComponent
                date={selectedDate}
                onDateChange={setSelectedDate}
              />
              <TimerPicker time={selectedTime} onTimeChange={setSelectedTime} />
            </>
          }
        />
      )}
    </div>
  );
}

export default CandidateRequests;
