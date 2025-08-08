import React from "react";
import { useSubmitRequests } from "@/hooks/useSubmitRequests";
import Toaster from "@/components/common/Toaster";
import RequestCard from "./RequestCard";
import AssignTestModal from "./AssignTestModal";

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
    animatedComponents,
    timeOptions,
    updateStatus,
    filteredCandidates,
    hasFetch,
    loading,
    questionOptions,
    CustomValueContainer,
  } = useSubmitRequests();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Candidate Requests
      </h2>
      <RequestCard
        loading={loading}
        setSelectedCandidate={setSelectedCandidate}
        hasFetch={hasFetch}
        filteredCandidates={filteredCandidates}
        setIsSelected={setIsSelected}
      />
      <AssignTestModal
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        handleSubmit={handleSubmit}
        updateStatus={updateStatus}
        setForm={setForm}
        resetForm={resetForm}
        questionOptions={questionOptions}
        animatedComponents={animatedComponents}
        CustomValueContainer={CustomValueContainer}
        errors={errors}
        timeOptions={timeOptions}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedCandidate={selectedCandidate}
      />
      <Toaster />
    </div>
  );
}

export default CandidateRequests;
