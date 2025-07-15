import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateWorkoutPage from "./pages/CreateWorkoutPage";
import GenerateWorkoutPage from "./pages/GenerateWorkoutPage";
import SavedWorkoutPage from "./pages/SavedWorkoutPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/layout/appLayout";

const queryClient = new QueryClient();

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<AppLayout />}>
        <Route path="/create" element={<CreateWorkoutPage />} />
        <Route path="/generate" element={<GenerateWorkoutPage />} />
        <Route path="/saved" element={<SavedWorkoutPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}
export default App;
