import { Action, createReducer, on } from '@ngrx/store';
import { errorMessage, initialPostState } from './blog.state';
import * as postActions from './blog.action';

const _postReducer = createReducer(
  initialPostState,
  on(postActions.LoadPosts, (state, action) => {
    return {
      ...state,
      IsLoading: true,
      errorMessage: '',
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
    return {
      ...state,
      posts: action.posts,
      IsLoading: false,
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
