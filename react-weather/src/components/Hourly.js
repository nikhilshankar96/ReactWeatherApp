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
		const key = "d4a6d71c118517077ed0d0688b4dc2a6";
		// if (!state.oWeatherLoaded) {
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
				// return data;
			})
			.then(data => console.log(data))
			.catch(err => console.error(err));
		// const data = res.list;
		// const hourlyData = data.map((hour, index) => (
		// 	<HourlyComponent key={index} hourly={hour} />
		// ));
		// console.log(data);

		// return data;
		// }
		// return false;
	};
	// const hourlyData = getW("boston");
	// if (hourlyData) console.log(hourlyData[0].main.temp);
	// hourlyData.then(data => console.log(data));
	// if (!state.oWeatherLoaded) {
	// 	getW("boston").then(data => data.map(hour => console.log(hour)));
	// }
	getW("boston");

	return (
		<div className='row container'>
			{/* {console.log(state.daily)} */}
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
		</div>
	);
};

export default Hourly;
