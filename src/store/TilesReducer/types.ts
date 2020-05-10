// Types:
export interface TILE_TYPE {
	id: number;
	
	frontColor: string;
	backColor: string;
	
	isGuessed: boolean;
}

// State type:
export interface TILES_STATE {
	gameStarted: boolean;
	
	tiles: Array<TILE_TYPE>;
	// Tiles:
	previousTile: TILE_TYPE | null;
	currentTile: TILE_TYPE | null;
	
	// Size of
	rowCount: number;
	columnCount: number;
}

// Actions types:
export const HANDLE_CLICK_ON_TILE = 'HANDLE_CLICK_ON_TILE'
export const CHECK_TILES = 'CHECK_TILES'
export const RESTART_GAME = 'RESTART_GAME'
export const START_GAME = 'START_GAME'

interface HANDLE_CLICK_ON_TILE_ACTION {
	type: typeof HANDLE_CLICK_ON_TILE,
	tile: TILE_TYPE,
}

interface CHECK_TILES_ACTION {
	type: typeof CHECK_TILES,
}

interface RESTART_GAME_ACTION {
	type: typeof RESTART_GAME,
}

interface START_GAME_ACTION {
	type: typeof START_GAME,
}

export type TILES_ACTION_TYPES = HANDLE_CLICK_ON_TILE_ACTION |
	RESTART_GAME_ACTION |
	START_GAME_ACTION |
	CHECK_TILES_ACTION