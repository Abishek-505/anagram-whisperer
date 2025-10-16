import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tools = [
    { name: 'Anagram Pairs', path: '/anagram-pairs' },
    { name: 'Find Anagrams', path: '/find-anagrams' },
    { name: 'Group Anagrams', path: '/group-anagrams' },
    { name: 'Autocorrect', path: '/autocorrect' },
    { name: 'Palindrome', path: '/palindrome' },
    { name: 'Word Stats', path: '/word-stats' },
    { name: 'Pattern Search', path: '/pattern-search' },
    { name: 'Rhyming Words', path: '/rhyming-words' },
    { name: 'Count Character', path: '/count-character' },
    { name: 'Word Game', path: '/word-game' },
    { name: 'Compare Words', path: '/compare-words' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Sparkles className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LexicalSpark
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover z-[100]">
                {tools.map((tool) => (
                  <DropdownMenuItem key={tool.path} asChild>
                    <Link to={tool.path} className="cursor-pointer">
                      {tool.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, <span className="font-semibold text-primary">{user.username}</span>
                </span>
                <Button 
                  onClick={logout} 
                  variant="outline"
                  size="sm"
                  className="hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="gradient-primary text-white shadow-elegant">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="px-4 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tool.name}
                </Link>
              ))}
              
              {user ? (
                <Button onClick={logout} variant="outline" className="mt-2">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <div className="flex flex-col space-y-2 mt-2">
                  <Button asChild variant="ghost">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="gradient-primary text-white">
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
