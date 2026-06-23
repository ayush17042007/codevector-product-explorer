export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface NextCursor {
  updated_at: string;
  id: number;
}

export interface ProductsResponse {
  products: Product[];
  next_cursor: NextCursor | null;
  snapshot_time: string;
}

export interface ProductQueryParams {
  cursor_updated_at?: string;
  cursor_id?: number;
  snapshot_time?: string;
  category?: string;
  limit?: number;
}
