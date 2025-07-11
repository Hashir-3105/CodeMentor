import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { questions } from "@/Constants";
import { DialogComponent } from "../DialogComponent";
import Input from "../Input";

function TestCatalog() {
  const [isSelected, setIsSelected] = useState(false);
  const addDetails = () => {
    setIsSelected(true);
  };
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Test Catalog</h2>
        <button
          onClick={addDetails}
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
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className={"bg-white"}>
            <SelectItem value="JavaScript">JavaScript</SelectItem>
            <SelectItem value="React">React</SelectItem>
            <SelectItem value="CSS">CSS</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent className={"bg-white"}>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
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
            {questions.map((q) => (
              <tr key={q.id}>
                <td className="px-4 py-2">{q.title}</td>
                <td className="px-4 py-2">{q.category}</td>
                <td className="px-4 py-2">{q.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isSelected && (
        <DialogComponent
          name={"Add Question"}
          isOpen={isSelected}
          onClose={() => setIsSelected(false)}
          children={
            <>
              <Input
                title={"Question"}
                placeholder={"Add question..."}
                name={"question"}
              />
              <Input
                title={"Category"}
                placeholder={"Add Category..."}
                name={"category"}
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
