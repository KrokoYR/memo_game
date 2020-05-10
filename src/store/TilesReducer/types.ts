// Types:
export interface TILE_TYPE {
	color: string;
}

export interface TILES_STATE {
	tiles: Array<TILE_TYPE>,
	firstTileColor: string,
	secondTileColor: string
}

// Actions types:
export const HANDLE_CLICK_ON_TILE = 'HANDLE_CLICK_ON_TILE'

export const RESTART_GAME = 'RESTART_GAME'

interface HANDLE_CLICK_ON_TILE_ACTION {
	type: typeof HANDLE_CLICK_ON_TILE,
	color: string,
}

interface RESTART_GAME_ACTION {
	type: typeof RESTART_GAME,
}

export type TILES_ACTIONS = HANDLE_CLICK_ON_TILE_ACTION | RESTART_GAME_ACTION