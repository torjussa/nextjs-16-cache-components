import Categories from "@/components/categories";
import { GallerySkeleton } from "@/components/gallery-skeleton";
import NorwayWinsWCPercentage from "@/components/NorwayWinsWC";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main>
      <h1 className="pt-6 text-foreground text-2xl font-semibold md:text-4xl">
        Categories
      </h1>
      <Suspense fallback={<GallerySkeleton />}>
        <Categories />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="w-48 h-48 justify-self-center" />}
      >
        <NorwayWinsWCPercentage />
      </Suspense>
    </main>
  );
}
