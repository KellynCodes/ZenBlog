export interface ApiResponse<T = null> {
  data: T | null;
  total: number;
  page: number;
  limit: number;
}
