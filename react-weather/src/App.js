import React, { useEffect, useContext } from "react";
import "./App.css";

//global state
import Context from "./store/context";

//materialize
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

//components
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import WeatherContent from "./components/WeatherContent";
import Dummy from "./components/dummy";

const App = () => {
	const { state, actions } = useContext(Context);

	useEffect(() => {
		console.log("didmount");

		const { long, lat } = state;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(pos => {
				actions({
					type: "setState",
					payload: {
						...state,
						lat: pos.coords.latitude,
						long: pos.coords.longitude
					}
				});
				const proxy = "https://cors-anywhere.herokuapp.com/";
				const api = `${proxy}https://api.darksky.net/forecast/6d4c83b905298eaad1db4cde293d2068/${lat},${long}`;
				fetch(api)
					.then(res => res.json())
					.then(data =>
						actions({
							type: "setState",
							payload: {
								...state,
								loaded: true,
								weather: data
							}
						})
					);
			});
			console.log(state);
		}
		// else {
		// 	const proxy = "https://cors-anywhere.herokuapp.com/";
		// 	const api = `${proxy}https://api.darksky.net/forecast/6d4c83b905298eaad1db4cde293d2068/${lat},${long}`;
		// 	fetch(api)
		// 		.then(res => res.json())
		// 		.then(data =>
		// 			actions({
		// 				type: "setState",
		// 				payload: {
		// 					...state,
		// 					loaded: true,
		// 					weather: data
		// 				}
		// 			})
		// 		);
		// }
	}, []);

	return (
		<div className='App'>
			{/* Nav */}
			<TopBar />
			<Dummy />
			{state.loaded && <WeatherContent />}
			{/* Footer */}
			<div className='footer z-depth-2'>
				<Footer />
			</div>
		</div>
	);
};

export default App;
