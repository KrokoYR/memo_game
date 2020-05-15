import React, { FC } from 'react';
import styles from './Tiles.module.css'

// Chile components:
import { TileElement } from "./TileElement";


import { TILE_TYPE } from "../../store/TilesReducer/types";
import { AppActions, AppState } from '../../store';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { handleClickOnTile, checkTiles, checkGameStatus } from "../../store/TilesReducer/actions";

interface TilesProps {
	tiles: Array<TILE_TYPE>;
	clickOnTile: (tile: TILE_TYPE) => void;
	checkTiles: () => void;
	checkGameStatus: () => void;
}

const DumbComponent: FC<TilesProps> = ({
	tiles,
	clickOnTile,
	checkTiles,
	checkGameStatus,
}) => {

	const tileElements = tiles.map(tile => {
		return (
			<TileElement key={tile.id}
				tile={tile}
				clickOnTile={clickOnTile}
				checkTiles={checkTiles}
				checkGameStatus={checkGameStatus}
			/>
		)
	})

	return (
		<div className={styles.tiles__container}>
			{tileElements}
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
		clickOnTile: (tile: TILE_TYPE) => dispatch(handleClickOnTile(tile)),
		checkTiles: () => dispatch(checkTiles()),
		checkGameStatus: () => dispatch(checkGameStatus()),
	}
}
export const Tiles = connect(mapStateToProps, mapDispatchToProps)(DumbComponent);
