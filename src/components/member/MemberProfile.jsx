import React from "react";
import { Progress } from "../ui/progress";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

function MemberProfile() {
  const progressData = [
    { label: "HTML", value: 90 },
    { label: "CSS", value: 70 },
    { label: "JAVASCRIPT", value: 60 },
  ];

  return (
    <div className="px-2 py-12 rounded-lg overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-lg min-h-[270px] rounded-xl p-8 border border-gray-200 flex items-start gap-6"
        >
          <div className="flex-shrink-0">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
              <Info className="w-10 h-10" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              About Your Progress
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              Welcome to your personalized progress dashboard! Here you can
              track your learning journey across core web development skills
              like HTML, CSS, and JavaScript. Use this visual summary to reflect
              on your achievements and set goals for the coming month.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col gap-6"
        >
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Monthly Progress
          </h1>
          {progressData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 font-medium">{item.label}</span>
                <span className="text-gray-600 text-sm">{item.value}%</span>
              </div>
              <Progress
                value={item.value}
                className="h-4 bg-gray-200 rounded-full [&>*]:bg-blue-500"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default MemberProfile;
