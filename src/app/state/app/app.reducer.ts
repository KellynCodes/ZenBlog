import { postReducer } from '../../components/blog/state/blog.reducer';
import { POST_STATE_NAME } from '../../components/blog/state/blog.state';
import { sharedReducer } from '../shared/shared.reducer';
import { SHARED_STATE_NAME } from '../shared/shared.selector';

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
  [POST_STATE_NAME]: postReducer,
};
