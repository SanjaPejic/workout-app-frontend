"use client";

import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface FilterButtonProps {
  icon: LucideIcon;
  label: string;
  count: number;
  onClick: () => void;
  variant?: "default" | "warning";
}

function FilterButton({
  icon: Icon,
  label,
  count,
  onClick,
  variant = "default",
}: FilterButtonProps) {
  const baseClasses =
    "flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium shadow-sm hover:shadow-md transition-all duration-200";

  const variantClasses = {
    default:
      "border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-800",
    warning:
      "border-red-200 hover:border-red-300 text-gray-700 hover:text-red-800",
  };

  const badgeClasses = {
    default: "bg-cyan-500 text-white",
    warning: "bg-red-500 text-white",
  };

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <Icon className="w-4 h-4" />
      {label}
      {count > 0 && (
        <span
          className={`${badgeClasses[variant]} text-xs rounded-full w-5 h-5 flex items-center justify-center`}
        >
          {count}
        </span>
      )}
    </Button>
  );
}

export default FilterButton;
