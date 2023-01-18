import InfoWindow from '@components/InfoWindow';

function App() {
	return (
		<div
			className="App"
			style={{
				backgroundImage:
					'url(https://user-images.githubusercontent.com/108210492/212647244-1ef8711d-1b94-475e-820a-26be666d1db0.png)',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				height: '100vh',
			}}
		>
			<InfoWindow />
		</div>
	);
}

export default App;
