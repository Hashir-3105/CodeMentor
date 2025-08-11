// import { useSubmitRequests } from "@/hooks/useSubmitRequests";
import { BadgeCheck, User2, Mail, ClipboardList } from "lucide-react";
import UpdatesPage from "@/components/common/UpdatesPage";
import Skeleton from "./Skeleton";
import { Button } from "@/components/ui/button";
export default function RequestCard({
  loading,
  hasFetch,
  filteredCandidates,
  setSelectedCandidate,
  setIsSelected,
}) {
  return (
    <div>
      {loading ? (
        <div>
          <Skeleton />
        </div>
      ) : hasFetch && filteredCandidates.length === 0 ? (
        <div>
          <UpdatesPage
            updateHeading={"No Requests Yet"}
            updateText={
              "Candidates will appear here once requests are received."
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-2 text-base font-semibold">
                  <User2 className="w-4 h-4 text-blue-600" />
                  {candidate.full_name}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {candidate.email}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <ClipboardList className="w-4 h-4 text-gray-400" />
                  Applied for:
                  <span className="text-gray-800 font-medium ml-1">
                    {candidate.position}
                  </span>
                </p>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    candidate.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : candidate.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {candidate.status || "Pending"}
                </span>

                <Button
                  onClick={() => {
                    setSelectedCandidate(candidate);
                    setIsSelected(true);
                  }}
                  className="text-sm bg-blue-600 text-white px-4 py-1.5 hover:bg-blue-700 transition-colors rounded-md"
                >
                  Assign Test
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
