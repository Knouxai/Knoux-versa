import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/LanguageProvider";
import EnhancedHome from "@/pages/EnhancedHome";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Builder from "@/pages/Builder";
import NotFound from "@/pages/not-found";
import MyComponent from "@/components/MyComponent";
import BuilderHero from "@/components/BuilderHero";
import SimpleBuilderComponent from "@/components/SimpleBuilderComponent";
import ResearchShowcase from "@/components/ResearchShowcase";

function Router() {
  return (
    <Switch>
      <Route path="/" component={EnhancedHome} />
      <Route path="/classic" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/builder" component={Builder} />
      <Route path="/component" component={MyComponent} />
      <Route path="/research" component={ResearchShowcase} />
      <Route path="/simple" component={SimpleBuilderComponent} />
      <Route path="/hero" component={() => <BuilderHero />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
