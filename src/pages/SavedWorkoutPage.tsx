import { useState } from "react";

function SavedWorkoutPage() {
  //needs to be the data from API response, all the workouts for the specific user who is logged in
  const [savedWorkouts, setSavedWorkouts] = useState;

  //injury button needs to be exactly the same as the one on the create workout page
  //     const applyInjuries = () => {
  //     setAppliedInjuredMuscles(tempInjuredMuscles);
  //     setIsInjuriesOpen(false);
  //     updateInjuriesMutation.mutate(tempInjuredMuscles);
  //   };

  return (
    <div>
      {/*Base of the page*/}
      <div className="bg-gray-50 mx-auto px-6 py-8 min-h-screen">
        {/*Upper part*/}
        <h2 className="mb-8 font-bold text-slate-900 text-3xl text-center">
          Saved Workouts ({savedWorkouts.length})
        </h2>
        {/*Controls*/}
        <div className="flex justify-between items-center mb-8">
          {/*Left side: search + filter button + injuries button*/}
          <div className="flex items-center gap-3">
            {/*Injuries Button*/}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedWorkoutPage;
