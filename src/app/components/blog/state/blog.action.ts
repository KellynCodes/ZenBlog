import { createAction, props } from '@ngrx/store';
import {
  CreatePostDto,
  OwnerDto,
  PostDto,
} from '../../../../services/post/Dto/post.dto';
import { QueryDto } from '../../../../services/utils/dto';

export const CreatePost = createAction(
  '[POST API] Create Post',
  props<{ post: CreatePostDto; IsPostLoading: boolean }>()
);

export const CreateUser = createAction(
  '[POST API] Create Post',
  props<{ post: OwnerDto; IsPostLoading: boolean }>()
);
export const UpdatePost = createAction(
  '[POST API] Update Post',
  props<{ postId: string; post: PostDto; IsPostLoading: boolean }>()
);

export const GetCourse = createAction(
  '[POST API] Get Post',
  props<{ postId: string; isLoading: boolean }>()
);

export const GetCourseSuccess = createAction(
  '[POST API] Get Post',
  props<{ post: PostDto }>()
);

export const DeletePost = createAction(
  '[POST API] Delete Post',
  props<{ postId: string; isDeleting: boolean }>()
);

export const LoadPosts = createAction(
  '[POST API] Load Posts',
  props<{ query: QueryDto }>()
);

export const Success = createAction(
  '[POST API] Load Posts Success',
  props<{ posts: PostDto[]; successMessage: string }>()
);
export const PostFailure = createAction(
  '[POST API] Load Posts Error',
  props<{ IsLoading: boolean; errorMessage: string }>()
);

export const ResetPostFetchState = createAction(
  '[POST API] Reset Posts fetch state'
);
