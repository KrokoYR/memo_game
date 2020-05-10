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
	
	firstClickedTile: null,
	secondClickedTile: null,
	
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
				tiles: array
			}
		}
		
		case HANDLE_CLICK_ON_TILE: {
			// Getting clicked tile index:
			let arr = state.tiles.slice();
			let clickedTile = arr.indexOf(action.tile);
			
			// Checking: if it is already guessed or equal to firstClickTile:
			if (arr[clickedTile].isGuessed || state.firstClickedTile?.id === arr[clickedTile].id) {
				return state;
			} else {
				arr[clickedTile].frontColor = arr[clickedTile].backColor;
			}
			
			// Setting first and second tile:
			if (!state.firstClickedTile) {
				console.log(arr[clickedTile].frontColor)
				return {
					...state,
					firstClickedTile: arr[clickedTile],
					tiles: arr.slice(),
				}
			} else if (!state.secondClickedTile) {
				return {
					...state,
					secondClickedTile: arr[clickedTile],
					tiles: arr.slice(),
				}
			}
			return state;
		}
		
		case CHECK_TILES: {
			
			let arr = state.tiles.slice();
			if (state.firstClickedTile !== null && state.secondClickedTile !== null) {
				let indexFirst = -1;
				let indexSecond = -1;
				
				indexFirst = arr.indexOf(state.firstClickedTile)
				indexSecond = arr.indexOf(state.secondClickedTile);
				if (state.firstClickedTile.backColor === state.secondClickedTile.backColor) {
					arr[indexFirst].isGuessed = true
					arr[indexSecond].isGuessed = true
				} else {
					arr[indexFirst].frontColor = 'lightgrey'
					arr[indexSecond].frontColor = 'lightgrey'
				}
			} else {
				return state;
			}
			
			return {
				...state,
				tiles: arr.slice(),
				firstClickedTile: null,
				secondClickedTile: null,
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