import { Action, createReducer, on } from '@ngrx/store';
import { initialPostState } from './blog.state';
import * as postActions from './blog.action';
import { PostDto } from '../../../services/post/Dto/post.dto';
import { ApiResponse } from '../../../data/shared/api.response';

const _postReducer = createReducer(
  initialPostState,
  on(postActions.LoadPosts, (state, action) => {
    return {
      ...state,
      IsLoading: true,
      errorMessage: null,
    };
  }),

  on(postActions.LoadPostsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      IsLoading: false,
      errorMessage: null,
    };
  }),

  on(postActions.CreatePost, (state, action) => {
    return {
      ...state,
      IsLoading: true,
      errorMessage: null,
    };
  }),

  on(postActions.CreatePostSuccess, (state, action) => {
    if (action.post != null) {
      const data: ApiResponse<PostDto[]> = {
        data: [action.post, ...state.data?.data!],
        limit: state.data?.limit! + 1,
        page: state.data?.page! + 1,
        total: state.data?.total! + 1,
      };
      return {
        ...state,
        IsLoading: false,
        successMessage: null,
        data: data,
      };
    }
    return {
      ...state,
      IsLoading: false,
      successMessage: null,
      data: state.data,
    };
  }),

  on(postActions.DeletePost, (state, action) => {
    return {
      ...state,
      IsLoading: true,
      errorMessage: null,
    };
  }),

  on(postActions.DeletePostSuccess, (state, action) => {
    const posts = state.data?.data;
    const newPosts = posts!.filter((course) => course.id !== action.postId);
    const data: ApiResponse<PostDto[]> = {
      data: newPosts,
      limit: state.data?.limit!,
      total: state.data?.total!,
      page: state.data?.page!,
    };
    return {
      ...state,
      data: data,
      IsLoading: false,
      errorMessage: null,
    };
  }),

  on(postActions.UpdatePost, (state, action) => {
    return {
      ...state,
      IsLoading: true,
      errorMessage: null,
    };
  }),

  on(postActions.UpdatePostSuccess, (state, action) => {
    const data: ApiResponse<PostDto[]> = {
      data: [ action.post, ...state?.data?.data!],
      limit: state.data?.limit!,
      page: state.data?.page!,
      total: state.data?.total!,
    };
    return {
      ...state,
      data: data,
      IsLoading: false,
      successMessage: null,
    };
  }),

  on(postActions.PostFailure, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
      IsLoading: false,
    };
  }),

  on(postActions.ResetPostFetchState, (state, action) => {
    return {
      ...state,
      successMessage: null,
      errorMessage: null,
      IsLoading: false,
    };
  })
);

export function postReducer(state: any, action: Action) {
  return _postReducer(state, action);
}
