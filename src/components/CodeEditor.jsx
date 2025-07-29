import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Select from "react-select";
import useAssignTestStore from "@/store/useAssignTestStore";
import { useParams } from "react-router-dom";
import { Play, X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import LoadingSuccess from "./LoadingSuccess";
const languages = [
  { id: 63, name: "JavaScript (Node.js)" },
  { id: 71, name: "Python (3.8)" },
  { id: 62, name: "Java (OpenJDK)" },
  { id: 52, name: "C++ (GCC)" },
  { id: 50, name: "C (GCC)" },
];
const socket = io("http://localhost:5000");
function CodeEditor() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [languageId, setLanguageId] = useState({
    name: languages[0].name,
    value: languages[0],
  });
  const { assignedTest, fetchAssignedTest } = useAssignTestStore();
  const { userId, testId } = useParams();
  const { user } = useUser();

  useEffect(() => {
    const idToFetch = userId || user?.id;
    if (idToFetch && testId) {
      fetchAssignedTest(idToFetch, testId);
    }
  }, [userId, testId, user?.id]);

  const languageOptions = languages.map((lang) => ({
    label: lang.name,
    value: lang,
  }));
  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit("code_change", value);
  };
  useEffect(() => {
    socket.on("code_change", (incomingCode) => {
      setCode(incomingCode);
    });

    return () => {
      socket.off("code_change");
    };
  }, []);

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    setSuccessMessage(false);
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "0ae9bd1041mshb2ccab24010dabcp14bb26jsnf08fd15e0a40",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId.value.id,
          stdin: "",
        }),
      }
    );

    const result = await response.json();
    console.log(result);
    setLoading(false);

    if (result.status && result.status.description === "Accepted") {
      setSuccessMessage(true);
    } else {
      setSuccessMessage(false);
    }
    if (result.stderr) {
      setOutput(result.stderr);
    } else if (result.compile_output) {
      setOutput(result.compile_output);
    } else {
      setOutput(result.stdout || "No Output");
    }
  };

  return (
    <>
      <div className=" mt-6 bg-white shadow-md p-6 dark:bg-gray-900 border border-gray-800">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Your Assigned Questions
        </h2>
        {assignedTest && assignedTest.length > 0 ? (
          <div className="grid gap-4">
            {assignedTest.map((test, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-white hover:shadow-lg transition-shadow"
              >
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                  {test.question_list.map((q, qIndex) => (
                    <li key={qIndex}>
                      {typeof q === "string"
                        ? q
                        : q.question || JSON.stringify(q)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">
            You have not been assigned any questions yet.
          </p>
        )}
      </div>
      <div className="flex max-h-[calc(100vh - 80px)] bg-gray-900 text-white p-8 gap-4">
        <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-700 border-b border-gray-600">
            <span className="text-sm text-gray-300">
              {languageId.value.name}
            </span>
            <div className="flex justify-between gap-2">
              <Select
                options={languageOptions}
                value={languageId}
                onChange={(selectedOption) => setLanguageId(selectedOption)}
                classNamePrefix="select"
                className="text-black w-64"
              />

              <button
                onClick={runCode}
                className="bg-indigo-600 px-4 py-1 rounded hover:bg-indigo-700 text-sm cursor-pointer"
              >
                {/* {loading ? "Running..." : "Run Code"} */}
                <Play />
              </button>
            </div>
          </div>
          <Editor
            height="calc(100vh - 160px)"
            className=""
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
            }}
          />
        </div>
        <div className="w-1/3 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-gray-700 border-b border-gray-600 text-sm text-gray-300">
            Output
          </div>
          <div className="p-4 text-green-400 text-sm whitespace-pre-wrap overflow-y-auto max-h-[calc(100vh - 180px)]">
            {output || "Output will appear here"}
          </div>
        </div>
      </div>
      {successMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center w-[350px] animate-scaleUp">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Code Accepted!</h2>
            <p className="text-gray-500 text-sm mt-2">
              Well done! You solved the problem successfully.
            </p>
            <button
              onClick={() => setSuccessMessage(false)}
              className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CodeEditor;
