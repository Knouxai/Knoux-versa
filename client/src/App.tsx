import React from "react";
import { Router, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { AIServiceProvider } from "./components/providers/AIServiceProvider";
import { LanguageProvider } from "./components/LanguageProvider";

// Pages
import Home from "./pages/Home";
import EnhancedHome from "./pages/EnhancedHome";
import About from "./pages/About";
import Builder from "./pages/Builder";
import ElysianGallery from "./pages/ElysianGallery";
import NotFound from "./pages/not-found";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AIServiceProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Router>
              <Switch>
                {/* Main Routes */}
                <Route path="/" component={EnhancedHome} />
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/builder" component={Builder} />

                {/* Elysian Canvas Gallery */}
                <Route path="/elysian" component={ElysianGallery} />
                <Route path="/gallery" component={ElysianGallery} />
                <Route path="/elysian-canvas" component={ElysianGallery} />

                {/* Fallback */}
                <Route component={NotFound} />
              </Switch>
            </Router>

            <Toaster />
          </div>
        </AIServiceProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
