import React, { useEffect, useContext } from "react";

import Context from "../store/context";

const TopBar = () => {
	const { state, actions } = useContext(Context);
	const { location } = state;

	const getW = async q => {
		// console.log("GET W CALLED");

		const key = "d4a6d71c118517077ed0d0688b4dc2a6";
		const res = await fetch(
			`http://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${key}`
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
						location: data.city.name,
						oWeather: data.list,
						oWeatherLoaded: true
					}
				});
			})
			.catch(error => {
				// console.log(error);
			});
		localStorage.setItem("state", JSON.stringify(state));
	};

	const setLoc = () => {
		let loc = document.querySelector("#search").value;
		// console.log(loc);
		loc !== "" && getW(loc);
	};

	useEffect(() => {
		if (!state.oWeatherLoaded) {
			getW(state.location);
		}
		// return () => {
		// 	cleanup
		// }
	}, [state.location]);

	return (
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
						// height: "60px"
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
							// className='center'
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
							// value={location}
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
	);
};

export default TopBar;
