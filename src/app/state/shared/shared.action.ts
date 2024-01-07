import { createAction, props } from '@ngrx/store';

export const selectToken = createAction("[AUTH] select auth token");

export const setLoadingSpinner = createAction(
  '[shared state] set loading spinner',
  props<{ IsLoading: boolean }>()
);

export const setErrorMessage = createAction(
  '[shared state] set error message',
  props<{ message: string | null; isSuccessful: boolean }>()
);
export const resetErrorMessage = createAction(
  '[shared state] reset error message',
  props<{ message: string | null; isSuccessful: boolean }>()
);

export const setSuccessMessage = createAction(
  '[shared state] set sucess message',
  props<{ message: string | null }>()
);

export const setIsMobile = createAction(
  '[shared state] set mobile',
  props<{ IsMobile: boolean }>()
);

export const scrollToTop = createAction('[UI] Scroll To Top');
