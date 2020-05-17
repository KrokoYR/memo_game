import {
  CHECK_GAME_STATUS,
  CHECK_TILES,
  HANDLE_CLICK_ON_TILE,
  START_GAME,
  TILE_TYPE,
  TILES_ACTION_TYPES,
  TILES_STATE,
} from './types';
// Tiles colors:
import { color } from './additional/colors';
import { emptyTiles } from './additional/emptyTiles';

const initState: TILES_STATE = {
  gameIsStarted: false,
  gameIsFinished: false,

  roundCounter: 0,

  tiles: emptyTiles.slice(),

  previousTile: null,
  currentTile: null,

  rowCount: 4,
  columnCount: 4,
};

export const TilesReducer = (
  state = initState,
  action: TILES_ACTION_TYPES
): TILES_STATE => {
  switch (action.type) {
    case START_GAME: {
      let arr = [];
      // Getting count of colors for tiles:
      let colorCount = (state.columnCount * state.rowCount) / 2;

      /* Function to randomize array in-place using Durstenfeld shuffle algorithm */
      const shuffleArray = (array: Array<TILE_TYPE>) => {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };

      // Filling an array:
      for (let i = 0, id = 0; i < colorCount; i++, id += 2) {
        // Pushing pairs. IDs are equal to indexes:
        arr.push([
          {
            id: id,
            frontColor: 'lightgrey',
            backColor: color[i],
            isGuessed: false,
          },
          {
            id: id + 1,
            frontColor: 'lightgrey',
            backColor: color[i],
            isGuessed: false,
          },
        ]);
      }
      // Flatting array to get unpaired array:
      let array = arr.flat();

      // Shuffling array:
      shuffleArray(array);

      return {
        ...state,
        gameIsStarted: true,
        roundCounter: 0,
        tiles: array,
        previousTile: null,
        currentTile: null,
      };
    }

    case HANDLE_CLICK_ON_TILE: {
      if (!state.gameIsStarted) {
        return state;
      }

      // Getting clicked tile index:
      let arr = state.tiles.slice();
      let clickedTile = arr[arr.indexOf(action.tile)];

      // Checking if tile is already guessed
      // or not equal to the previous one
      if (clickedTile.isGuessed || clickedTile.id === state.previousTile?.id)
        return state;

      // Setting
      if (state.previousTile === null) {
        clickedTile.frontColor = clickedTile.backColor;
        return {
          ...state,
          previousTile: clickedTile,
          tiles: arr,
        };
      } else if (state.currentTile === null) {
        clickedTile.frontColor = clickedTile.backColor;
        return {
          ...state,
          currentTile: clickedTile,
          tiles: arr,
        };
      } else {
        return state;
      }
    }

    case CHECK_TILES: {
      if (state.currentTile === null || state.previousTile === null)
        return state;

      let arr = state.tiles.slice();
      let currentTile = arr[arr.indexOf(state.currentTile)];
      let previousTile = arr[arr.indexOf(state.previousTile)];

      let gameIsFinished = false;
      if (
        currentTile.id !== previousTile.id &&
        currentTile.backColor === previousTile.backColor
      ) {
        [currentTile.frontColor, previousTile.frontColor] = [
          currentTile.backColor,
          previousTile.backColor,
        ];
        [currentTile.isGuessed, previousTile.isGuessed] = [true, true];
        gameIsFinished = arr.every((tile) => tile.isGuessed);
      } else {
        previousTile.frontColor = 'lightgrey';
        currentTile.frontColor = 'lightgrey';
      }

      return {
        ...state,
        roundCounter: state.roundCounter + 1,
        tiles: arr.slice(),
        currentTile: null,
        previousTile: null,
        gameIsFinished: gameIsFinished,
      };
    }

    case CHECK_GAME_STATUS: {
      if (state.gameIsFinished) {
        debugger;
        alert('Congratulations! You won at ' + state.roundCounter + ' round!');
        return {
          ...state,
          gameIsStarted: false,
          gameIsFinished: false,
        };
      }
      return state;
    }

    default:
      return state;
  }
};
