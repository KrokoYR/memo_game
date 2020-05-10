import React, {FC} from 'react';
import {connect} from "react-redux";
import {Dispatch} from "redux";

// Actions for mapDispatchToProps:
import {AppActions} from "../../store";
import {startGame} from "../../store/TilesReducer/actions";

interface SidebarProps {
	startGame: () => void;
}

const DumbComponent: FC<SidebarProps> = ({startGame}) => {
	
	const handleClickStartButton = () => {
		startGame();
	}
	
	return (
		<div>
			<button onClick={handleClickStartButton}>Start game</button>
		</div>
	)
}

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
	return {
		startGame: () => dispatch(startGame())
	}
}

export const Sidebar = connect(null, mapDispatchToProps)(DumbComponent);