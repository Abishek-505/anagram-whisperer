import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Music } from 'lucide-react';
import { findRhymingWords } from '@/lib/dictionary';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const RhymingWords = () => {
  const [suffix, setSuffix] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);

  const search = () => {
    if (!suffix) return;
    
    const matches = findRhymingWords(suffix).slice(0, 100); // Limit to 100 results
    setResults(matches);
    setSearched(true);
  };

  return (
    <ToolLayout
      title="Rhyming Words Finder"
      description="Discover words that end with the same letters (potential rhymes)"
      icon={Music}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="suffix">Enter Ending/Suffix</Label>
          <Input
            id="suffix"
            placeholder="e.g., ing, tion, at, ay"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
          />
        </div>

        <Button onClick={search} className="w-full gradient-primary text-white shadow-elegant">
          Find Rhyming Words
        </Button>

        {searched && (
          <div className="space-y-3">
            {results.length > 0 ? (
              <>
                <Alert className="border-primary bg-primary/5">
                  <AlertDescription className="text-primary font-semibold">
                    Found {results.length}+ words ending with "{suffix}"
                  </AlertDescription>
                </Alert>
                <div className="max-h-96 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {results.map((word, index) => (
                      <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Alert>
                <AlertDescription>
                  No words found ending with "{suffix}"
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
          <h3 className="font-semibold mb-2">Example Searches:</h3>
          <p className="text-sm text-muted-foreground">
            Try: "ay" (day, say, play), "at" (cat, hat, mat), "ing" (running, walking)
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RhymingWords;
