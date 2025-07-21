"use client";
import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import { ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export function TimerPicker({ time, onTimeChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <ClockIcon className="mr-2 h-4 w-4 text-[#808080]" />
            {time ? (
              <span>{time}</span>
            ) : (
              <span className="text-[#808080]">Pick a time</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-2 flex justify-items-start bg-white w-auto">
          <TimePicker
            onChange={(val) => {
              onTimeChange(val);
              setOpen(false);
            }}
            value={time}
            disableClock={false}
            clockIcon={null}
            clearIcon={null}
            className="!border-none !shadow-none"
            format="hh:mm a"
            locale="en-US"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
