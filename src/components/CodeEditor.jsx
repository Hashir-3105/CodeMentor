import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Select from "react-select";
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
  const [languageId, setLanguageId] = useState({
    name: languages[0].name,
    value: languages[0],
  });

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

    if (result.stderr) {
      setOutput(result.stderr);
    } else if (result.compile_output) {
      setOutput(result.compile_output);
    } else {
      setOutput(result.stdout || "No Output");
    }
  };

  return (
    <div className="flex max-h-[calc(100vh - 80px)] bg-gray-900 text-white p-8 gap-4">
      <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-700 border-b border-gray-600">
          <span className="text-sm text-gray-300">{languageId.value.name}</span>
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
              className="bg-indigo-600 px-4 py-1 rounded hover:bg-indigo-700 text-sm"
            >
              {loading ? "Running..." : "Run Code"}
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
  );
}

export default CodeEditor;
