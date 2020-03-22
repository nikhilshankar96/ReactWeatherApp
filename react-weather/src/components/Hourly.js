import React, { useContext, useEffect } from "react";
import Context from "../store/context";

import Weather from "./Weather";
import HourlyComponent from "./HourlyComponent";

const Hourly = props => {
	const { state, actions } = useContext(Context);
	let { current } = props;
	let daily = state.daily || props.daily;
	let date = new Date(current * 1000),
		datevalues = [
			date.getFullYear(),
			date.getMonth() + 1,
			date.getDate() + 1,
			date.getHours(),
			date.getMinutes(),
			date.getSeconds(),
			date.getDay()
		];
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
						oWeather: data.list,
						oWeatherLoaded: true
					}
				});
				// console.log(data);
			})
			.catch(err => console.error(err));
	};

	useEffect(() => {
		if (!!!state.oWeatherLoaded) {
			getW("boston");
		}
		// return () => {
		// 	cleanup
		// }
	}, [state]);

	return (
		<div className='row container'>
			<div className='col s12'>
				<div className='col s6'>
					<h5>
						<strong>{days[(datevalues[6] + 1) % 7]}</strong>
						,&nbsp;
						{datevalues[1]}/{datevalues[2]}/{datevalues[0]}
					</h5>
				</div>
				<div className='col s6'>
					<h5>
						<strong>{daily.summary}</strong>
					</h5>
				</div>
			</div>
			<Weather icon={daily.icon} size={"400px"} />
			<h3>HourlyData</h3>
			{state.oWeatherLoaded &&
				state.oWeather.map((hour, index) => {
					return (
						<HourlyComponent key={index * 11} hourly={hour} index={index} />
					);
					// console.log(hour);
				})}
		</div>
	);
};

export default Hourly;
