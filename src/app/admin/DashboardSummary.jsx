import { Card, CardContent } from "@/components/ui/card";
export default function DashboardSummary({ dispayCardData }) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Coding Assessment Platform
        </h1>
        <p className="text-gray-600 mt-2">
          Monitor and manage candidate assessments in real-time
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dispayCardData.map((item, idx) => {
          return (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <span>{item.icon}</span>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {item.status}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {item.count}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
