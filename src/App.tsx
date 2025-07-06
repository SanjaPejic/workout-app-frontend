import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header";
import CreateWorkoutPage from "./pages/CreateWorkoutPage";
import GenerateWorkoutPage from "./pages/GenerateWorkoutPage";
import SavedWorkoutPage from "./pages/SavedWorkoutPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<CreateWorkoutPage />} />
          <Route path="/generate" element={<GenerateWorkoutPage />} />
          <Route path="/saved" element={<SavedWorkoutPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
export default App;
