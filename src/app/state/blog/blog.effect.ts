import { PostComponent } from './../../pages/post/post/post.component';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, of, takeLast, tap } from 'rxjs';
import * as postActions from './blog.action';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../app/app.state';
import { PostService } from '../../../services/post/post.service';
import { PostDto } from '../../../services/post/Dto/post.dto';

@Injectable({ providedIn: 'root' })
export class PostEffect {
  constructor(
    private actions$: Actions,
    private postService: PostService,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {}

  // Fetch Post request
  FetchPostRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.LoadPosts),
      exhaustMap((action) =>
        this.postService.getPosts(action.query!).pipe(
          map((res) => {
            this.toastr.success(
              'Post Fetch Successful. Press CRTL + K or click on the search bar to search for post by title.',
              'Success'
            );
            setTimeout(() => {
              this.toastr.clear();
            }, 5000);
            return postActions.LoadPostsSuccess({
              data: res!,
            });
          }),
          catchError((error) => {
            return of(
              postActions.PostFailure({
                IsLoading: false,
                errorMessage: error?.error?.message,
              })
            );
          })
        )
      )
    )
  );

  GetPostRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.GetCourse),
      exhaustMap((action) =>
        this.postService.getPost(action.postId).pipe(
          map((res) => {
            this.toastr.success('Course fetched.', 'Success');
            return postActions.GetCourseSuccess({
              post: res.data!,
            });
          }),
          catchError((error) => {
            return of(
              postActions.PostFailure({
                IsLoading: false,
                errorMessage: error?.error?.message,
              })
            );
          })
        )
      )
    )
  );

  createPostRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.CreatePost),
      exhaustMap((action) =>
        this.postService.createPost(action.post).pipe(
          map((post) => {
            return postActions.CreatePostSuccess({
              post: post,
            });
          }),
          catchError((error) => {
            return of(
              postActions.PostFailure({
                IsLoading: false,
                errorMessage: error?.error?.message,
              })
            );
          })
        )
      )
    )
  );

  updatePostRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.UpdatePost),
      exhaustMap((action) =>
        this.postService.UpdatePost(action.postId, action.post).pipe(
          map((res) => {
            this.toastr.success('Post Updated successfully', 'Success');
            return postActions.UpdatePostSuccess({
              post: action.post,
            });
          }),
          catchError((error) => {
            return of(
              postActions.PostFailure({
                IsLoading: false,
                errorMessage: error?.error?.message,
              })
            );
          })
        )
      )
    )
  );

  deletePostRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.DeletePost),
      exhaustMap((action) =>
        this.postService.deletePost(action.postId).pipe(
          map((res) => {
            this.toastr.success('Post deleted', 'Success');
            return postActions.DeletePostSuccess({ postId: action.postId });
          }),
          catchError((error) => {
            return of(
              postActions.PostFailure({
                IsLoading: false,
                errorMessage: error?.error?.message,
              })
            );
          })
        )
      )
    )
  );

  resetCourseErrorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(postActions.PostFailure),
        tap((error) => {
          if (error.errorMessage.length > 0) {
            this.toastr.error(error.errorMessage, 'Error');
            setTimeout(() => {
              this.store.dispatch(postActions.ResetPostFetchState());
              this.toastr.clear();
            }, 3000);
          }
        })
      ),
    { dispatch: false }
  );
}
