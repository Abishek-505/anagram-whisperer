import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Grid3x3 } from 'lucide-react';
import { groupAnagrams } from '@/lib/dictionary';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

const GroupAnagrams = () => {
  const [input, setInput] = useState('');
  const [groups, setGroups] = useState<string[][]>([]);
  const [searched, setSearched] = useState(false);

  const findGroups = () => {
    if (!input.trim()) return;
    
    const words = input.split(/[\s,]+/).filter(w => w.length > 0);
    const results = groupAnagrams(words);
    setGroups(results);
    setSearched(true);
  };

  return (
    <ToolLayout
      title="Group Anagram Sets"
      description="Organize multiple words into anagram groups and count them"
      icon={Grid3x3}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="words">Enter Words (separated by spaces or commas)</Label>
          <Textarea
            id="words"
            placeholder="e.g., listen silent cat act tac ate eat tea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
          />
        </div>

        <Button onClick={findGroups} className="w-full gradient-primary text-white shadow-elegant">
          Group Anagrams
        </Button>

        {searched && (
          <div className="space-y-3">
            {groups.length > 0 ? (
              <>
                <Alert className="border-primary bg-primary/5">
                  <AlertDescription className="text-primary font-semibold">
                    Found {groups.length} anagram group{groups.length !== 1 ? 's' : ''}
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  {groups.map((group, index) => (
                    <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-muted-foreground">Group {index + 1}:</span>
                          <span className="text-lg">{group.join(', ')}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Alert>
                <AlertDescription>
                  No anagram groups found
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default GroupAnagrams;
