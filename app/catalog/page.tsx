import { Suspense } from "react";
import { connection } from "next/server";
import CatalogClient from "@/components/Catalog/Catalog";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchCars } from "@/lib/api/cars";

async function CatalogContent() {
  await connection();

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cars"],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        perPage: 12,
      }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}

export default function CatalogPage() {
  return (
    <main>
      <Suspense fallback={<p>Loading catalog...</p>}>
        <CatalogContent />
      </Suspense>
    </main>
  );
}
