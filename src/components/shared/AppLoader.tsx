import { LoaderCircle } from "lucide-react";

function AppLoader() {
  return (
    <div className="flex flex-col justify-center items-center col-span-full py-12">
      <LoaderCircle className="mb-2 w-8 h-8 text-cyan-500 animate-spin" />
      <span className="font-semibold text-gray-500 text-lg">Loading...</span>
    </div>
  );
}

export default AppLoader;
