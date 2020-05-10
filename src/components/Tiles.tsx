import React, {FC} from 'react';
import styles from './Tiles.module.css'

// Chile components:
import {TileElement} from "./TileElement";


import {TILE_TYPE} from "../store/TilesReducer/types";
import {AppActions, AppState} from '../store';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {handleClickOnTile, startGame, checkTiles} from "../store/TilesReducer/actions";

interface TilesProps {
    tiles: Array<TILE_TYPE>;
    startGame: () => void;
    clickOnTile: (tile: TILE_TYPE) => void;
    checkTiles: () => void;
}

const DumbComponent: FC<TilesProps> = ({tiles,startGame, clickOnTile, checkTiles}) => {
    
    const tileElements = tiles.map(tile => {
        return (
            <TileElement key={tile.id}
                         tile={tile}
                         clickOnTile={clickOnTile}
                         checkTiles={checkTiles}
            />
        )
    })
    
    const handleStartGame = () => {
        startGame();
    }
    
    return (
        <div className={styles.tiles__container}>
            {tileElements}
            <button onClick={handleStartGame}>Start game</button>
        </div>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        tiles: state.TilesReducer.tiles,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
    return {
        startGame: () => dispatch(startGame()),
        clickOnTile: (tile: TILE_TYPE) => dispatch(handleClickOnTile(tile)),
        checkTiles: () => dispatch(checkTiles()),
    }
}
export const Tiles = connect(mapStateToProps, mapDispatchToProps)(DumbComponent);
