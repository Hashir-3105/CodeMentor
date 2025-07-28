import React, { useState, useEffect } from "react";
import {
  Select as UISelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DialogComponent } from "@/components/common/DialogComponent";
import Input from "@/components/common/Input";
import { questionDifficulty } from "@/lib/Constants";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useQuestionStore from "@/store/useQuestionStore";
import { createInputHandler } from "@/lib/utils";
import { useSubmitQuestions } from "@/hooks/useSubmitQuestions";
const animatedComponents = makeAnimated();

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
  } = useSubmitQuestions();

  const { questions: dbQuestions, fetchQuestions } = useQuestionStore();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const difficultyOptions = questionDifficulty.map((diff) => ({
    label: diff,
    value: diff,
  }));

  const handleInputChange = createInputHandler(setForm, setErrors, errors);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Test Catalog</h2>
        <button
          onClick={() => setIsSelected(true)}
          className="border px-2 py-1 rounded-lg cursor-pointer"
        >
          Add New Question
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          placeholder="Search questions..."
          className="w-full sm:w-[300px] border rounded-lg px-3"
        />
        <UISelect>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className={"bg-white"}>
            <SelectItem value="JavaScript">JavaScript</SelectItem>
            <SelectItem value="React">React</SelectItem>
            <SelectItem value="CSS">CSS</SelectItem>
          </SelectContent>
        </UISelect>
        <UISelect>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent className={"bg-white"}>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </UISelect>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Difficulty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dbQuestions.map((q) => (
              <tr key={q.id}>
                <td className="px-4 py-2">{q.int_question}</td>
                <td className="px-4 py-2">{q.que_category}</td>
                <td className="px-4 py-2">{q.question_difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isSelected && (
        <DialogComponent
          name={"Add Question"}
          isOpen={isSelected}
          onClose={() => {
            setIsSelected(false),
              setForm({ intQ: "", intCategory: "", diffLevel: "" }),
              setErrors({});
          }}
          onSubmit={async () => {
            await handleSubmit();
          }}
          children={
            <>
              <div className="flex flex-col gap-0.5">
                <Input
                  placeholder={"Add question..."}
                  name={"intQ"}
                  value={intQ}
                  onChange={handleInputChange("intQ")}
                />
                {errors.intQ && (
                  <p className="text-red-500 text-sm">{errors.intQ}</p>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <Input
                  placeholder={"Add Category..."}
                  name={"intCategory"}
                  value={intCategory}
                  onChange={handleInputChange("intCategory")}
                />
                {errors.intCategory && (
                  <p className="text-red-500 text-sm">{errors.intCategory}</p>
                )}
              </div>
              <Select
                options={difficultyOptions}
                placeholder="Select..."
                name={"diffLevel"}
                value={difficultyOptions.find(
                  (option) => option.value === diffLevel
                )}
                components={animatedComponents}
                onChange={(selectedOption) => {
                  setForm((prev) => ({
                    ...prev,
                    diffLevel: selectedOption.value,
                  }));
                }}
              />
            </>
          }
          cancelLabel={"Cancel"}
          submitLabel={"Add"}
        />
      )}
    </div>
  );
}

export default TestCatalog;
