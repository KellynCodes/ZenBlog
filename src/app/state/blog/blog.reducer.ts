import { Action, createReducer, on } from '@ngrx/store';
import { initialPostState } from './blog.state';
import * as postActions from './blog.action';
import { PostDto } from '../../../services/post/Dto/post.dto';

const _postReducer = createReducer(
  initialPostState,
  on(postActions.LoadPosts, (state, action) => {
    return {
      ...state,
      IsLoading: true,
      errorMessage: null,
    };
  }),

  on(postActions.DeletePost, (state, action) => {
    const posts = state.posts!.filter((course) => course.id !== action.postId);
    return {
      ...state,
      posts: posts,
      IsLoading: false,
      errorMessage: null,
    };
  }),

  on(postActions.Success, (state, action) => {
    if (action.posts != null && state.posts != null && !action.IsReFetch) {
      console.log(`${action.IsReFetch}`, action.posts);
      return {
        ...state,
        posts: [...state.posts, ...action.posts] as PostDto[],
        IsLoading: false,
        successMessage: action.successMessage,
        errorMessage: null,
      };
    }
    console.log(`${action.IsReFetch}`, action.posts);
    return {
      ...state,
      posts: action.posts,
      IsLoading: false,
      successMessage: action.successMessage,
      errorMessage: null,
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
      errorMessage: null,
      IsLoading: false,
    };
  })
);

export function postReducer(state: any, action: Action) {
  return _postReducer(state, action);
}