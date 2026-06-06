export type ScriptureCategory =
  | 'faith'
  | 'hope'
  | 'love'
  | 'comfort'
  | 'wisdom'
  | 'thanksgiving';

export interface Scripture {
  id: number;
  text: string;
  text_en: string;
  book: string;
  book_en: string;
  chapter: number;
  verse: number;
  verseEnd?: number;
  category: ScriptureCategory;
}

export interface ScriptureCardProps {
  scripture: Scripture;
}

export interface ScriptureDisplayProps {
  scripture: Scripture;
  onShare: () => void;
}
