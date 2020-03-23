import React, { useEffect, useContext } from "react";
import Weather from "./Weather";
import WeatherDaily from "./WeatherDaily";
import Context from "../store/context";
import Hourly from "./Hourly";
import TodayHourly from "./TodayHourly";
import M from "materialize-css";

const WeatherContent = ({ loc }) => {
	const { state, actions } = useContext(Context);
	const { data, current } = state;
	let date = new Date(data.currently.time * 1000),
		datevalues = [
			date.getFullYear(),
			date.getMonth() + 1,
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds(),
			date.getDay()
		];
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const daily = data.daily.data;
	let dailyF = daily.map((day, index) => (
		<WeatherDaily
			key={index}
			day={datevalues[6] + 1 + index}
			daily={day}
			index={index}
			dom={datevalues[2]}
		/>
	));
	useEffect(() => {
		// console.log("UseEffect");
		// console.log(state);
		// console.log(state.location);
		// console.log("loc = " + loc);
		// forceUpdate();
	}, [loc]);

	return (
		state.loaded && (
			<div className='center-align container' style={{ width: "100%" }}>
				<div className='col s12'>
					<h3>{state.location}</h3>
					<div>
						<div className='row'>
							<div className='col s4'>
								<p>
									{datevalues[3]}:
									{datevalues[4] < 10 ? "0" + datevalues[4] : datevalues[4]}
								</p>
							</div>
							<div className='col s4'>
								<h5>
									<strong>{days[datevalues[6]]}</strong>
								</h5>
							</div>
							<div className='col s4'>
								<p>
									{datevalues[1]}/{datevalues[2]}/{datevalues[0]}
								</p>
							</div>
							<div className='col s12'>
								<Weather icon={data.currently.icon} />
								<h2>
									<strong>
										<em>{data.currently.summary}</em>
									</strong>
								</h2>
							</div>
						</div>
						<div className='row'>
							<div className='col s12 m6'>
								<h3>{data.currently.temperature}</h3>
							</div>
							<div className='col s12 m6'>
								<h3>(Feels like {data.currently.apparentTemperature}F)</h3>
							</div>
						</div>
						<div className='row'>
							<div className='col s6'>
								<h5> Wind: {data.currently.windSpeed.toFixed(1)} Mph</h5>
							</div>
							<div className='col s6'>
								<h5>Humidity: {data.currently.humidity} </h5>
							</div>
						</div>
						<div className='row'>
							<h2>{data.hourly.summary}</h2>
							{/* {console.log(data.hourly)} */}
							{data.hourly.data.map(
								(hour, index) =>
									index < 25 && (
										<TodayHourly
											hour={hour}
											index={index}
											key={index}
											style={{ margin: "2px" }}
										/>
									)
							)}
						</div>
						<div className='row' style={{ padding: "5px" }}>
							<h2>This week</h2>
							{dailyF}
						</div>
					</div>
				</div>
				<div id='hourlyDiv'>
					<Hourly daily={data.daily.data[1]} current={current} />
				</div>
			</div>
		)
	);
};

export default WeatherContent;
