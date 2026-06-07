import { redirect } from 'next/navigation';

export default async function TodayPage({
  searchParams,
}: {
  searchParams: Promise<{ quoteId?: string }>;
}) {
  const { quoteId } = await searchParams;
  redirect(quoteId ? `/quotes?quoteId=${quoteId}` : '/quotes');
}
