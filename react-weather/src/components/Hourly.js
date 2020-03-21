import React, { useContext, useEffect } from "react";
import Context from "../store/context";

import Weather from "./Weather";

const Hourly = props => {
	const { state, actions } = useContext(Context);
	let { day, current, index } = props;
	let daily = state.daily || props.daily;
	const api = "d4a6d71c118517077ed0d0688b4dc2a6";
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
	const proxy = "https://cors-anywhere.herokuapp.com/";

	const getOWeather = async () => {
		fetch(`${proxy}api.openweathermap.org/data/2.5/forecast?lat=${state.lat}&lon=${state.long}&appid=${api}
`)
			.then(res => {
				// console.log(res.body);
				console.log(res.json());

				return res.json();
			})
			.then(data => {
				actions({
					type: "setState",
					payload: {
						...state,
						oWeather: data
					}
				});
			})
			.catch(err => console.log(err));
	};
	useEffect(() => {
		//api call
		// 		fetch(`${proxy}api.openweathermap.org/data/2.5/weather?lat=${state.lat}&lon=${state.long}&appid=${api}
		// `)

		//
		console.log(state.oWeather);
	}, [daily]);

	return (
		<div className='row container'>
			{/* {console.log(state.daily)} */}
			<div className='col s12'>
				<div className='col s6'>
					<h5>
						<strong>{days[(datevalues[6] + 1) % 7]}</strong>,&nbsp;
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
		</div>
	);
};

export default Hourly;
