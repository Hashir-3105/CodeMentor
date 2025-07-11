import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, User2, Mail, ClipboardList } from "lucide-react";
import { DialogComponent } from "../DialogComponent";
import MultiSelectDropdown from "../MultiSelectDropdown";
import { candidateRequests } from "@/Constants";
import { questions } from "@/Constants";
import { rooms } from "@/Constants";
import { CalenderComponent } from "../CalenderComponent";
function Management() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleAssign = () => {
    setIsSelected(true);
  };
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Candidate Requests
      </h2>

      <div className="mb-4 w-full sm:w-1/3 border p-2 rounded-lg">
        <input
          className="w-full outline-none px-3"
          placeholder="Search by name or email..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidateRequests.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-xl p-5 shadow border hover:shadow-md transition-all"
          >
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2 text-base font-medium">
                <User2 className="w-4 h-4 text-blue-600" />
                {candidate.name}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                {candidate.email}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <ClipboardList className="w-4 h-4" />
                Applied for:{" "}
                <span className="text-gray-800 font-semibold ml-1">
                  {candidate.appliedFor}
                </span>
              </p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                {candidate.status}
              </span>
              <Button
                onClick={handleAssign}
                className="text-sm px-4 py-1.5 cursor-pointer"
              >
                Assign Test
              </Button>
            </div>
          </div>
        ))}
      </div>
      {isSelected && (
        <DialogComponent
          description=" Assign a test to the selected candidate. Choose the test type, set the interview date and time, and click Assign to send the test invitation."
          children={
            <>
              <MultiSelectDropdown
                data={questions}
                titleKey={"title"}
                selectedCategory={"question selected"}
                label={"Select question"}
              />
              <MultiSelectDropdown
                data={rooms}
                titleKey={"name"}
                selectedCategory={"selected"}
                label={"Select room"}
              />
              <CalenderComponent
                date={selectedDate}
                onDateChange={setSelectedDate}
              />
            </>
          }
          isOpen={isSelected}
          onClose={() => setIsSelected(false)}
          cancelLabel={"Cancel"}
          submitLabel={"Submit"}
          onSubmit={() => setIsSelected(false)}
        />
      )}
    </div>
  );
}

export default Management;
