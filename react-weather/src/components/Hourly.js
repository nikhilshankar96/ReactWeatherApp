import React, { useContext } from "react";
import Context from "../store/context";
// import Moment from "react-moment";

import Weather from "./Weather";
import HourlyComponent from "./HourlyComponent";

const Hourly = props => {
	const { state } = useContext(Context);
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

	return (
		state.daily && (
			<div className='row '>
				<div className='col s12'>
					<h4>
						3-Hourly forecast for{" "}
						<strong>{days[(datevalues[6] + 1) % 7]}</strong>
						&nbsp;
						{datevalues[1]}/{datevalues[2]}/{datevalues[0]}
					</h4>
					<h5>
						<strong>{daily.summary}</strong>
					</h5>
				</div>
				<Weather icon={daily.icon} size={"400px"} />
				<div className='row'>
					{state.oWeatherLoaded &&
						state.oWeather.map((hour, index) => {
							let dt = "" + hour.dt_txt[8] + hour.dt_txt[9];

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
					{!state.oWeatherLoaded && "Loading..."}
				</div>
			</div>
		)
	);
};

export default Hourly;
