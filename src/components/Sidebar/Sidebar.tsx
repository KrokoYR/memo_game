import React, { FC } from 'react';
import styles from './Sidebar.module.css'

// Actions for mapDispatchToProps:
import { AppActions, AppState } from "../../store";
import { startGame } from "../../store/TilesReducer/actions";
import { Dispatch } from "redux";

import { connect } from "react-redux";

interface SidebarProps {
	roundCounter: number;
	gameIsStarted: boolean;
	gameIsFinished: boolean;

	startGame: () => void;
}

const DumbComponent: FC<SidebarProps> = ({
	roundCounter,
	gameIsStarted,
	gameIsFinished,
	startGame
}) => {

	const handleClickStartButton = () => {
		startGame();
	}

	const element = () => {
		if (!gameIsStarted && !gameIsFinished) {
			return 'Click on button to start!'
		} else if (gameIsStarted && !gameIsFinished) {
			return 'Game is started!'
		} else {
			return 'Game is finished'
		}
	}

	return (
		<div className={styles.sidebar}>
			<div><p>{element()}</p></div>
			<button className={styles.sidebar__start} onClick={handleClickStartButton}>START GAME</button>
			<button className={styles.sidebar__counter} disabled>ROUNDS: {roundCounter}</button>
		</div>
	)
}

const mapStateToProps = (state: AppState) => {
	return {
		roundCounter: state.TilesReducer.roundCounter,
		gameIsStarted: state.TilesReducer.gameIsStarted,
		gameIsFinished: state.TilesReducer.gameIsFinished,
	}
}

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
	return {
		startGame: () => dispatch(startGame()),
	}
}

export const Sidebar = connect(mapStateToProps, mapDispatchToProps)(DumbComponent);