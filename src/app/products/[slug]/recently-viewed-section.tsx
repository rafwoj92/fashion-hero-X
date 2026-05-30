"use client";

import { useEffect } from "react";
import type { Product } from "@/types";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { RecentlyViewed } from "@/components/recently-viewed";

interface Props {
  product: Product;
}

export function RecentlyViewedSection({ product }: Props) {
  const { addItem } = useRecentlyViewed();

  useEffect(() => {
    const firstColor = product.colors[0];
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: firstColor?.image ?? "",
      slug: product.slug,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return <RecentlyViewed currentProductId={product.id} />;
}
