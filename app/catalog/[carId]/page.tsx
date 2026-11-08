"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { fetchCar } from "@/lib/api/cars";
import FetchMessage from "@/components/FetchMessage/FetchMessage";
import CarDetails from "@/components/CarDetails/CarDetails";
import BookingForm from "@/components/BookingForm/BookingForm";

import styles from "./page.module.css";

export default function CarDetailsPage() {
  const { carId } = useParams<{ carId: string }>();

  const {
    data: car,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCar({ id: carId }),
    enabled: Boolean(carId),
    staleTime: 60 * 1000,
  });

  if (isPending) {
    return <FetchMessage />;
  }

  if (isError || !car) {
    return (
      <div className={styles.message}>
        Failed to load car details. Please try again.
      </div>
    );
  }

  return (
    <section className={`${styles.page} container`}>
      <div className={styles.mainContent}>
        <div className={styles.imageWrapper}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            priority
            className={styles.image}
          />
        </div>

        <BookingForm carId={carId} />
      </div>

      <CarDetails car={car} />
    </section>
  );
}
