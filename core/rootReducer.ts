import { combineReducers } from 'redux';

import { reducer } from '../data/reducer'

export const rootReducer = combineReducers({ data: reducer });
export type StoreType = ReturnType<typeof rootReducer>