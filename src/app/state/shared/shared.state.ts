export interface SharedState {
  IsSuccessful: boolean;
  IsLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  IsMobile: boolean;
}

export const sharedState: SharedState = {
  IsSuccessful: false,
  IsLoading: false,
  errorMessage: null,
  successMessage: null,
  IsMobile: false,
};
