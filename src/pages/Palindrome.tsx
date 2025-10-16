import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RotateCcw } from 'lucide-react';
import { isPalindrome } from '@/lib/dictionary';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Palindrome = () => {
  const [word, setWord] = useState('');
  const [result, setResult] = useState<{ isPalindrome: boolean; message: string } | null>(null);

  const checkPalindrome = () => {
    if (!word) {
      setResult({ isPalindrome: false, message: 'Please enter a word' });
      return;
    }

    const palindrome = isPalindrome(word);
    
    if (palindrome) {
      setResult({ 
        isPalindrome: true, 
        message: `✓ "${word}" is a palindrome! It reads the same forwards and backwards.` 
      });
    } else {
      setResult({ 
        isPalindrome: false, 
        message: `✗ "${word}" is NOT a palindrome.` 
      });
    }
  };

  return (
    <ToolLayout
      title="Palindrome Checker"
      description="Check if a word reads the same forwards and backwards"
      icon={RotateCcw}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="word">Enter a Word</Label>
          <Input
            id="word"
            placeholder="e.g., racecar, level, noon"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkPalindrome()}
          />
        </div>

        <Button onClick={checkPalindrome} className="w-full gradient-primary text-white shadow-elegant">
          Check Palindrome
        </Button>

        {result && (
          <Alert className={result.isPalindrome ? 'border-primary bg-primary/5' : 'border-muted'}>
            <AlertDescription className={result.isPalindrome ? 'text-primary font-semibold' : ''}>
              {result.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
          <h3 className="font-semibold mb-2">Examples of Palindromes:</h3>
          <p className="text-sm text-muted-foreground">
            racecar, level, noon, radar, kayak, madam, civic, refer
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default Palindrome;
