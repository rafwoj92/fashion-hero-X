"use client";

import Link from "next/link";
import Image from "next/image";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

export function RecentlyViewedHome() {
  const { items } = useRecentlyViewed();

  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-lg font-medium text-charcoal mb-5">Ostatnio oglądane</h2>

      {/* Mobile: horizontal scroll | Desktop: 4-col grid */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide md:overflow-visible md:grid md:grid-cols-4 lg:grid-cols-8 snap-x snap-mandatory md:snap-none">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.slug}`}
            className="flex-shrink-0 snap-start flex flex-col items-center gap-1.5 group w-24 md:w-auto"
          >
            <div className="w-20 h-20 overflow-hidden rounded bg-[#F8F8F6] shrink-0">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-[#EBEBEB]" />
              )}
            </div>
            <p className="text-[11px] font-medium text-charcoal truncate w-full text-center leading-tight">
              {item.name}
            </p>
            <p className="text-[11px] text-warm-gray">{item.price} zł</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
