export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number | string;
  engine: string;
  rentalPrice: string;
  rentalCompany: string;
  features: string[];
  location: {
    country: string;
    city: string;
    address: string;
  };
  rentalConditions: string[];
  mileage: number;
  stockNumber?: number;
  createdAt?: string;
  updatedAt?: string;
}
