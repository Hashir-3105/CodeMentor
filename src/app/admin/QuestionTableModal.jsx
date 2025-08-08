import React from "react";
import { DialogComponent } from "@/components/common/DialogComponent";
import Input from "@/components/common/Input";
import Select from "react-select";
// import { X } from "lucide-react";

function QuestionTableModal({
  isSelected,
  setIsSelected,
  setForm,
  setErrors,
  handleSubmit,
  handleInputChange,
  errors,
  animatedComponents,
  intQ,
  intCategory,
  diffLevel,
  difficultyOptions,
}) {
  // const [testCases, setTestCases] = useState([
  //   { input: "", expected_output: "" },
  // ]);

  // const handleTestCaseChange = (index, field, value) => {
  //   const updated = [...testCases];
  //   updated[index][field] = value;
  //   setTestCases(updated);
  // };

  // const addTestCase = () => {
  //   setTestCases([...testCases, { input: "", expected_output: "" }]);
  // };

  // const removeTestCase = (index) => {
  //   setTestCases(testCases.filter((_, i) => i !== index));
  // };
  return (
    <>
      {isSelected && (
        <DialogComponent
          name={"Add Question"}
          isOpen={isSelected}
          onClose={() => {
            setIsSelected(false);
            setForm({ intQ: "", intCategory: "", diffLevel: "" });
            // setTestCases([{ input: "", expected_output: "" }]);
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
    </>
  );
}

export default QuestionTableModal;
