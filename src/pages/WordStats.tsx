import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BarChart3 } from 'lucide-react';
import { getWordStats } from '@/lib/dictionary';
import { Card, CardContent } from '@/components/ui/card';

const WordStats = () => {
  const [word, setWord] = useState('');
  const [stats, setStats] = useState<{ length: number; vowels: number; consonants: number } | null>(null);

  const analyzeWord = () => {
    if (!word) return;
    
    const results = getWordStats(word);
    setStats(results);
  };

  return (
    <ToolLayout
      title="Word Statistics"
      description="Analyze vowels, consonants, and word length"
      icon={BarChart3}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="word">Enter a Word</Label>
          <Input
            id="word"
            placeholder="Enter any word to analyze"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && analyzeWord()}
          />
        </div>

        <Button onClick={analyzeWord} className="w-full gradient-primary text-white shadow-elegant">
          Analyze Word
        </Button>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="border-2 border-primary/20 shadow-elegant">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stats.length}</div>
                <div className="text-sm text-muted-foreground">Total Letters</div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-accent/20 shadow-elegant">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-accent mb-2">{stats.vowels}</div>
                <div className="text-sm text-muted-foreground">Vowels (a,e,i,o,u)</div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-secondary/50 shadow-elegant">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-foreground mb-2">{stats.consonants}</div>
                <div className="text-sm text-muted-foreground">Consonants</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default WordStats;
