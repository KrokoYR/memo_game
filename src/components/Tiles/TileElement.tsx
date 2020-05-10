import React, {FC} from 'react';
import styles from './TileElement.module.css'

import {TILE_TYPE} from '../../store/TilesReducer/types';

interface TileElementProps {
	tile: TILE_TYPE,
	clickOnTile: (tile: TILE_TYPE) => void,
	checkTiles: () => void,
}

const TileElement: FC<TileElementProps> = ({tile, clickOnTile, checkTiles}) => {
	
	
	const handleOnClick = () => {
		console.log(tile.id, 'Clicked', tile.backColor);
		clickOnTile(tile);
		setTimeout(() => {checkTiles()}, 500);
	}
	
	return (
		<div onClick={handleOnClick} className={styles.tiles__element} style={{backgroundColor: tile.frontColor}}/>
	)
}

export {TileElement};