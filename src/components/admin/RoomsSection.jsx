import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "@/components/ui/progress";
// import { DialogComponent } from "../DialogComponent";
import { rooms } from "@/Constants";

export default function RoomsSection() {
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedRoom, setSelectedRoom] = useState(null);
  // const handleRoomSelection = (room) => {
  //   setIsOpen(!isOpen);
  //   setSelectedRoom(room);
  // };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Rooms
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-8xl mx-auto">
        {rooms.map((room, id) => (
          <Card
            key={id}
            className=" transition duration-300 border border-gray-200"
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {room.name}
                </CardTitle>
                {/* <button
                  onClick={() => handleRoomSelection(room)}
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Schedule Test
                </button> */}
              </div>
              <p className="text-sm text-gray-500 mt-1">{room.status}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm text-gray-600">
                Capacity Usage: {room.progress}%
              </div>
              <Progress
                value={room.progress}
                className="h-3 rounded-full bg-gray-200 [&>*]:bg-blue-600"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      {/* {isOpen && selectedRoom && (
        <DialogComponent
          id={selectedRoom.id}
          name={selectedRoom.name}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )} */}
    </div>
  );
}
