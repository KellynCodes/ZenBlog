export interface HttpResponse<T = null> {
  message: string | any;
  isSuccessful: boolean;
  data: T | null;
}
