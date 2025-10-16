import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Wand2 } from 'lucide-react';
import { findClosestWord } from '@/lib/dictionary';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Autocorrect = () => {
  const [word, setWord] = useState('');
  const [suggestion, setSuggestion] = useState<{ word: string; distance: number } | null>(null);
  const [searched, setSearched] = useState(false);

  const correctWord = () => {
    if (!word) return;
    
    const result = findClosestWord(word);
    setSuggestion(result);
    setSearched(true);
  };

  return (
    <ToolLayout
      title="Autocorrect Word"
      description="Get smart spelling suggestions using edit distance algorithm"
      icon={Wand2}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="word">Enter a Word to Correct</Label>
          <Input
            id="word"
            placeholder="e.g., wrng, speling, etc."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && correctWord()}
          />
        </div>

        <Button onClick={correctWord} className="w-full gradient-primary text-white shadow-elegant">
          Get Suggestion
        </Button>

        {searched && suggestion && (
          <Alert className={suggestion.distance === 0 ? 'border-primary bg-primary/5' : 'border-accent bg-accent/5'}>
            <AlertDescription>
              {suggestion.distance === 0 ? (
                <span className="text-primary font-semibold">
                  ✓ "{word}" is already correct!
                </span>
              ) : (
                <div className="space-y-2">
                  <p className="font-semibold text-accent">
                    Did you mean: <span className="text-2xl">{suggestion.word}</span>?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Edit distance: {suggestion.distance}
                  </p>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </ToolLayout>
  );
};

export default Autocorrect;
