import axios from "axios";
import type { ProductsResponse, ProductQueryParams } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function fetchProducts(
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const queryParams: Record<string, string | number> = {
    limit: params.limit ?? 20,
  };

  if (params.cursor_updated_at) {
    queryParams.cursor_updated_at = params.cursor_updated_at;
  }

  if (params.cursor_id !== undefined) {
    queryParams.cursor_id = params.cursor_id;
  }

  if (params.snapshot_time) {
    queryParams.snapshot_time = params.snapshot_time;
  }

  if (params.category) {
    queryParams.category = params.category;
  }

  const response = await axios.get<ProductsResponse>(`${API_URL}/products`, {
    params: queryParams,
  });

  return response.data;
}
