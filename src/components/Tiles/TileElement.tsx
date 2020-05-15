import React, { FC } from 'react';
import styles from './TileElement.module.css'

import { TILE_TYPE } from '../../store/TilesReducer/types';

interface TileElementProps {
	tile: TILE_TYPE;
	clickOnTile: (tile: TILE_TYPE) => void;
	checkTiles: () => void;
	checkGameStatus: () => void;
}

const TileElement: FC<TileElementProps> = ({
	tile,
	clickOnTile,
	checkTiles,
	checkGameStatus,
}) => {
	const handleOnClick = () => {
		clickOnTile(tile);
		setTimeout(() => {
			checkTiles()
		}, 500);
		setTimeout(() => {
			checkGameStatus()
		}, 600)

	}

	return (
		<div onClick={handleOnClick} className={styles.tiles__element} style={{ backgroundColor: tile.frontColor }} />
	)
}

export { TileElement };