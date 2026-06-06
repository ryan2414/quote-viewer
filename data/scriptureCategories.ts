import type { ScriptureCategory } from '@/types/scripture';

export interface ScriptureCategoryMeta {
  id: ScriptureCategory;
  label: string;
  badgeClass: string;
}

export const scriptureCategories: ScriptureCategoryMeta[] = [
  {
    id: 'faith',
    label: '믿음',
    badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
  {
    id: 'hope',
    label: '소망',
    badgeClass: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  },
  {
    id: 'love',
    label: '사랑',
    badgeClass: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  },
  {
    id: 'comfort',
    label: '위로',
    badgeClass: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  },
  {
    id: 'wisdom',
    label: '지혜',
    badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    id: 'thanksgiving',
    label: '감사',
    badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  },
];

export function getScriptureCategoryMeta(id?: string): ScriptureCategoryMeta | undefined {
  if (!id) return undefined;
  return scriptureCategories.find((c) => c.id === id);
}
