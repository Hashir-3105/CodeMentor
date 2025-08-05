import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";
import Select from "react-select";
import useAssignTestStore from "@/store/useAssignTestStore";
import useAssignedQuestionsStore from "@/store/useAssignedQuestionsStore";
import { useParams, useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import CountDownTimer from "./common/CountDownTimer";
import { supabase } from "@/lib/supabaseClient";
import { languages } from "@/lib/Constants";

const socket = io("https://codementor-backend-production.up.railway.app/");

function CodeEditor() {
  const [code, setCode] = useState("");
  const [codeByQuestion, setCodeByQuestion] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [isCodeValid, setIsCodeValid] = useState(false);

  const [languageId, setLanguageId] = useState({
    name: languages[0].name,
    value: languages[0],
  });

  const { assignedTest, fetchAssignedTest } = useAssignTestStore();
  const { assignedQuestions, fetchAssignedQuestions } =
    useAssignedQuestionsStore();
  const { userId, testId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  // ✅ Fetch test info
  useEffect(() => {
    const idToFetch = userId || user?.id;
    if (idToFetch && testId) {
      fetchAssignedTest(idToFetch, testId);
      fetchAssignedQuestions(testId); // fetch questions separately
    }
  }, [userId, testId, user?.id]);

  // ✅ Select first question after fetching
  useEffect(() => {
    if (assignedQuestions && assignedQuestions.length > 0) {
      setSelectedQuestion(assignedQuestions[0]);
    }
  }, [assignedQuestions]);

  // ✅ Restore code per question
  useEffect(() => {
    if (selectedQuestion) {
      const questionKey = selectedQuestion.question_id;
      setCode(codeByQuestion[questionKey] || "");
    }
  }, [selectedQuestion]);

  const languageOptions = languages.map((lang) => ({
    label: lang.name,
    value: lang,
  }));

  const handleEditorChange = (value) => {
    const questionKey = selectedQuestion?.question_id;
    setCode(value);
    setCodeByQuestion((prev) => ({
      ...prev,
      [questionKey]: value,
    }));

    socket.emit("code_change", value);
  };

  // ✅ Sync code with socket
  useEffect(() => {
    socket.on("code_change", (incomingCode) => setCode(incomingCode));
    return () => socket.off("code_change");
  }, []);

  const runCode = async () => {
    if (!selectedQuestion) return alert("Please select a question first!");
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
    setLoading(false);

    if (result.status && result.status.description === "Accepted") {
      setSuccessMessage(true);
      setIsCodeValid(true);
      setTimeout(() => setSuccessMessage(false), 3000);
    } else {
      setIsCodeValid(false);
    }

    if (result.stderr) setOutput(result.stderr);
    else if (result.compile_output) setOutput(result.compile_output);
    else setOutput(result.stdout || "No Output");
  };

  const handleSubmit = async () => {
    if (!selectedQuestion) return alert("Please select a question first!");

    const questionKey = selectedQuestion.question_id;
    const codeToSubmit = codeByQuestion[questionKey] || "";

    const { data, error } = await supabase
      .from("question_progress")
      .upsert(
        {
          user_id: user?.id,
          question_id: questionKey,
          category: selectedQuestion.add_question.que_category,
          is_completed: true,
          code: codeToSubmit,
        },
        { onConflict: ["user_id", "question_id"] }
      )
      .select();

    if (error) {
      console.error("❌ Error saving progress:", error);
    } else {
      console.log("✅ Progress saved:", data);
      setSubmittedQuestions((prev) => [...prev, questionKey]);

      const currentIndex = assignedQuestions.findIndex(
        (q) => q.question_id === questionKey
      );
      if (currentIndex !== -1 && currentIndex < assignedQuestions.length - 1) {
        setSelectedQuestion(assignedQuestions[currentIndex + 1]);
      }
    }
  };

  const handleTimeUp = async () => {
    console.log(
      "⏰ Time is up! Marking test as completed and navigating home..."
    );
    const { error } = await supabase
      .from("test_assign_submissions")
      .update({ status: "Completed" })
      .eq("id", testId);

    if (error) console.error("❌ Error updating test status:", error);
    navigate("/");
  };

  return (
    <>
      <div className="mt-6 bg-white shadow-md p-6 dark:bg-gray-900 border border-gray-800">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Your Assigned Questions
        </h2>
        {assignedQuestions && assignedQuestions.length > 0 ? (
          <div className="grid gap-4">
            <CountDownTimer
              testId={assignedTest[0]?.id}
              durationInMinutes={assignedTest[0]?.duration_minutes}
              onTimeUp={handleTimeUp}
            />
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-white hover:shadow-lg transition-shadow">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                {assignedQuestions.map((q, qIndex) => (
                  <li
                    key={qIndex}
                    onClick={() => {
                      if (!submittedQuestions.includes(q.question_id)) {
                        setSelectedQuestion(q);
                      }
                    }}
                    className={`cursor-pointer hover:text-blue-400 
                      ${
                        selectedQuestion?.question_id === q.question_id
                          ? "text-blue-500 font-bold"
                          : ""
                      }
                      ${
                        submittedQuestions.includes(q.question_id)
                          ? "line-through cursor-not-allowed opacity-70"
                          : ""
                      }
                    `}
                  >
                    {q.add_question.int_question}
                  </li>
                ))}
              </ul>
            </div>
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
            <div className="flex gap-2">
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
                <Play />
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isCodeValid}
                className="bg-green-600 px-4 py-1 rounded hover:bg-green-700 text-sm cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
          <Editor
            height="calc(100vh - 160px)"
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
          <div className="p-4 text-sm whitespace-pre-wrap overflow-y-auto max-h-[calc(100vh - 180px)]">
            {loading ? (
              <p className="text-yellow-400">Running code...</p>
            ) : successMessage ? (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">
                <h3 className="font-bold">✅ Code Accepted!</h3>
                <p className="text-xs mt-1">
                  Well done! Your code ran successfully. Now you can submit your
                  code.
                </p>
              </div>
            ) : (
              <p className="text-green-400">
                {output || "Output will appear here"}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
