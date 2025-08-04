import React, { useState, useEffect } from "react";
// import {
//   Select as UISelect,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
import { DialogComponent } from "@/components/common/DialogComponent";
import Input from "@/components/common/Input";
import { questionDifficulty } from "@/lib/Constants";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useQuestionStore from "@/store/useQuestionStore";
import { createInputHandler } from "@/lib/utils";
import { useSubmitQuestions } from "@/hooks/useSubmitQuestions";
import { X } from "lucide-react";
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
  const [testCases, setTestCases] = useState([
    { input: "", expected_output: "" },
  ]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const difficultyOptions = questionDifficulty.map((diff) => ({
    label: diff,
    value: diff,
  }));

  const handleInputChange = createInputHandler(setForm, setErrors, errors);
  const handleTestCaseChange = (index, field, value) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expected_output: "" }]);
  };

  const removeTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

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
            setIsSelected(false);
            setForm({ intQ: "", intCategory: "", diffLevel: "" });
            setTestCases([{ input: "", expected_output: "" }]);
            setErrors({});
          }}
          onSubmit={async () => {
            await handleSubmit({ testCases });
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

              {/* <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">Test Cases</h3>
                {testCases.map((test, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      placeholder="Input (e.g. 7 8)"
                      value={test.input}
                      onChange={(e) =>
                        handleTestCaseChange(index, "input", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Expected Output (e.g. 15)"
                      value={test.expected_output}
                      onChange={(e) =>
                        handleTestCaseChange(
                          index,
                          "expected_output",
                          e.target.value
                        )
                      }
                    />
                    <button
                      onClick={() => removeTestCase(index)}
                      className="cursor-pointer"
                    >
                      <X />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTestCase}
                  className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                >
                  + Add Test Case
                </button>
              </div> */}
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
