"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { useProductPage } from "./product-page-context";
import { useWishlist } from "./wishlist-provider";

interface StickyCartBarProps {
  product: Product;
}

export function StickyCartBar({ product }: StickyCartBarProps) {
  const { selectedSize, handleAddToCart } = useProductPage();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [visible, setVisible] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const firstColor = product.colors[0];
  const imageSrc = firstColor.image.startsWith("/images/") ? firstColor.image : null;

  useEffect(() => {
    const target = document.getElementById("main-add-to-cart");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      role="complementary"
      aria-label="Sticky add to cart"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      className={[
        "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#EBEBEB] shadow-[0_-2px_12px_rgba(0,0,0,0.08)]",
        "transition-transform",
        visible
          ? "translate-y-0 duration-200 ease-out"
          : "translate-y-full duration-150 ease-in pointer-events-none",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Thumbnail */}
        <div className="w-10 h-10 shrink-0 overflow-hidden rounded bg-[#F8F8F6]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ backgroundColor: firstColor.hex + "44" }}
            />
          )}
        </div>

        {/* Name + price */}
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium truncate leading-tight">{product.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium">{product.price} zł</span>
            {product.originalPrice && (
              <span className="text-[11px] text-warm-gray line-through">
                {product.originalPrice} zł
              </span>
            )}
          </div>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          className="p-2 shrink-0"
        >
          <Heart
            className="w-5 h-5"
            fill={wishlisted ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        </button>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className="shrink-0 px-5 py-2.5 bg-charcoal text-white text-[11px] font-medium uppercase tracking-[0.6px] rounded-full hover:bg-charcoal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {selectedSize ? "Dodaj do koszyka" : "Wybierz rozmiar"}
        </button>
      </div>
    </div>
  );
}
