import FeatureCard from '@/components/FeatureCard';
import { Sparkles, Shuffle, CheckCircle2, Grid3x3, Wand2, RotateCcw, BarChart3, Search, Music, Hash, Gamepad2, ArrowLeftRight } from 'lucide-react';
import { useEffect } from 'react';
import { loadDictionary } from '@/lib/dictionary';

const Home = () => {
  useEffect(() => {
    loadDictionary();
  }, []);

  const features = [
    {
      title: 'Anagram Pairs',
      description: 'Check if two words are anagrams of each other',
      icon: Shuffle,
      path: '/anagram-pairs'
    },
    {
      title: 'Find Anagrams',
      description: 'Discover all meaningful anagrams for any word',
      icon: Sparkles,
      path: '/find-anagrams'
    },
    {
      title: 'Group Anagrams',
      description: 'Organize multiple words into anagram groups',
      icon: Grid3x3,
      path: '/group-anagrams'
    },
    {
      title: 'Autocorrect',
      description: 'Get smart word suggestions and spelling corrections',
      icon: Wand2,
      path: '/autocorrect'
    },
    {
      title: 'Palindrome Checker',
      description: 'Verify if a word reads the same forwards and backwards',
      icon: RotateCcw,
      path: '/palindrome'
    },
    {
      title: 'Word Statistics',
      description: 'Analyze vowels, consonants, and word length',
      icon: BarChart3,
      path: '/word-stats'
    },
    {
      title: 'Pattern Search',
      description: 'Find words matching specific letter patterns',
      icon: Search,
      path: '/pattern-search'
    },
    {
      title: 'Rhyming Words',
      description: 'Discover words with matching endings',
      icon: Music,
      path: '/rhyming-words'
    },
    {
      title: 'Count Character',
      description: 'Count occurrences of specific letters in words',
      icon: Hash,
      path: '/count-character'
    },
    {
      title: 'Word Game',
      description: 'Unscramble words in this fun challenge',
      icon: Gamepad2,
      path: '/word-game'
    },
    {
      title: 'Compare Words',
      description: 'Compare two words lexicographically',
      icon: ArrowLeftRight,
      path: '/compare-words'
    },
  ];

  return (
    <div className="min-h-screen gradient-hero">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-6 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
            Welcome to LexicalSpark
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Your complete toolkit for word analysis, anagram discovery, and language exploration
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-5 w-5 text-primary animate-float" />
            <span>84,000+ words in dictionary</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={feature.path} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>All tools are powered by a comprehensive English dictionary</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
