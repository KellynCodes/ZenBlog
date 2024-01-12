import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApiResponse } from '../../../data/shared/api.response';
import { PostDto } from '../../../services/post/Dto/post.dto';

export const POST_STATE_NAME = 'data';

export interface PostState {
  data: ApiResponse<PostDto[]> | null;
  IsLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

export const initialPostState: PostState = {
  data: null,
  IsLoading: false,
  successMessage: null,
  errorMessage: null,
};

export const PostStateSelector =
  createFeatureSelector<PostState>(POST_STATE_NAME);

export const getData = createSelector(PostStateSelector, (state) => state.data);

export const IsPostLoading = createSelector(
  PostStateSelector,
  (state) => state.IsLoading
);

export const successMessage = createSelector(
  PostStateSelector,
  (state) => state.successMessage
);

export const errorMessage = createSelector(
  PostStateSelector,
  (state) => state.errorMessage
);
