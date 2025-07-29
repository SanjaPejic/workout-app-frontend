import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { AlertTriangle } from "lucide-react";
import FilterPopover from "@/components/shared/FilterPopover";
import FilterButton from "@/components/shared/FilterButton";
import type { Muscle } from "@/types/Muscle";
import { useEffect, useState } from "react";
import { useUserStore } from "@/constants/UserStore";
import { getUserInjuries, updateUserInjuries } from "@/api/client-service";
import { QueryKeys } from "@/api/constants/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UserInjury {
  id: number;
  muscle: Muscle;
  user: {
    id: number;
    username: string;
  };
}

interface InjuryButtonProps {
  isInjuriesOpen: boolean;
  setIsInjuriesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setToast: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      message: string;
    }>
  >;
}

function InjuryButton({
  isInjuriesOpen,
  setIsInjuriesOpen,
  setToast,
}: InjuryButtonProps) {
  const [tempInjuredMuscles, setTempInjuredMuscles] = useState<Muscle[]>([]);
  const [appliedInjuredMuscles, setAppliedInjuredMuscles] = useState<Muscle[]>(
    []
  );
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.id);

  const { data: injuriesData } = useQuery<
    { id: number; muscle: Muscle; user: { id: number; username: string } }[]
  >({
    queryKey: [QueryKeys.INJURIES, userId],
    queryFn: () => getUserInjuries(userId!),
    enabled: !!userId,
  });

  const updateInjuriesMutation = useMutation({
    mutationFn: (injuries: Muscle[]) =>
      updateUserInjuries(
        userId!,
        injuries.map((muscle) => ({ muscle }))
      ),
    onSuccess: (response) => {
      setAppliedInjuredMuscles(
        response.map((injury: UserInjury) => injury.muscle)
      );
      queryClient.invalidateQueries({ queryKey: [QueryKeys.INJURIES, userId] });
      setToast({ visible: true, message: "Applied injuries" });
    },
    onError: (error: any) => {
      setToast({
        visible: true,
        message: error?.response?.data || "Failed to apply injuries",
      });
    },
  });

  const handleInjuriesOpen = (open: boolean) => {
    if (open) {
      setTempInjuredMuscles(appliedInjuredMuscles);
    }
    setIsInjuriesOpen(open);
  };

  const applyInjuries = () => {
    setAppliedInjuredMuscles(tempInjuredMuscles);
    setIsInjuriesOpen(false);
    updateInjuriesMutation.mutate(tempInjuredMuscles);
  };

  const clearInjuries = () => {
    setTempInjuredMuscles([]);
  };

  useEffect(() => {
    if (injuriesData) {
      setAppliedInjuredMuscles(injuriesData.map((injury) => injury.muscle));
    }
  }, [injuriesData]);

  return (
    <Popover open={isInjuriesOpen} onOpenChange={handleInjuriesOpen}>
      <PopoverTrigger asChild>
        <div>
          <FilterButton
            icon={AlertTriangle}
            label="Injuries"
            count={appliedInjuredMuscles.length}
            onClick={() => {}}
            variant="warning"
          />
        </div>
      </PopoverTrigger>

      <FilterPopover
        title="Select Injuries"
        subtitle="Mark injured muscles"
        selectedItems={tempInjuredMuscles}
        onItemsChange={setTempInjuredMuscles}
        onApply={applyInjuries}
        onClear={clearInjuries}
        variant="warning"
      />
    </Popover>
  );
}

export default InjuryButton;
