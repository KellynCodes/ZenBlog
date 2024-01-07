import { SharedState } from '../shared/shared.state';
import { SHARED_STATE_NAME } from '../shared/shared.selector';
import { POST_STATE_NAME, PostState } from '../../components/blog/state/blog.state';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [POST_STATE_NAME]: PostState 
}
