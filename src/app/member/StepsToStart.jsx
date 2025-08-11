import React from "react";
import { motion } from "framer-motion";
import { useMemberUtils } from "@/hooks/useMemberUtils";
import { stepsToStart } from "@/lib/Constants";
function StepsToStart() {
  const { howItWorksInView, howItWorksRef } = useMemberUtils();
  return (
    <motion.div
      ref={howItWorksRef}
      initial={{ opacity: 0, y: 50 }}
      animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mt-12 bg-white rounded-2xl shadow-md p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
        How It Works
      </h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        {stepsToStart.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={howItWorksInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-blue-50 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {item.step}
            </div>
            <h3 className="text-lg font-semibold text-gray-700">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default StepsToStart;
