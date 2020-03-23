import React, { useEffect, useContext, Fragment } from "react";
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
		if (localStorage.getItem("state")) {
			actions({
				type: "setState",
				payload: {
					...state,
					state: JSON.parse(localStorage.getItem("state"))
				}
			});
		} else {
			localStorage.setItem("state", JSON.stringify(state));
		}

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
								data: data,
								current: data.currently.time
							}
						});
					})
					.catch(error => console.error(error));
			});
		} else {
			hide = false;
		}
	}, [state.location]);

	return (
		<div className='App'>
			{/* Nav */}
			<TopBar location={"Nagpur"} flag={true} />
			{!state.loaded && (
				<div style={{ height: "100%" }}>
					<div style={{ height: "20%" }}></div>
					<Spinner className='center-align' />
					<div style={{ height: "20%" }}></div>
					<Dummy />
				</div>
			)}
			{state.loaded && <WeatherContent loc={state.location} />}
			<div className='footer z-depth-3 cyan darken-2 white-text'>
				<Footer />
			</div>
		</div>
	);
};

export default App;
