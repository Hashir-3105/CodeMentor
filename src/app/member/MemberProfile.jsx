import React, { useEffect, useState } from "react";
import { Progress } from "../../components/ui/progress";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@clerk/clerk-react";

function MemberProfile() {
  const { user } = useUser();
  const [progressValue, setProgressValue] = useState(0);
  const [completedQuestionsCount, setCompletedQuestionsCount] = useState(0);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [progressRef, progressInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fetchProgress = async () => {
    if (!user?.id) return;

    console.log("🔄 Fetching progress for user:", user.id);

    // Fetch tests assigned to this user
    const { data: assignedTests, error: assignedError } = await supabase
      .from("test_assign_submissions")
      .select("question_list, status")
      .eq("user_id", user.id);

    if (assignedError) {
      console.error("❌ Error fetching assigned tests:", assignedError);
      return;
    }

    console.log("📌 Assigned Tests:", assignedTests);

    // Filter tests (if status column exists)
    const validTests =
      assignedTests?.filter(
        (test) =>
          !test.status ||
          test.status === "completed" ||
          test.status === "active"
      ) || [];

    // Calculate total questions
    const totalQuestions = validTests.reduce((acc, test) => {
      const questions = Array.isArray(test.question_list)
        ? test.question_list
        : typeof test.question_list === "string"
        ? JSON.parse(test.question_list)
        : [];
      return acc + questions.length;
    }, 0);

    setTotalQuestionsCount(totalQuestions);

    // Fetch completed questions for this user
    const { data: completedQuestions, error: completedError } = await supabase
      .from("question_progress")
      .select("question_id")
      .eq("user_id", user.id)
      .eq("is_completed", true);

    if (completedError) {
      console.error("❌ Error fetching completed questions:", completedError);
      return;
    }

    console.log("✅ Completed Questions:", completedQuestions);

    const completed = completedQuestions?.length || 0;
    setCompletedQuestionsCount(completed);

    const percentage =
      totalQuestions > 0 ? Math.round((completed / totalQuestions) * 100) : 0;
    setProgressValue(percentage);
  };

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id) return;

      console.log("🔄 Fetching progress for user:", user.id);

      // 1️⃣ Fetch assigned tests for this user
      const { data: assignedTests, error: assignedError } = await supabase
        .from("test_assign_submissions")
        .select("question_list, status")
        .eq("user_id", user.id);

      if (assignedError) {
        console.error("❌ Error fetching assigned questions:", assignedError);
        return;
      }

      console.log("📌 Assigned Tests:", assignedTests);

      // 2️⃣ Calculate total questions (properly handle arrays)
      const totalQuestions =
        assignedTests?.reduce((acc, test) => {
          if (Array.isArray(test.question_list)) {
            return acc + test.question_list.length;
          }
          return acc;
        }, 0) || 0;

      setTotalQuestionsCount(totalQuestions);
      console.log("✅ Total Questions:", totalQuestions);

      // 3️⃣ Fetch completed questions
      const { data: completedQuestionsData, error: completedError } =
        await supabase
          .from("question_progress")
          .select("question_id")
          .eq("user_id", user.id)
          .eq("is_completed", true);

      if (completedError) {
        console.error("❌ Error fetching completed questions:", completedError);
        return;
      }

      console.log("✅ Completed Questions:", completedQuestionsData);

      const completed = completedQuestionsData?.length || 0;
      setCompletedQuestionsCount(completed);

      // 4️⃣ Calculate percentage
      const percentage =
        totalQuestions > 0 ? Math.round((completed / totalQuestions) * 100) : 0;

      setProgressValue(percentage);
    };

    fetchProgress();
  }, [user?.id]);

  return (
    <section className="px-2 py-16 bg-gray-50 rounded-lg">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
        📊 Your Learning Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        <motion.div
          ref={aboutRef}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          className="bg-white shadow-md min-h-[310px] rounded-2xl p-8 border border-gray-200 flex items-start gap-6"
        >
          <div className="flex-shrink-0">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
              <Info className="w-10 h-10" />
            </div>
          </div>
          <div className="mt-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              About Your Progress
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Welcome to your personalized dashboard! Your progress will update
              automatically when you submit questions or when tests change.
            </p>
          </div>
        </motion.div>

        <motion.div
          ref={progressRef}
          initial="hidden"
          animate={progressInView ? "visible" : "hidden"}
          className="w-full flex flex-col gap-6 bg-white min-h-[310px] shadow-md rounded-2xl p-8 border border-gray-200"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Overall Progress
          </h3>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-gray-800 font-medium text-lg">
                  Coding Test Progress
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {progressValue}% completed
                </p>
              </div>
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {progressValue}%
              </span>
            </div>

            <div className="relative w-full">
              <Progress
                value={progressValue}
                className="h-5 bg-gray-200 rounded-full overflow-hidden [&>*]:bg-gradient-to-r [&>*]:from-blue-500 [&>*]:to-cyan-500 transition-all"
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                {progressValue}%
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{completedQuestionsCount} Completed</span>
              <span>{totalQuestionsCount} Total</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MemberProfile;
