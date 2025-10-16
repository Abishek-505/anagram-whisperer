import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Gamepad2, RefreshCw } from 'lucide-react';
import { getRandomWord, scrambleWord } from '@/lib/dictionary';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const WordGame = () => {
  const [originalWord, setOriginalWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const startNewGame = () => {
    const word = getRandomWord();
    setOriginalWord(word);
    setScrambled(scrambleWord(word));
    setGuess('');
    setAttempts(3);
    setGameOver(false);
    setWon(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const checkGuess = () => {
    if (!guess) return;

    if (guess.toLowerCase() === originalWord.toLowerCase()) {
      setWon(true);
      setGameOver(true);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      
      if (newAttempts === 0) {
        setGameOver(true);
      } else {
        setGuess('');
      }
    }
  };

  const progressValue = (attempts / 3) * 100;

  return (
    <ToolLayout
      title="Word Scramble Game"
      description="Unscramble the letters to find the hidden word!"
      icon={Gamepad2}
    >
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">Scrambled Word:</p>
            <p className="text-4xl font-bold tracking-wider text-primary">{scrambled}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Attempts Remaining</Label>
              <span className="font-bold text-primary">{attempts}/3</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        </div>

        {!gameOver ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="guess">Your Guess</Label>
              <Input
                id="guess"
                placeholder="Enter your guess"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkGuess()}
                disabled={gameOver}
              />
            </div>

            <Button onClick={checkGuess} className="w-full gradient-primary text-white shadow-elegant">
              Submit Guess
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert className={won ? 'border-primary bg-primary/5' : 'border-destructive bg-destructive/5'}>
              <AlertDescription className="text-center">
                {won ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">🎉 Correct!</p>
                    <p className="text-lg">The word was: <span className="font-semibold">{originalWord}</span></p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-destructive">Game Over!</p>
                    <p className="text-lg">The word was: <span className="font-semibold">{originalWord}</span></p>
                  </div>
                )}
              </AlertDescription>
            </Alert>

            <Button onClick={startNewGame} className="w-full gradient-primary text-white shadow-elegant">
              <RefreshCw className="h-4 w-4 mr-2" />
              Play Again
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default WordGame;
