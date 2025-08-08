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
  const [categoryProgress, setCategoryProgress] = useState([]);

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [progressRef, progressInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id) return;

      // 1️⃣ Fetch all test IDs for the user
      const { data: assignedTests, error: testError } = await supabase
        .from("test_assign_submissions")
        .select("id")
        .eq("user_id", user.id);

      if (testError) {
        console.error("❌ Error fetching tests:", testError);
        return;
      }

      const testIds = assignedTests.map((t) => t.id);
      if (testIds.length === 0) {
        setTotalQuestionsCount(0);
        setCompletedQuestionsCount(0);
        setProgressValue(0);
        setCategoryProgress([]);
        return;
      }

      // 2️⃣ Fetch all assigned questions for these tests
      const { data: assignedQuestions, error: questionsError } = await supabase
        .from("test_assign_questions")
        .select("question_id, add_question(que_category)")
        .in("test_id", testIds);

      if (questionsError) {
        console.error("❌ Error fetching assigned questions:", questionsError);
        return;
      }

      // ✅ Deduplicate question IDs
      const uniqueQuestionIds = [
        ...new Set(assignedQuestions.map((q) => q.question_id)),
      ];
      setTotalQuestionsCount(assignedQuestions.length);

      // Fetch completed questions for these unique IDs
      const { data: completedQuestionsData, error: completedError } =
        await supabase
          .from("question_progress")
          .select("question_id")
          .eq("user_id", user.id)
          .eq("is_completed", true)
          .in("question_id", uniqueQuestionIds);

      if (completedError) {
        console.error("❌ Error fetching completed questions:", completedError);
        return;
      }

      const completedIds = [
        ...new Set(completedQuestionsData.map((q) => q.question_id)),
      ];
      setCompletedQuestionsCount(completedIds.length);

      //overall percentage
      const percentage =
        uniqueQuestionIds.length > 0
          ? Math.round((completedIds.length / uniqueQuestionIds.length) * 100)
          : 0;
      setProgressValue(percentage);
      const categoryMap = {};

      // Count total questions (with duplicates) for each category
      assignedQuestions.forEach((q) => {
        const category = q.add_question.que_category;

        if (!categoryMap[category]) {
          categoryMap[category] = { completed: new Set(), total: 0 };
        }

        // Always count total assigned questions
        categoryMap[category].total += 1;

        // If this question is completed, add it to completed set (avoiding duplicates)
        if (completedIds.includes(q.question_id)) {
          categoryMap[category].completed.add(q.question_id);
        }
      });

      // Convert map to array
      const categoryStats = Object.entries(categoryMap).map(
        ([category, stats]) => ({
          category,
          completed: stats.completed.size,
          total: stats.total,
          progress:
            stats.total > 0
              ? Math.round((stats.completed.size / stats.total) * 100)
              : 0,
        })
      );

      setCategoryProgress(categoryStats);
    };

    fetchProgress();
  }, [user?.id]);

  return (
    <section className="px-2 py-16 bg-gray-50 rounded-lg">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
        📊 Your Learning Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        {/* About Progress */}
        <motion.div
          ref={aboutRef}
          initial={{ opacity: 0, x: -40 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3 }}
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
          initial={{ opacity: 0, x: 40 }}
          animate={progressInView ? { opacity: 1, x: 0 } : {}}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3 }}
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
        <div className="col-span-1 md:col-span-2 bg-white shadow-md rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Category Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryProgress.map((cat, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-inner"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-800 font-medium text-lg">
                    {cat.category}
                  </span>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {cat.progress}%
                  </span>
                </div>

                <Progress
                  value={cat.progress}
                  className="h-4 bg-gray-200 rounded-full overflow-hidden [&>*]:bg-gradient-to-r [&>*]:from-green-500 [&>*]:to-emerald-500 transition-all"
                />

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{cat.completed} Completed</span>
                  <span>{cat.total} Total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MemberProfile;
