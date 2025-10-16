let dictionaryWords: string[] = [];
let isLoaded = false;

export const loadDictionary = async (): Promise<string[]> => {
  if (isLoaded) return dictionaryWords;
  
  try {
    const response = await fetch('/dictionary.txt');
    const text = await response.text();
    dictionaryWords = text
      .split('\n')
      .map(word => word.trim().toLowerCase())
      .filter(word => word.length > 0 && /^[a-z]+$/.test(word));
    
    isLoaded = true;
    console.log(`Loaded ${dictionaryWords.length} words from dictionary`);
    return dictionaryWords;
  } catch (error) {
    console.error('Error loading dictionary:', error);
    return [];
  }
};

export const getDictionary = (): string[] => dictionaryWords;

export const isAnagram = (str1: string, str2: string): boolean => {
  if (str1.length !== str2.length) return false;
  
  const sorted1 = str1.toLowerCase().split('').sort().join('');
  const sorted2 = str2.toLowerCase().split('').sort().join('');
  
  return sorted1 === sorted2;
};

export const findAnagrams = (word: string): string[] => {
  const dict = getDictionary();
  const lowerWord = word.toLowerCase();
  
  return dict.filter(dictWord => 
    dictWord !== lowerWord && isAnagram(lowerWord, dictWord)
  );
};

export const editDistance = (a: string, b: string): number => {
  const len1 = a.length;
  const len2 = b.length;
  const dp: number[][] = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  for (let j = 0; j <= len2; j++) dp[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  
  return dp[len1][len2];
};

export const findClosestWord = (word: string): { word: string; distance: number } | null => {
  const dict = getDictionary();
  let bestWord = '';
  let bestDistance = Infinity;

  for (const dictWord of dict) {
    const dist = editDistance(word, dictWord);
    if (dist < bestDistance) {
      bestDistance = dist;
      bestWord = dictWord;
    }
  }

  return bestWord ? { word: bestWord, distance: bestDistance } : null;
};

export const isPalindrome = (word: string): boolean => {
  const clean = word.toLowerCase();
  return clean === clean.split('').reverse().join('');
};

export const getWordStats = (word: string) => {
  const vowels = word.toLowerCase().match(/[aeiou]/g)?.length || 0;
  const consonants = word.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/g)?.length || 0;
  
  return {
    length: word.length,
    vowels,
    consonants
  };
};

export const searchPattern = (pattern: string): string[] => {
  const dict = getDictionary();
  const lowerPattern = pattern.toLowerCase();
  
  return dict.filter(word => word.includes(lowerPattern));
};

export const findRhymingWords = (suffix: string): string[] => {
  const dict = getDictionary();
  const lowerSuffix = suffix.toLowerCase();
  
  return dict.filter(word => 
    word.length >= lowerSuffix.length && 
    word.endsWith(lowerSuffix)
  );
};

export const countCharacter = (word: string, char: string): number => {
  const lowerWord = word.toLowerCase();
  const lowerChar = char.toLowerCase();
  
  return lowerWord.split('').filter(c => c === lowerChar).length;
};

export const getRandomWord = (): string => {
  const dict = getDictionary();
  const longWords = dict.filter(w => w.length > 3);
  return longWords[Math.floor(Math.random() * longWords.length)] || 'word';
};

export const scrambleWord = (word: string): string => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
};

export const groupAnagrams = (words: string[]): string[][] => {
  const groups = new Map<string, string[]>();
  
  words.forEach(word => {
    const key = word.toLowerCase().split('').sort().join('');
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(word);
  });
  
  return Array.from(groups.values()).filter(group => group.length > 0);
};
