import { api } from "./api";

import type { Car } from "@/types/car";
import type { CarFilterValues } from "@/components/CarFilter/CarFilter";

// Fetch all cars

interface FetchCarsParams {
  page?: number;
  perPage?: number;
  filters?: CarFilterValues;
}

interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export async function fetchCars({
  page,
  perPage,
  filters,
}: FetchCarsParams): Promise<FetchCarsResponse> {
  const response = await api.get<FetchCarsResponse>("/cars", {
    params: { page, perPage, ...filters },
  });

  return response.data;
}

// Fetch one car

interface FetchCarParams {
  id: string;
}

export async function fetchCar({ id }: FetchCarParams): Promise<Car> {
  const response = await api.get<Car>(`/cars/${id}`);

  return response.data;
}

// Send order

interface SendOrderParams {
  id: string;
  data: {
    name: string;
    email: string;
    comment: string;
  };
}

interface SendOrderResponse {
  message: string;
}

export async function sendOrder({
  id,
  data,
}: SendOrderParams): Promise<SendOrderResponse> {
  const response = await api.post<SendOrderResponse>(
    `/cars/${id}/booking-requests`,
    data,
  );

  return response.data;
}
