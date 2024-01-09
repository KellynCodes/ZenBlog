import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostDto } from '../../../../services/post/Dto/post.dto';

export const POST_STATE_NAME = 'post';

export interface PostState {
  posts: PostDto[] | null;
  IsLoading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

export const initialPostState: PostState = {
  posts: null,
  IsLoading: false,
  successMessage: null,
  errorMessage: null,
};

export const PostStateSelector =
  createFeatureSelector<PostState>(POST_STATE_NAME);

export const getPosts = createSelector(
  PostStateSelector,
  (state) => state.posts
);

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
