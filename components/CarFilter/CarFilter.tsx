"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import type { Filter } from "@/types/filter";

import styles from "./CarFilter.module.css";
import { ChevronDown } from "../icons/icons";

interface CarFilterProps {
  filters?: Filter;
  onSearch: (query: CarFilterValues) => void;
}

export interface CarFilterValues {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
}

export default function CarFilter({ filters, onSearch }: CarFilterProps) {
  const [error, setError] = useState("");

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);

  const min = filters?.price.min;
  const max = filters?.price.max;

  function splitPrices() {
    if (min === undefined || max === undefined) {
      return [];
    }

    const priceArr: number[] = [min];

    const start = min % 100 === 0 ? min + 10 : min + 10 - (min % 10);

    for (let price = start; price < max; price += 10) {
      priceArr.push(price);
    }

    if (min !== max) {
      priceArr.push(max);
    }

    return priceArr;
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (!brandDropdownRef.current?.contains(target)) {
        setIsBrandOpen(false);
      }

      if (!priceDropdownRef.current?.contains(target)) {
        setIsPriceOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsBrandOpen(false);
        setIsPriceOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const brand = selectedBrand;
    const price = selectedPrice;

    const minMileage = (formData.get("minMileage") as string).trim();
    const maxMileage = (formData.get("maxMileage") as string).trim();

    if (
      (minMileage && !/^\d+$/.test(minMileage)) ||
      (maxMileage && !/^\d+$/.test(maxMileage))
    ) {
      setError("Only numbers allowed in mileage fields.");
      return;
    }

    if (minMileage && maxMileage && Number(minMileage) > Number(maxMileage)) {
      setError("Mileage From cannot exceed Mileage To.");
      return;
    }

    setError("");

    const query: CarFilterValues = {
      ...(brand && { brand }),
      ...(price && { price }),
      ...(minMileage && { minMileage }),
      ...(maxMileage && { maxMileage }),
    };

    onSearch(query);
  }

  function handleReset() {
    setError("");
    setSelectedBrand("");
    setSelectedPrice("");
    setIsBrandOpen(false);
    setIsPriceOpen(false);

    onSearch({});
  }

  return (
    <div className={`container ${styles.container}`}>
      <form
        id="car-filter"
        className={styles.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className={styles.field}>
          <label htmlFor="brand">Car brand</label>

          <div className={styles.dropdown} ref={brandDropdownRef}>
            <button
              type="button"
              id="brand"
              className={`${styles.select} ${
                isBrandOpen ? styles.selectOpen : ""
              }`}
              onClick={() => {
                setIsPriceOpen(false);
                setIsBrandOpen((prev) => !prev);
              }}
              aria-expanded={isBrandOpen}
              aria-haspopup="listbox"
            >
              <span
                className={
                  selectedBrand ? styles.selectedValue : styles.placeholder
                }
              >
                {selectedBrand || "Choose a brand"}
              </span>

              <ChevronDown
                className={`${styles.chevron} ${
                  isBrandOpen ? styles.chevronOpen : ""
                }`}
              />
            </button>

            {isBrandOpen && (
              <ul className={styles.options} role="listbox">
                {filters?.brands.map((brand) => (
                  <li
                    key={brand}
                    role="option"
                    aria-selected={selectedBrand === brand}
                  >
                    <button
                      type="button"
                      className={`${styles.option} ${
                        selectedBrand === brand ? styles.selectedOption : ""
                      }`}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setIsBrandOpen(false);
                      }}
                    >
                      {brand}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="price">Price / 1 hour</label>

          <div className={styles.dropdown} ref={priceDropdownRef}>
            <button
              type="button"
              id="price"
              className={`${styles.select} ${
                isPriceOpen ? styles.selectOpen : ""
              }`}
              onClick={() => {
                setIsBrandOpen(false);
                setIsPriceOpen((prev) => !prev);
              }}
              aria-expanded={isPriceOpen}
              aria-haspopup="listbox"
            >
              <span
                className={
                  selectedPrice ? styles.selectedValue : styles.placeholder
                }
              >
                {selectedPrice || "Choose a price"}
              </span>

              <ChevronDown
                className={`${styles.chevron} ${
                  isPriceOpen ? styles.chevronOpen : ""
                }`}
              />
            </button>

            {isPriceOpen && (
              <ul className={styles.options} role="listbox">
                {splitPrices().map((price) => (
                  <li
                    key={price}
                    role="option"
                    aria-selected={selectedPrice === String(price)}
                  >
                    <button
                      type="button"
                      className={`${styles.option} ${
                        selectedPrice === String(price)
                          ? styles.selectedOption
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedPrice(String(price));
                        setIsPriceOpen(false);
                      }}
                    >
                      {price}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="minMileage">Car mileage / km</label>

          <div className={styles.inputWrapper}>
            <input
              type="number"
              name="minMileage"
              id="minMileage"
              placeholder="From"
              min="0"
              step="1"
              className={styles.control}
            />

            <input
              type="number"
              name="maxMileage"
              id="maxMileage"
              placeholder="To"
              min="0"
              step="1"
              className={styles.control}
            />
          </div>
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <div className={styles.buttonsWrapper}>
          <button type="submit" className={styles.searchButton}>
            Search
          </button>

          <button type="reset" className={styles.clearButton}>
            Clear filters
          </button>
        </div>
      </form>
    </div>
  );
}
