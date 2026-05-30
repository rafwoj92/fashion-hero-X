"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Product, ProductColor } from "@/types";
import { useCart } from "./cart-provider";

interface ProductPageContextValue {
  selectedColor: ProductColor;
  selectedSize: number | null;
  setSelectedColor: (c: ProductColor) => void;
  setSelectedSize: (s: number | null) => void;
  handleAddToCart: () => void;
}

const ProductPageContext = createContext<ProductPageContextValue | null>(null);

export function ProductPageProvider({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) return;
    addItem(product, selectedColor, selectedSize);
  }, [product, selectedColor, selectedSize, addItem]);

  return (
    <ProductPageContext.Provider
      value={{ selectedColor, selectedSize, setSelectedColor, setSelectedSize, handleAddToCart }}
    >
      {children}
    </ProductPageContext.Provider>
  );
}

export function useProductPage() {
  const ctx = useContext(ProductPageContext);
  if (!ctx) throw new Error("useProductPage must be used inside ProductPageProvider");
  return ctx;
}
