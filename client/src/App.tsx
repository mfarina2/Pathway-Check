import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute, AdminRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PathwayForm from "@/pages/pathway-form";
import Results from "@/pages/results";
import Pricing from "@/pages/pricing";
import SampleReport from "@/pages/sample-report";
import FAQ from "@/pages/faq";
import About from "@/pages/about";
import HowItWorks from "@/pages/how-it-works";
import Resources from "@/pages/resources";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import AdminDashboard from "@/pages/admin";
import CheckoutSuccess from "@/pages/checkout-success";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AuthPage} />
      <Route path="/home" component={Home} />
      <Route path="/check" component={PathwayForm} />
      <Route path="/results/:id" component={Results} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/sample-report" component={SampleReport} />
      <Route path="/faq" component={FAQ} />
      <Route path="/about" component={About} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/resources" component={Resources} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/checkout/success" component={CheckoutSuccess} />
      <Route path="/dashboard">{() => <ProtectedRoute component={Dashboard} />}</Route>
      <Route path="/admin">{() => <AdminRoute component={AdminDashboard} />}</Route>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
