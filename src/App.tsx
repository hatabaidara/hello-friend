import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Biographie from "./pages/Biographie";
import Actions from "./pages/Actions";
import Galerie from "./pages/Galerie";
import Actualites from "./pages/Actualites";
import Partenaires from "./pages/Partenaires";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Confidentialite from "./pages/Confidentialite";
import NotFound from "./pages/NotFound";
import ArticleDetail from "./pages/ArticleDetail";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: any }) => {
  const auth = localStorage.getItem("auth");
  const user = localStorage.getItem("user");
  if (!auth || !user) return <Navigate to="/auth" replace />;
  const parsed = JSON.parse(user);
  if (parsed.role !== "ADMIN") return <Navigate to="/" replace />;
  return children;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/biographie" element={<Biographie />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/partenaires" element={<Partenaires />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/actualites/:id" element={<ArticleDetail />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
