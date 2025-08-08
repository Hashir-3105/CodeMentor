import React from "react";

export default function QuestionTable({ setIsSelected, dbQuestions }) {
  return (
    <>
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
    </>
  );
}
