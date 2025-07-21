import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function MultiSelectDropdown({ data, label, selectedCategory, titleKey }) {
  const [selected, setSelected] = useState([]);

  const toggleItem = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((val) => val !== item) : [...prev, item]
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={"flex justify-start"} variant="outline">
          {selected.length > 0
            ? `${selected.length} ${selectedCategory}`
            : `${label}`}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full bg-white">
        {data.map((item, id) => (
          <DropdownMenuCheckboxItem
            className={"w-full bg-white"}
            key={id}
            checked={selected.includes(item)}
            onCheckedChange={() => toggleItem(item)}
          >
            {item[titleKey]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MultiSelectDropdown;
