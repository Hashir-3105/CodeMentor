import React from "react";
import { Progress } from "../../components/ui/progress";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function MemberProfile() {
  const progressData = [
    { label: "HTML", value: 90 },
    { label: "CSS", value: 70 },
    { label: "JavaScript", value: 60 },
  ];

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [progressRef, progressInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fadeFromLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const fadeFromRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="px-2 py-16 bg-gray-50 rounded-lg">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
        📊 Your Learning Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        <motion.div
          ref={aboutRef}
          variants={fadeFromLeft}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          className="bg-white shadow-md min-h-[312px] rounded-2xl p-8 border border-gray-200 flex items-start gap-6"
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
              Welcome to your personalized dashboard! Track your journey across
              key web development skills. Stay focused, monitor your growth, and
              set goals to level up consistently.
            </p>
          </div>
        </motion.div>

        <motion.div
          ref={progressRef}
          variants={fadeFromRight}
          initial="hidden"
          animate={progressInView ? "visible" : "hidden"}
          className="w-full flex flex-col gap-6 bg-white shadow-md rounded-2xl p-8 border border-gray-200"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Monthly Progress
          </h3>
          {progressData.map((item, index) => (
            <div key={index} className="group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-800 font-medium group-hover:text-blue-600 transition">
                  {item.label}
                </span>
                <span className="text-sm text-gray-600">{item.value}%</span>
              </div>
              <Progress
                value={item.value}
                className="h-4 bg-gray-200 rounded-full [&>*]:bg-gradient-to-r [&>*]:from-blue-500 [&>*]:to-cyan-500"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MemberProfile;
