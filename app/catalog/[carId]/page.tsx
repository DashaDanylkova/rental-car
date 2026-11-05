import { Suspense } from "react";
import type { CarDetailsPageProps } from "@/types/car";

async function CarDetailsContent({ params }: CarDetailsPageProps) {
  const { carId } = await params;

  return (
    <main>
      <h1>Car details</h1>
      <p>Car ID: {carId}</p>
    </main>
  );
}

export default function CarDetailsPage({ params }: CarDetailsPageProps) {
  return (
    <Suspense fallback={<p>Loading car details...</p>}>
      <CarDetailsContent params={params} />
    </Suspense>
  );
}
