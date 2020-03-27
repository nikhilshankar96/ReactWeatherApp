import React, { useEffect, useContext, useState } from "react";

import Context from "../store/context";

const TopBar = props => {
	const { state, actions } = useContext(Context);
	const [location, setLocation] = useState(props.location);

	// // console.log("topbar location :" + location);

	const getW = async q => {
		// console.log("getw location : " + location);
		const key = "d4a6d71c118517077ed0d0688b4dc2a6";
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${key}`
		)
			.then(res => res.json())
			.then(data => {
				actions({
					type: "setState",
					payload: {
						...state,
						loaded: true,
						lat: data.city.coord.lat,
						long: data.city.coord.lon,
						oWeather: data.list,
						oWeatherLoaded: true
					}
				});
			})
			.then(() => fetchDarkSky(state.lat, state.long))
			.catch(error => {
				// console.log(error);
			});
		// console.log(res !== null);

		return res !== null;
	};

	const fetchDarkSky = async (lat, long) => {
		// // console.log("darksy fn: " + lat, long);

		const proxy = "https://cors-anywhere.herokuapp.com/";
		const api = `${proxy}https://api.darksky.net/forecast/6d4c83b905298eaad1db4cde293d2068/${lat},${long}`;
		const res = await fetch(api)
			.then(res => res.json())
			.then(data => {
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
		// // console.log(res !== null);

		return res !== null;
	};

	const setLoc = e => {
		e.preventDefault();
		let loc = document.querySelector("#search").value;
		loc !== "" &&
			actions({
				type: "setState",
				payload: {
					...state,
					loaded: false,
					location: loc
				}
			});
		loc !== "" && setLocation(loc);
	};

	useEffect(() => {
		getW(location).then(() => fetchDarkSky(state.lat, state.long));
	}, [state.loaded, location]);

	return (
		state.location != "" && (
			<nav>
				<div
					className='nav-wrapper white row white-text z-depth-3'
					style={{
						background: "#00bcd4"
					}}
				>
					<form
						className='z-depth-2'
						style={{
							background: "#00bcd4"
						}}
					>
						<div
							className='input-field col s10 white-text'
							style={{
								background: "#00bcd4",
								height: "60px"
							}}
						>
							<input
								id='search'
								type='search'
								style={{
									color: "white",
									fontSize: "25px",
									background: "#00bcd4",
									height: "60px"
								}}
								required
								placeholder={location}
							/>
							<label className='label-icon' htmlFor='search'>
								<i className='material-icons' style={{ color: "black" }}>
									search
								</i>
							</label>
						</div>
						<div
							className='col s2'
							style={{
								background: "#00bcd4",
								height: "60px"
							}}
						>
							<a className='btn-floating btn-large black' onClick={setLoc}>
								<i
									className='material-icons'
									style={{ fontSize: "30px", color: "#00bcd4" }}
								>
									gps_fixed
								</i>
							</a>
						</div>
					</form>
				</div>
			</nav>
		)
	);
};

export default TopBar;
