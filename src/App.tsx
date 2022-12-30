import React from 'react';
import { useRecoilState } from 'recoil';
import testAtom from '@recoil/testAtom';
import Counter from '@components/Counter';
import logo from './logo.svg';
import './App.css';

function App() {
	const [state, setState] = useRecoilState(testAtom);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<button type="button" onClick={() => setState('clicked!')}>
					clickme
				</button>
				{state}
				<Counter />
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
