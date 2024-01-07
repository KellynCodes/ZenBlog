import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostDto } from '../../../../services/post/Dto/post.dto';

export const POST_STATE_NAME = 'course';

export interface PostState {
  posts: PostDto[] | null;
  IsLoading: boolean;
  errorMessage: string | null;
}

export const initialPostState: PostState = {
  posts: null,
  IsLoading: false,
  errorMessage: null,
};

export const PostStateSelector =
  createFeatureSelector<PostState>(POST_STATE_NAME);

export const getCourses = createSelector(
  PostStateSelector,
  (state) => state.posts
);

export const IsPostLoading = createSelector(
  PostStateSelector,
  (state) => state.IsLoading
);

export const errorMessage = createSelector(
  PostStateSelector,
  (state) => state.errorMessage
);
