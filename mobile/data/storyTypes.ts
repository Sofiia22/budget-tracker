export type AdventStoryContent = {
  day: number;
  book: string;
  theme: string;
  title: string;
  reference: string;
  keyVerse: string;

  story: readonly string[];

  christConnection: {
    title: string;
    paragraphs: readonly string[];
    references: string;
  };

  questions: readonly string[];
  prayer: readonly string[];
  familyChallenge: readonly string[];

  captions: {
    journey: string;
    lamb: string;
  };
};
