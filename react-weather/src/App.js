import React, { useEffect, useContext, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

//global state
import Context from "./store/context";

//materialize
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

//components
import Home from "./Home";
// import TopBar from "./components/TopBar";
// import Footer from "./components/Footer";
// import WeatherContent from "./components/WeatherContent";
// import Dummy from "./components/dummy";
// import Spinner from "./components/Spinner";

const App = () => {
	const { state, actions } = useContext(Context);
	let hide = true;

	useEffect(() => {
		// if (localStorage.getItem("state")) {
		// 	actions({
		// 		type: "setState",
		// 		payload: {
		// 			...state,
		// 			state: JSON.parse(localStorage.getItem("state"))
		// 		}
		// 	});
		// } else {
		// 	localStorage.setItem("state", JSON.stringify(state));
		// }

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
		<Router>
			<Switch>
				<Route path='/'>
					<Home location={"Nagpur"} />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
