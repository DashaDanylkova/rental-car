import type { Car } from "@/types/car";

import {
  CheckCircle,
  CalendarIcon,
  CarIcon,
  FuelIcon,
  SettingsIcon,
  RoadHorizon,
  LocationIcon,
} from "@/components/icons/icons";

import styles from "./CarDetails.module.css";

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  const specifications = [
    {
      label: "Year",
      value: car.year,
      Icon: CalendarIcon,
    },
    {
      label: "Type",
      value: car.type,
      Icon: CarIcon,
    },
    {
      label: "Fuel Consumption",
      value: `${car.fuelConsumption} L/100 km`,
      Icon: FuelIcon,
    },
    {
      label: "Engine Size",
      value: car.engine,
      Icon: SettingsIcon,
    },
    {
      label: "Mileage",
      value: `${car.mileage.toLocaleString("en-US")} km`,
      Icon: RoadHorizon,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.mainInfo}>
        <div className={styles.heading}>
          <h1 className={styles.title}>
            {car.brand} {car.model}, {car.year}
          </h1>

          {car.stockNumber && (
            <span className={styles.article}>Id: {car.stockNumber}</span>
          )}
        </div>

        <div className={styles.location}>
          <LocationIcon className={styles.icon} />
          <span>
            {car.location.city}, {car.location.country}
          </span>
        </div>

        <p className={styles.price}>
          ${car.rentalPrice}
          <span className={styles.priceLabel}>/ day</span>
        </p>

        <p className={styles.description}>{car.description}</p>
      </div>

      <div className={styles.additionalInfo}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Rental Conditions</h2>

          <ul className={styles.conditionsList}>
            {car.rentalConditions.map((condition) => (
              <li key={condition} className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </section>
        <hr />
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Car Specifications</h2>

          <ul className={styles.specificationsList}>
            {specifications.map(({ label, value, Icon }) => (
              <li key={label} className={styles.listItem}>
                <Icon className={styles.icon} />
                <span>
                  {label}: {value}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <hr />
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Accessories and Functionalities
          </h2>

          <ul className={styles.featuresList}>
            {car.features.map((feature) => (
              <li key={feature} className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
