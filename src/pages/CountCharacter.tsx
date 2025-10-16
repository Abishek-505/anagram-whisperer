import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Hash } from 'lucide-react';
import { countCharacter } from '@/lib/dictionary';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CountCharacter = () => {
  const [word, setWord] = useState('');
  const [character, setCharacter] = useState('');
  const [count, setCount] = useState<number | null>(null);
  const [searched, setSearched] = useState(false);

  const performCount = () => {
    if (!word || !character) {
      setSearched(false);
      return;
    }
    
    const result = countCharacter(word, character[0]);
    setCount(result);
    setSearched(true);
  };

  return (
    <ToolLayout
      title="Count Specific Character"
      description="Count how many times a letter appears in a word"
      icon={Hash}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="word">Enter a Word</Label>
          <Input
            id="word"
            placeholder="Enter word to analyze"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="character">Character to Count</Label>
          <Input
            id="character"
            placeholder="Enter a single character"
            value={character}
            onChange={(e) => setCharacter(e.target.value.slice(0, 1))}
            maxLength={1}
            onKeyDown={(e) => e.key === 'Enter' && performCount()}
          />
        </div>

        <Button onClick={performCount} className="w-full gradient-primary text-white shadow-elegant">
          Count Character
        </Button>

        {searched && count !== null && (
          <Alert className="border-primary bg-primary/5">
            <AlertDescription className="text-center">
              <div className="space-y-2">
                <p className="text-lg">
                  The character <span className="text-2xl font-bold text-primary">'{character}'</span> appears
                </p>
                <p className="text-4xl font-bold text-primary">{count}</p>
                <p className="text-lg">
                  {count === 1 ? 'time' : 'times'} in <span className="font-semibold">"{word}"</span>
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </ToolLayout>
  );
};

export default CountCharacter;
