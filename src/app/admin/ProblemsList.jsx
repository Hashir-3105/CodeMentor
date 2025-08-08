import React from "react";
import { createInputHandler } from "@/lib/utils";
import { useSubmitQuestions } from "@/hooks/useSubmitQuestions";
import QuestionTable from "./QuestionTable";
import QuestionTableModal from "./QuestionTableModal";

function TestCatalog() {
  const {
    handleSubmit,
    isSelected,
    setIsSelected,
    errors,
    setErrors,
    setForm,
    intQ,
    intCategory,
    diffLevel,
    difficultyOptions,
    dbQuestions,
    animatedComponents,
  } = useSubmitQuestions();

  const handleInputChange = createInputHandler(setForm, setErrors, errors);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <QuestionTable setIsSelected={setIsSelected} dbQuestions={dbQuestions} />
      <QuestionTableModal
        isSelected={isSelected}
        intQ={intQ}
        handleInputChange={handleInputChange}
        setIsSelected={setIsSelected}
        setErrors={setErrors}
        setForm={setForm}
        animatedComponents={animatedComponents}
        intCategory={intCategory}
        diffLevel={diffLevel}
        difficultyOptions={difficultyOptions}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
}

export default TestCatalog;
