import { HeroCarousel } from "@/components/sections/hero-carousel";
import { CategoryRow } from "@/components/sections/category-row";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { FeatureStory } from "@/components/sections/feature-story";
import { PromoTiles } from "@/components/sections/promo-tiles";
import { ValueProps } from "@/components/sections/value-props";
import { TrustBar } from "@/components/trust-bar";
import { RecentlyViewedHome } from "@/components/recently-viewed-home";

export default function HomePage() {
  return (
    <main>
      <TrustBar />
      <HeroCarousel />
      <CategoryRow />
      <ProductCarousel />
      <FeatureStory />
      <PromoTiles />
      <ValueProps />
      <RecentlyViewedHome />
    </main>
  );
}
