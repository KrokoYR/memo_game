import {CHECK_TILES, HANDLE_CLICK_ON_TILE, RESTART_GAME, START_GAME, TILE_TYPE, TILES_ACTION_TYPES} from "./types";

export const handleClickOnTile = (tile: TILE_TYPE): TILES_ACTION_TYPES => {
	return {
		type: HANDLE_CLICK_ON_TILE,
		tile,
	}
}

export const checkTiles = (): TILES_ACTION_TYPES => {
	return {
		type: CHECK_TILES,
	}
}

export const restartGame = (): TILES_ACTION_TYPES => {
	return {
		type: RESTART_GAME,
	}
}

export const startGame = (): TILES_ACTION_TYPES => {
	return {
		type: START_GAME,
	}
}