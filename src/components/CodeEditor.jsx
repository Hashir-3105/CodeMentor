import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

// Connect to Socket.IO server
const socket = io("http://localhost:5000");

function CodeEditor() {
  const [code, setCode] = useState("");

  // Send code change to server when user types
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

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 gap-6">
      <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
        <div className="text-white flex justify-between items-center text-lg font-semibold px-6 py-2 bg-gray-700 border-b border-gray-600">
          <span>JavaScript Code Editor</span>
          <Link
            to="#"
            className="border text-white px-6 py-2 rounded-md shadow hover:brightness-110 transition duration-200"
          >
            Run
          </Link>
        </div>
        <Editor
          height="70vh"
          language="javascript"
          className="p-1"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
