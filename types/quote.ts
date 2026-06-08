import type { CategoryId } from '@/data/categories';

export interface Quote {
  id: number;
  text: string;
  author: string;
  source?: string;
  category?: CategoryId;
}

export interface FavoriteStore {
  favoriteIds: number[];
}

export interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  isRead?: boolean;
  onToggleFavorite: (id: number) => void;
  onCardClick?: (id: number) => void;
}

export interface QuoteDisplayProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onShare: () => void;
  // 목록 페이지로 이동하는 핸들러 (선택적: 없으면 Link 컴포넌트 사용)
  onNavigateToList?: () => void;
}
