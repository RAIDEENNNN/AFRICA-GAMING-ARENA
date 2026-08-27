import { MarketplaceCategoryView } from "../../category-view";
import { marketplaceCategories } from "../../categories";

export function generateStaticParams() {
  return marketplaceCategories.map((category) => ({ category: category.slug }));
}

export default async function MarketplaceCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <MarketplaceCategoryView slug={category} />;
}
