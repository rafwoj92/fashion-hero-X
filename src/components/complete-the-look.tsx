"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { looks } from "@/data/looks";
import { products as allProducts } from "@/data/products";
import type { Product } from "@/types";
import { useCart } from "@/components/cart-provider";

interface CompleteTheLookProps {
  currentProduct: Product;
}

export function CompleteTheLook({ currentProduct }: CompleteTheLookProps) {
  const { addItem } = useCart();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [added, setAdded] = useState(false);

  const relatedIds = looks[currentProduct.id];
  if (!relatedIds) return null;

  const related = relatedIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  if (related.length === 0) return null;

  const isChecked = (id: string) => checked[id] !== false; // default: checked

  const total =
    currentProduct.price +
    related.filter((p) => isChecked(p.id)).reduce((sum, p) => sum + p.price, 0);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: prev[id] === false ? true : false }));
  }

  function handleAddAll() {
    const toAdd = related.filter((p) => isChecked(p.id));
    toAdd.forEach((p) => {
      addItem(p, p.colors[0], p.sizes[0]);
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const firstImage = (p: Product) => p.colors[0]?.image ?? "";

  return (
    <section className="py-10 border-t border-border">
      <h2 className="text-lg font-medium text-charcoal mb-6">Kompletuj look</h2>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8">
        {/* Left: product images grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Main product — spans both rows */}
          <div className="row-span-2 overflow-hidden bg-[#F8F8F6] aspect-[3/4]">
            <Image
              src={firstImage(currentProduct)}
              alt={currentProduct.name}
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Related product images stacked */}
          {related.slice(0, 2).map((p) => (
            <div key={p.id} className="overflow-hidden bg-[#F8F8F6] aspect-square">
              <Image
                src={firstImage(p)}
                alt={p.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Right: product list */}
        <div className="flex flex-col gap-5">
          {/* Current product row */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 shrink-0 overflow-hidden bg-[#F8F8F6] rounded-sm">
              <Image
                src={firstImage(currentProduct)}
                alt={currentProduct.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium truncate">{currentProduct.name}</p>
              <p className="text-[11px] text-warm-gray">{currentProduct.price} zł</p>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-warm-gray shrink-0">
              Ten produkt
            </span>
          </div>

          {/* Related product rows */}
          {related.map((p) => (
            <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isChecked(p.id)}
                onChange={() => toggle(p.id)}
                className="accent-charcoal w-4 h-4 shrink-0"
              />
              <div className="w-12 h-12 shrink-0 overflow-hidden bg-[#F8F8F6] rounded-sm">
                <Image
                  src={firstImage(p)}
                  alt={p.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${p.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[12px] font-medium truncate block hover:underline"
                >
                  {p.name}
                </Link>
                <p className="text-[11px] text-warm-gray">{p.price} zł</p>
              </div>
            </label>
          ))}

          {/* Divider + total */}
          <div className="border-t border-border pt-4 flex items-center justify-between">
            <span className="text-[12px] text-warm-gray">Razem</span>
            <span className="text-[14px] font-medium">{total} zł</span>
          </div>

          {/* CTA */}
          <button
            onClick={handleAddAll}
            disabled={related.every((p) => !isChecked(p.id))}
            className="w-full py-3 bg-charcoal text-white text-[12px] font-medium uppercase tracking-[0.6px] rounded-full hover:bg-charcoal/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {added ? "Dodano! →" : "Dodaj zaznaczone do koszyka"}
          </button>
        </div>
      </div>
    </section>
  );
}
