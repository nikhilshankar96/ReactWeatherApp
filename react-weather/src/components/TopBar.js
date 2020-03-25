import React, { useEffect, useContext, useState } from "react";

import Context from "../store/context";

const TopBar = props => {
	const { state, actions } = useContext(Context);
	let weatherComp;

	const { location } = state;

	const getW = async q => {
		// if (state.location) {
		console.log(props.location);
		if (props.location && props.location !== "") {
			actions({
				type: "setState",
				payload: {
					...state,
					loaded: true,
					location: props.location
				}
			});
		}

		// let q = state.location;
		// }

		console.log("GETW LOC: " + props.location);
		// console.log("GETW LOC: " + q);

		const key = "d4a6d71c118517077ed0d0688b4dc2a6";
		const res = await fetch(
			`http://api.openweathermap.org/data/2.5/forecast?q=${props.location}&appid=${key}`
			// `http://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${key}`
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
				// actions({
				// 	type: "setState",
				// 	payload: {
				// 		...state,
				// 		loaded: false
				// 	}
				// });
				console.log(error);
			});
		localStorage.setItem("state", JSON.stringify(state));
	};

	// const locFromProps = () => {
	// 	setLoc
	// }

	const setLocation = loc => {
		actions({
			type: "setState",
			payload: {
				...state,
				location: loc
			}
		});
	};

	const setLoc = e => {
		e.preventDefault();
		let loc = document.querySelector("#search").value;
		loc !== "" && getW(loc);
	};

	document.onKeyDown = function(e) {
		e = e || window.event;
		switch (e.which || e.keyCode) {
			case 13:
				console.log("enter pressed");
				setLoc();
				break;
		}
	};

	useEffect(() => {
		// if (!props.location) {
		getW(location);
		// }
	}, [location]);

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
		)
	);
};

export default TopBar;
