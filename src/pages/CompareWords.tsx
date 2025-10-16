import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeftRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CompareWords = () => {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const compareWords = () => {
    if (!word1 || !word2) {
      setResult('Please enter both words');
      return;
    }

    const comparison = word1.localeCompare(word2);
    
    if (comparison === 0) {
      setResult(`Both words are equal: "${word1}" = "${word2}"`);
    } else if (comparison < 0) {
      setResult(`"${word1}" comes before "${word2}" alphabetically (lexicographically smaller)`);
    } else {
      setResult(`"${word1}" comes after "${word2}" alphabetically (lexicographically greater)`);
    }
  };

  return (
    <ToolLayout
      title="Compare Words"
      description="Compare two words lexicographically (alphabetical order)"
      icon={ArrowLeftRight}
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
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="word2">Second Word</Label>
            <Input
              id="word2"
              placeholder="Enter second word"
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && compareWords()}
            />
          </div>
        </div>

        <Button onClick={compareWords} className="w-full gradient-primary text-white shadow-elegant">
          Compare Words
        </Button>

        {result && (
          <Alert className="border-primary bg-primary/5">
            <AlertDescription className="text-center text-lg">
              {result}
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
          <h3 className="font-semibold mb-2">How Lexicographic Comparison Works:</h3>
          <p className="text-sm text-muted-foreground">
            Words are compared letter by letter, similar to dictionary ordering. 
            For example: "apple" &lt; "banana" because 'a' comes before 'b'.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CompareWords;
