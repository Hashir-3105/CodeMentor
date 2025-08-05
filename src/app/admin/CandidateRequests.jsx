import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, User2, Mail, ClipboardList } from "lucide-react";
import { DialogComponent } from "@/components/common/DialogComponent";
// import { interviewers, rooms } from "@/lib/Constants";
import { totalTime } from "@/lib/Constants";
import { CalenderComponent } from "@/components/CalenderComponent";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { components } from "react-select";
import useQuestionStore from "@/store/useQuestionStore";
import useCandidatesStore from "@/store/useCandidatesStore";
import { TimerPicker } from "@/components/TimerPicker";
import Skeleton from "./Skeleton";
import { useSubmitRequests } from "@/hooks/useSubmitRequests";
import UpdatesPage from "@/components/common/UpdatesPage";
import Toaster from "@/components/common/Toaster";

function CandidateRequests() {
  const {
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
  } = useSubmitRequests();

  const { questions, fetchQuestions } = useQuestionStore();
  const animatedComponents = makeAnimated();

  const {
    // candidates,
    fetchCandidates,
    updateStatus,
    filteredCandidates,
    hasFetch,
    loading,
  } = useCandidatesStore();

  useEffect(() => {
    fetchCandidates();
    fetchQuestions();
  }, []);

  const questionOptions = questions.map((q) => ({
    label: q.int_question,
    value: q.id,
  }));

  const timeOptions = totalTime.map((time) => ({
    label: `${time} minutes`,
    value: time,
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
          <div>
            <UpdatesPage
              updateHeading={"No Requests Yet"}
              updateText={
                "Candidates will appear here once requests are received."
              }
            />
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
                        (option) => option.value
                      ), // ✅ use value (UUID)
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
                  options={timeOptions}
                  placeholder="Select Time"
                  components={animatedComponents}
                  onChange={(selectedOption) => {
                    setForm((prev) => ({
                      ...prev,
                      timeInput: selectedOption.value,
                    }));
                  }}
                />
                {errors.timeInput && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.timeInput}
                  </p>
                )}
              </div>

              {/* <div className="flex flex-col gap-0.5">
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
              </div> */}

              <CalenderComponent
                date={selectedDate}
                onDateChange={setSelectedDate}
              />
              <TimerPicker time={selectedTime} onTimeChange={setSelectedTime} />
            </>
          }
        />
      )}
      <Toaster />
    </div>
  );
}

export default CandidateRequests;
