"use client";

import { useState } from "react";
import {
  useInfiniteQuery,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";

import { fetchCars } from "@/lib/api/cars";
import { fetchFilters } from "@/lib/api/filters";

import CarCard from "@/components/CarCard/CarCard";
import FetchMessage from "@/components/FetchMessage/FetchMessage";
import CarFilter, {
  type CarFilterValues,
} from "@/components/CarFilter/CarFilter";

import styles from "./Catalog.module.css";

export default function CatalogClient() {
  const [filters, setFilters] = useState<CarFilterValues>({});

  const { data: availableFilters } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        perPage: 12,
        filters,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
    <section className={styles.catalog}>
      <CarFilter filters={availableFilters} onSearch={setFilters} />

      <div className={`${styles.contentWrapper} container`}>
        {(isPending || (isFetching && !isFetchingNextPage)) && (
          <div className={styles.overlay}>
            <FetchMessage />
          </div>
        )}

        {isError && <p>Failed to load cars. Please try again.</p>}

        {!isPending && !isError && (
          <>
            {cars.length > 0 ? (
              <ul className={styles.carList}>
                {cars.map((car) => (
                  <li key={car.id}>
                    <CarCard car={car} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyMessage}>No cars found.</p>
            )}
          </>
        )}
      </div>

      {hasNextPage && (
        <button
          className={styles.loadMore}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
}
