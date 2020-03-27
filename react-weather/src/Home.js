import React, { useEffect, useContext } from "react";

//components
import TopBar from "./components/TopBar";
import WeatherContent from "./components/WeatherContent";
import Dummy from "./components/dummy";
import Spinner from "./components/Spinner";

//global state
import Context from "./store/context";

//materialize
import "materialize-css/dist/css/materialize.min.css";

const Home = props => {
	const { state, actions } = useContext(Context);
	let locc = props.flag ? props.match.params.url.toString() : "Tokyo";
	if (locc.includes("ReactWeatherApp/")) {
		locc = locc.replace('ReactWeatherApp/")', "");
	}
	if (locc.includes("/")) {
		locc = locc.replace('/")', "");
	}
	console.log("Home location : " + locc);

	useEffect(() => {
		actions({
			type: "setState",
			payload: {
				...state,
				location: locc
			}
		});
	}, [state.location]);

	return (
		<div className='Home'>
			{/* Nav */}
			<TopBar location={locc} flag={true} />
			{!state.loaded && (
				<div style={{ height: "100%" }}>
					<div style={{ height: "20%" }}></div>
					<Spinner className='center-align' />
					<div style={{ height: "20%" }}></div>
					<Dummy />
				</div>
			)}
			{state.loaded && state.oWeatherLoaded && <WeatherContent state={state} />}
		</div>
	);
};

export default Home;
