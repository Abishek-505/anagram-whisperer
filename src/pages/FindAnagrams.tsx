import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { findAnagrams } from '@/lib/dictionary';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const FindAnagrams = () => {
  const [word, setWord] = useState('');
  const [anagrams, setAnagrams] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);

  const searchAnagrams = () => {
    if (!word) return;
    
    const results = findAnagrams(word);
    setAnagrams(results);
    setSearched(true);
  };

  return (
    <ToolLayout
      title="Find Meaningful Anagrams"
      description="Discover all dictionary words that are anagrams of your word"
      icon={Sparkles}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="word">Enter a Word</Label>
          <Input
            id="word"
            placeholder="e.g., listen, silent, etc."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchAnagrams()}
          />
        </div>

        <Button onClick={searchAnagrams} className="w-full gradient-primary text-white shadow-elegant">
          Find Anagrams
        </Button>

        {searched && (
          <div className="space-y-3">
            {anagrams.length > 0 ? (
              <>
                <Alert className="border-primary bg-primary/5">
                  <AlertDescription className="text-primary font-semibold">
                    Found {anagrams.length} anagram{anagrams.length !== 1 ? 's' : ''} for "{word}"
                  </AlertDescription>
                </Alert>
                <div className="flex flex-wrap gap-2">
                  {anagrams.map((anagram, index) => (
                    <Badge key={index} variant="secondary" className="text-base px-4 py-2">
                      {anagram}
                    </Badge>
                  ))}
                </div>
              </>
            ) : (
              <Alert>
                <AlertDescription>
                  No anagrams found for "{word}"
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default FindAnagrams;
