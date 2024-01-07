import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const SHARED_STATE_NAME = "shared";

export const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(getSharedState, (state) => state?.IsLoading);

export const getIsSuccessful = createSelector(getSharedState, (state) => state?.IsSuccessful);

export const getErrorMessage = createSelector(getSharedState, (state) => state?.errorMessage);

export const getSuccessMessage = createSelector(getSharedState, (state) => state?.successMessage);

export const selectMobile = createSelector(getSharedState, (state) => state?.IsMobile );
