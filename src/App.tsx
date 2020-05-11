import React from 'react';
import './App.css';
import {Tiles} from './components/Tiles/Tiles';
import {Sidebar} from "./components/Sidebar/Sidebar";

function App() {
	return (
		<div className="App">
			<h1>Memo game</h1>
			<Tiles/>
			<Sidebar/>
		</div>
	);
}

export default App;
