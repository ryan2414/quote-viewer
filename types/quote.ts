export interface Quote {
  id: number;
  text: string;
  author: string;
  source?: string;
  category?: string;
}

export interface FavoriteStore {
  favoriteIds: number[];
}

export interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export interface QuoteDisplayProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onShare: () => void;
}
