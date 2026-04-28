import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import Overview from "./pages/Overview";
import Generator from "./pages/Generator";
import Factory from "./pages/Factory";
import Hooks from "./pages/Hooks";
import Templates from "./pages/Templates";
import Automation from "./pages/Automation";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/factory" element={<Factory />} />
            <Route path="/hooks" element={<Hooks />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/team" element={<Team />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
