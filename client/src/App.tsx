import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/check" component={PathwayForm} />
      <Route path="/results/:id" component={Results} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/sample-report" component={SampleReport} />
      <Route path="/faq" component={FAQ} />
      <Route path="/about" component={About} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/resources" component={Resources} />
      <Route path="/contact" component={Contact} />
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
