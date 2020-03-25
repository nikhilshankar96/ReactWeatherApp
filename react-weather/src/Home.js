import React, { useEffect, useContext, Fragment } from "react";

//components
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import WeatherContent from "./components/WeatherContent";
import Dummy from "./components/dummy";
import Spinner from "./components/Spinner";

//global state
import Context from "./store/context";

//materialize
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

const Home = props => {
	const { state, actions } = useContext(Context);

	useEffect(() => {
		if (props.location != "") {
			console.log(props.location);

			actions({
				type: "setState",
				payload: {
					...state,
					location: props.location
				}
			});
		}
	}, []);

	return (
		<div className='Home'>
			{/* Nav */}
			<TopBar location={props.location} flag={true} />
			{!state.loaded && (
				<div style={{ height: "100%" }}>
					<div style={{ height: "20%" }}></div>
					<Spinner className='center-align' />
					<div style={{ height: "20%" }}></div>
					<Dummy />
				</div>
			)}
			{state.loaded && <WeatherContent loc={"Boston"} />}
			<div className='footer z-depth-3 cyan darken-2 white-text'>
				<Footer />
			</div>
		</div>
	);
};

export default Home;
