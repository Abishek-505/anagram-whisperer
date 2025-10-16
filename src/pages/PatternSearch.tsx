import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { searchPattern } from '@/lib/dictionary';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const PatternSearch = () => {
  const [pattern, setPattern] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);

  const search = () => {
    if (!pattern) return;
    
    const matches = searchPattern(pattern).slice(0, 100); // Limit to 100 results
    setResults(matches);
    setSearched(true);
  };

  return (
    <ToolLayout
      title="Pattern Search"
      description="Find all words containing a specific letter pattern or substring"
      icon={Search}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pattern">Enter Pattern to Search</Label>
          <Input
            id="pattern"
            placeholder="e.g., tion, ing, qu, etc."
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
          />
        </div>

        <Button onClick={search} className="w-full gradient-primary text-white shadow-elegant">
          Search Pattern
        </Button>

        {searched && (
          <div className="space-y-3">
            {results.length > 0 ? (
              <>
                <Alert className="border-primary bg-primary/5">
                  <AlertDescription className="text-primary font-semibold">
                    Found {results.length}+ words matching "{pattern}"
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
                  No words found containing "{pattern}"
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PatternSearch;
