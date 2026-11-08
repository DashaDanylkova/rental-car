import { api } from "./api";

import type { Filter } from "@/types/filter";

export async function fetchFilters(): Promise<Filter> {
  const response = await api.get<Filter>("/cars/filters");

  return response.data;
}
