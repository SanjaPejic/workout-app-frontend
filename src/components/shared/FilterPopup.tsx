import type { Muscle } from "@/types/Muscle";
import { PopoverContent } from "../ui/popover";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/api/constants/query-keys";
import { getMuscles } from "@/api/client-service";
import AppLoader from "./AppLoader";

interface FilterPopupProps {
  title: string;
  subtitle?: string;
  selectedItems: Muscle[];
  onItemsChange: (items: Muscle[]) => void;
  onApply: () => void;
  onClear: () => void;
  variant?: "default" | "warning";
}

function FilterPopup({
  title,
  subtitle,
  selectedItems,
  onItemsChange,
  onApply,
  onClear,
  variant = "default",
}: FilterPopupProps) {
  //const [musclesData, setMusclesData] = useState<Muscle[]>([]);

  const { data: musclesData, isLoading: isMusclesDataLoading } = useQuery<
    Muscle[]
  >({
    queryKey: [QueryKeys.MUSCLES],
    queryFn: getMuscles,
  });

  // send get api request to backend
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/muscles")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setMusclesData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch muscles:", error);
  //     });
  // }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMuscles = musclesData?.filter((muscle) =>
    muscle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearAll = () => {
    onItemsChange([]);
    setSearchTerm("");
    onClear();
  };

  const handleItemChange = (muscle: Muscle, checked: boolean) => {
    if (checked) {
      onItemsChange([...selectedItems, muscle]);
    } else {
      onItemsChange(selectedItems.filter((m) => m.id !== muscle.id));
    }
  };

  const buttonClasses = {
    default: "bg-cyan-600 hover:bg-cyan-700",
    warning: "bg-red-500 hover:bg-red-700",
  };

  return (
    <PopoverContent
      className="z-50 p-4 w-96 max-h-[80vh] overflow-hidden"
      sideOffset={5}
      align="start"
      onWheel={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="space-y-4 max-h-[75vh] overflow-y-auto">
        {/*Title and Clear Button */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-gray-600 text-sm">{subtitle}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="px-2 h-8 text-gray-500 hover:text-gray-700 text-sm"
          >
            Clear All
          </Button>
        </div>

        {/*Search Input*/}
        <div className="relative">
          <Search className="top-1/2 left-2 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Search muscles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 pr-4 pl-8 border border-gray-200 rounded-lg text-sm"
          />
        </div>

        {/*Selection Count Text*/}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">
            {selectedItems.length} muscle{selectedItems.length !== 1 ? "s" : ""}{" "}
            selected
          </span>
        </div>

        {/*Muscle List*/}
        <div className="gap-2 grid grid-cols-2 max-h-64 overflow-y-auto">
          {isMusclesDataLoading ? (
            <AppLoader />
          ) : (
            filteredMuscles?.map((muscle) => (
              <div key={muscle.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`muscle-${muscle.id}`}
                  checked={selectedItems.some((m) => m.id === muscle.id)}
                  onCheckedChange={(checked) =>
                    handleItemChange(muscle, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`muscle-${muscle.id}`}
                  className="text-sm capitalize cursor-pointer"
                >
                  {muscle.name}
                </Label>
              </div>
            ))
          )}
        </div>

        <Button
          onClick={onApply}
          className={`w-full ${buttonClasses[variant]} text-white font-semibold py-2 rounded-xl`}
        >
          Apply ({selectedItems.length})
        </Button>
      </div>
    </PopoverContent>
  );
}

export default FilterPopup;
