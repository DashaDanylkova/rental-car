import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/types/car";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const {
    id,
    brand,
    model,
    year,
    img,
    rentalPrice,
    location,
    rentalCompany,
    type,
    mileage,
  } = car;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={img}
          alt={`${brand} ${model}`}
          fill
          loading="lazy"
          sizes="(max-width: 767px) 100vw, 276px"
          className={styles.image}
        />
      </div>

      <div className={styles.carHeading}>
        <h2 className={styles.carName}>
          {`${brand} `}
          <span>{model}</span>
          {`, ${year}`}
        </h2>

        <p className={styles.price}>${rentalPrice}</p>
      </div>

      <div className={styles.detailsWrapper}>
        <ul className={styles.carDetails}>
          <li>{location.city}</li>
          <li>{location.country}</li>
          <li>{rentalCompany}</li>
          <li>{type}</li>
          <li>{`${mileage} km`}</li>
        </ul>

        <Link
          href={`/catalog/${id}`}
          className={styles.detailsLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
