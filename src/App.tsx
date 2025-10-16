import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AnagramPairs from "./pages/AnagramPairs";
import FindAnagrams from "./pages/FindAnagrams";
import GroupAnagrams from "./pages/GroupAnagrams";
import Autocorrect from "./pages/Autocorrect";
import Palindrome from "./pages/Palindrome";
import WordStats from "./pages/WordStats";
import PatternSearch from "./pages/PatternSearch";
import RhymingWords from "./pages/RhymingWords";
import CountCharacter from "./pages/CountCharacter";
import WordGame from "./pages/WordGame";
import CompareWords from "./pages/CompareWords";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/anagram-pairs" element={<AnagramPairs />} />
              <Route path="/find-anagrams" element={<FindAnagrams />} />
              <Route path="/group-anagrams" element={<GroupAnagrams />} />
              <Route path="/autocorrect" element={<Autocorrect />} />
              <Route path="/palindrome" element={<Palindrome />} />
              <Route path="/word-stats" element={<WordStats />} />
              <Route path="/pattern-search" element={<PatternSearch />} />
              <Route path="/rhyming-words" element={<RhymingWords />} />
              <Route path="/count-character" element={<CountCharacter />} />
              <Route path="/word-game" element={<WordGame />} />
              <Route path="/compare-words" element={<CompareWords />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
