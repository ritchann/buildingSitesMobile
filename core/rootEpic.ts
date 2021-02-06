import { combineEpics } from "redux-observable";

import { epic } from '../data/epic';

export const rootEpic = combineEpics(epic)