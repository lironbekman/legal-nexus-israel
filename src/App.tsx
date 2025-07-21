
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StagewiseToolbar } from "@stagewise/toolbar-react";
import ReactPlugin from "@stagewise-plugins/react";
import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import CasesPage from "./pages/CasesPage";
import ClientsPage from "./pages/ClientsPage";
import TimeTrackingPage from "./pages/TimeTrackingPage";
import BillingPage from "./pages/BillingPage";
import CalendarPage from "./pages/CalendarPage";
import DocumentsPage from "./pages/DocumentsPage";
import ReportsPage from "./pages/ReportsPage";
import LegalLibraryPage from "./pages/LegalLibraryPage";
import DisabilityCalculatorPage from "./pages/DisabilityCalculatorPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/cases" element={<MainLayout><CasesPage /></MainLayout>} />
          <Route path="/clients" element={<MainLayout><ClientsPage /></MainLayout>} />
          <Route path="/time-tracking" element={<MainLayout><TimeTrackingPage /></MainLayout>} />
          <Route path="/billing" element={<MainLayout><BillingPage /></MainLayout>} />
          <Route path="/calendar" element={<MainLayout><CalendarPage /></MainLayout>} />
          <Route path="/documents" element={<MainLayout><DocumentsPage /></MainLayout>} />
          <Route path="/reports" element={<MainLayout><ReportsPage /></MainLayout>} />
          <Route path="/legal-library" element={<MainLayout><LegalLibraryPage /></MainLayout>} />
          <Route path="/disability-calculator" element={<MainLayout><DisabilityCalculatorPage /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {/* <StagewiseToolbar 
        config={{
          plugins: [ReactPlugin]
        }}
      /> */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
