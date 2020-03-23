import React, { useContext, useEffect } from "react";
import Context from "../store/context";
import Moment from "react-moment";

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
				console.log(data);
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
		<div className='row'>
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
						{/* <Moment unix>{state.current}</Moment> */}
					</h5>
				</div>
			</div>
			<Weather icon={daily.icon} size={"400px"} />
			<h3>HourlyData</h3>
			{console.log(current)}
			{state.daily && (
				<div className='row'>
					{console.log("current: " + datevalues[2])}
					{state.oWeatherLoaded &&
						state.oWeather.map((hour, index) => {
							let dt = "" + hour.dt_txt[8] + hour.dt_txt[9];

							console.log(dt);

							if (dt == datevalues[2]) {
								return (
									<div key={index * 13} className='col s6 l3 card '>
										<HourlyComponent
											key={index * 111}
											hourly={hour}
											index={index}
										/>
									</div>
								);
							}
						})}
				</div>
			)}
		</div>
	);
};

export default Hourly;
