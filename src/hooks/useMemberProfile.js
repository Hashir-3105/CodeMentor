import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabaseClient";
export default function useMemberProfile() {
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
  return {
    aboutRef,
    aboutInView,
    progressRef,
    progressInView,
    progressValue,
    completedQuestionsCount,
    totalQuestionsCount,
    categoryProgress,
  };
}
