import { Action, createReducer, on } from '@ngrx/store';
import { initialPostState } from './blog.state';
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
  })
);

export function postReducer(state: any, action: Action) {
  return _postReducer(state, action);
}
