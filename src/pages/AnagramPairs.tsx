import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shuffle } from 'lucide-react';
import { isAnagram } from '@/lib/dictionary';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AnagramPairs = () => {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [result, setResult] = useState<{ isAnagram: boolean; message: string } | null>(null);

  const checkAnagrams = () => {
    if (!word1 || !word2) {
      setResult({ isAnagram: false, message: 'Please enter both words' });
      return;
    }

    const areAnagrams = isAnagram(word1, word2);
    
    if (word1.toLowerCase() === word2.toLowerCase()) {
      setResult({ isAnagram: false, message: 'Words are identical, not anagrams' });
    } else if (areAnagrams) {
      setResult({ isAnagram: true, message: `✓ "${word1}" and "${word2}" are anagrams!` });
    } else {
      setResult({ isAnagram: false, message: `✗ "${word1}" and "${word2}" are NOT anagrams` });
    }
  };

  return (
    <ToolLayout
      title="Anagram Pairs"
      description="Check if two words are anagrams of each other"
      icon={Shuffle}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="word1">First Word</Label>
            <Input
              id="word1"
              placeholder="Enter first word"
              value={word1}
              onChange={(e) => setWord1(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnagrams()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="word2">Second Word</Label>
            <Input
              id="word2"
              placeholder="Enter second word"
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnagrams()}
            />
          </div>
        </div>

        <Button onClick={checkAnagrams} className="w-full gradient-primary text-white shadow-elegant">
          Check Anagrams
        </Button>

        {result && (
          <Alert className={result.isAnagram ? 'border-primary bg-primary/5' : 'border-muted'}>
            <AlertDescription className={result.isAnagram ? 'text-primary font-semibold' : ''}>
              {result.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </ToolLayout>
  );
};

export default AnagramPairs;
