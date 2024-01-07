import { createReducer, on } from '@ngrx/store';
import * as sharedActions from './shared.action';
import { sharedState } from './shared.state';

const _sharedReducer = createReducer(
  sharedState,
  on(sharedActions.setLoadingSpinner, (state, { IsLoading }) => {
    return {
      ...state,
      IsLoading: IsLoading,
    };
  }),

  on(sharedActions.setErrorMessage, (state, { message, isSuccessful }) => {
    return {
      ...state,
      isSuccessful: isSuccessful,
      errorMessage: message,
    };
  }),

  on(sharedActions.resetErrorMessage, (state, { message, isSuccessful }) => {
    console.log(message);
    return {
      ...state,
      isSuccessful: isSuccessful,
      errorMessage: message,
    };
  }),

  on(sharedActions.setSuccessMessage, (state, { message }) => {
    return {
      ...state,
      successMessage: message,
    };
  }),

  on(sharedActions.setIsMobile, (state, { IsMobile }) => {
    return {
      ...state,
      IsMobile: IsMobile,
    };
  })
);

export function sharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
