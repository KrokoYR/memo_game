import {combineReducers} from "redux";
import {TilesReducer} from "./TilesReducer/tiles-reducer";
import {TILES_ACTION_TYPES} from "./TilesReducer/types";

export const rootReducer = combineReducers({
	TilesReducer
})

export type AppState = ReturnType<typeof rootReducer>
export type AppActions = TILES_ACTION_TYPES