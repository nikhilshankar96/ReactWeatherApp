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
import Spinner from "./components/Spinner";

const App = () => {
	const { state, actions } = useContext(Context);
	let hide = true;

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
					.then(data => {
						hide = true;

						actions({
							type: "setState",
							payload: {
								...state,
								loaded: true,
								data: data
							}
						});
					});
			});
			console.log(state);
		} else {
			hide = false;
		}
	}, []);

	return (
		<div className='App col sm12'>
			{/* Nav */}
			{/* <TopBar /> */}
			<Dummy hide={hide} />
			{!state.loaded && (
				<div style={{ height: "100%" }}>
					<div style={{ height: "20%" }}></div>
					<Spinner className='center-align' />
					<div style={{ height: "20%" }}></div>
					<Dummy />
				</div>
			)}
			{state.loaded && <WeatherContent data={state.data} />}
			{/* Footer */}
			<div className='footer z-depth-2'>
				<Footer />
			</div>
		</div>
	);
};

export default App;
