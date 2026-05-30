"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./announcement-bar";
import { Header } from "./header";
import { Footer } from "./footer";
import { ExitIntentModal } from "./exit-intent-modal";
import { CartProvider, useCart } from "./cart-provider";
import { WishlistProvider, useWishlist } from "./wishlist-provider";
import { QuickViewProvider } from "./quick-view-provider";
import { AuthProvider } from "./auth-provider";

const EXCLUDED_PATHS = ["/cart", "/checkout"];

function ShellInner({ children }: { children: React.ReactNode }) {
  const { openCart, itemCount } = useCart();
  const { wishlistItems } = useWishlist();
  const pathname = usePathname();
  const showExitIntent = !EXCLUDED_PATHS.some((p) => pathname.startsWith(p));

  return (
    <>
      <AnnouncementBar />
      <Header onCartOpen={openCart} cartCount={itemCount} wishlistCount={wishlistItems.length} />
      <main className="flex-1">{children}</main>
      <Footer />
      {showExitIntent && <ExitIntentModal />}
    </>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <QuickViewProvider>
            <ShellInner>{children}</ShellInner>
          </QuickViewProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
