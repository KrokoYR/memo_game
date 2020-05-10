// Types:
export interface TILE_TYPE {
	id: number;
	
	frontColor: string;
	backColor: string;
	
	isGuessed: boolean;
}

// State type:
export interface TILES_STATE {
	// Flag for start of a game:
	gameStarted: boolean;
	
	// Round counter:
	roundCounter: number;
	
	// Tiles:
	tiles: Array<TILE_TYPE>;
	previousTile: TILE_TYPE | null;
	currentTile: TILE_TYPE | null;
	
	// Size of
	rowCount: number;
	columnCount: number;
}

// Actions types:
export const HANDLE_CLICK_ON_TILE = 'HANDLE_CLICK_ON_TILE'
export const CHECK_TILES = 'CHECK_TILES'

export const START_GAME = 'START_GAME'

interface HANDLE_CLICK_ON_TILE_ACTION {
	type: typeof HANDLE_CLICK_ON_TILE,
	tile: TILE_TYPE,
}

interface CHECK_TILES_ACTION {
	type: typeof CHECK_TILES,
}

interface START_GAME_ACTION {
	type: typeof START_GAME,
}

export type TILES_ACTION_TYPES = HANDLE_CLICK_ON_TILE_ACTION |
	START_GAME_ACTION |
	CHECK_TILES_ACTION