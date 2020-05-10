import {
	CHECK_TILES,
	HANDLE_CLICK_ON_TILE,
	RESTART_GAME,
	START_GAME,
	TILE_TYPE,
	TILES_ACTION_TYPES,
	TILES_STATE
} from "./types";
// Tiles colors:
import {color} from "../colors";

const initState: TILES_STATE = {
	gameStarted: false,
	
	tiles: [
		{id: 1, frontColor: 'lightgrey', backColor: 'black', isGuessed: false},
		{id: 2, frontColor: 'lightgrey', backColor: 'black', isGuessed: false},
		{id: 3, frontColor: 'lightgrey', backColor: 'black', isGuessed: false},
		{id: 4, frontColor: 'lightgrey', backColor: 'black', isGuessed: false},
		{id: 5, frontColor: 'lightgrey', backColor: 'black', isGuessed: false},
		{id: 6, frontColor: 'lightgrey', backColor: 'black', isGuessed: false},
		{id: 7, frontColor: 'lightgrey', backColor: 'black', isGuessed: false},
		{id: 8, frontColor: 'lightgrey', backColor: 'black', isGuessed: false},
	],
	
	previousTile: null,
	currentTile: null,
	
	rowCount: 4,
	columnCount: 4,
}

export const TilesReducer = (
	state = initState,
	action: TILES_ACTION_TYPES
): TILES_STATE => {
	switch (action.type) {
		
		case START_GAME: {
			let arr = [];
			// Getting count of colors for tiles:
			let colorCount = state.columnCount * state.rowCount / 2
			
			/* Function to randomize array in-place using Durstenfeld shuffle algorithm */
			const shuffleArray = (array: Array<TILE_TYPE>) => {
				for (let i = array.length - 1; i > 0; i--) {
					let j = Math.floor(Math.random() * (i + 1));
					[array[i], array[j]] = [array[j], array[i]]
				}
			}
			
			// Filling an array:
			for (let i = 0, id = 0; i < colorCount; i++, id += 2) {
				// Pushing pairs. IDs are equal to indexes:
				arr.push([
					{id: id, frontColor: 'lightgrey', backColor: color[i], isGuessed: false},
					{id: id + 1, frontColor: 'lightgrey', backColor: color[i], isGuessed: false}
				])
			}
			// Flatting array to get unpaired array:
			let array = arr.flat();
			
			// Shuffling array:
			shuffleArray(array);
			
			return {
				...state,
				gameStarted: true,
				tiles: array,
			}
		}
		
		case HANDLE_CLICK_ON_TILE: {
			if (!state.gameStarted) {
				return state;
			}
			
			// Getting clicked tile index:
			let arr = state.tiles.slice();
			let clickedTile = arr[arr.indexOf(action.tile)];
			
			if (clickedTile.isGuessed)
				return state;
			
			
			if (state.previousTile === null) {
				clickedTile.frontColor = clickedTile.backColor
				return {
					...state,
					previousTile: clickedTile,
					tiles: arr,
				}
			}
			
			if (state.currentTile === null) {
				clickedTile.frontColor = clickedTile.backColor
				return {
					...state,
					currentTile: clickedTile,
					tiles: arr,
				}
			} else {
				return {
					...state
				}
			}
		}
		
		case CHECK_TILES: {
			if (state.currentTile === null || state.previousTile === null)
				return state;
			
			let arr = state.tiles.slice();
			let currentTile = arr[arr.indexOf(state.currentTile)];
			let previousTile = arr[arr.indexOf(state.previousTile)];
			
			if (currentTile.id !== previousTile.id &&
				currentTile.backColor === previousTile.backColor) {
				[currentTile.frontColor, previousTile.frontColor] = [currentTile.backColor, previousTile.backColor];
				[currentTile.isGuessed, previousTile.isGuessed] = [true, true];
			} else {
				arr.forEach(tile => {
					if(!tile.isGuessed)
						tile.frontColor = 'lightgrey'
				})
			}
			
			return {
				...state,
				tiles: arr,
				currentTile: null,
				previousTile: null,
			}
		}
		
		case RESTART_GAME: {
			return {
				...state
			}
		}
		
		default:
			return state
	}
}