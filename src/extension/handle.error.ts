import { Store } from '@ngrx/store';
import { ErrorHandler, Injectable } from '@angular/core';
import { setErrorMessage } from '../app/state/shared/shared.action';
import { AppState } from '../app/state/app/app.state';

export class HandleGlobalError implements ErrorHandler {
  constructor(private store: Store<AppState>) {}
  handleError(error: string) {
    if (error != null && error === typeof 'string') {
      this.store.dispatch(
        setErrorMessage({
          message: error,
          isSuccessful: false,
        })
      );
    } else {
      console.log(error);
    }
  }
}
