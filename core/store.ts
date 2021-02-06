import { applyMiddleware, createStore} from 'redux';

import { rootReducer } from './rootReducer'
import { rootEpic } from './rootEpic';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware<any, any, any>();
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
