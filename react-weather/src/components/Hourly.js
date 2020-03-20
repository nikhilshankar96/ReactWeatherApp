import React, { useContext } from "react";
import Context from "../store/context";

import WeatherDaily from "./WeatherDaily";
import Weather from "./Weather";

const Hourly = props => {
	const { state, actions } = useContext(Context);
	let { day, daily, current, index } = props;
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
	console.table(datevalues);
	return (
		<div>
			<h3>Hourly</h3>
			<h4>{current}</h4>
			{console.log(state.daily)}
			<WeatherDaily
				day={datevalues[6] + 1}
				daily={state.daily === null ? daily : state.daily}
			/>
		</div>
	);
};

export default Hourly;
