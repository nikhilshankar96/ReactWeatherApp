import React from "react";
import Weather from "./Weather";
import WeatherDaily from "./WeatherDaily";

const WeatherContent = props => {
	const { data } = props;
	let date = new Date(data.currently.time * 1000),
		datevalues = [
			date.getFullYear(),
			date.getMonth() + 1,
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds()
		];
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const daily = data.daily.data;
	let dailyF = daily.map((day, index) => (
		<WeatherDaily day={days[index]} daily={day} />
	));

	return (
		<div className='row center-align container' style={{ width: "100%" }}>
			<div className='col s12'>
				<div
				// className='card-panel z-depth-3 black-border'
				// style={{ border: ".08rem", borderStyle: " solid" }}
				>
					<div className='row'>
						<div className='col s4'>
							<p>
								{datevalues[3]}:
								{datevalues[4] < 10 ? "0" + datevalues[4] : datevalues[4]}
							</p>
						</div>
						<div className='col s4'>
							<h2>{data.currently.summary}</h2>
						</div>
						<div className='col s4'>
							<p>
								{datevalues[1]}/{datevalues[3]}/{datevalues[0]}
							</p>
						</div>
						<div className='col s12'>
							<Weather icon={data.currently.icon} />
						</div>
					</div>
					<div className='row'>
						<div className='col s6'>
							<h2>{data.currently.temperature} F</h2>
						</div>
						<div className='col s6'>
							<h2>(Feels like {data.currently.apparentTemperature}F)</h2>
						</div>
					</div>
					<div className='row'>
						<div className='col s6'>
							<h5> Wind Speed: {data.currently.windSpeed} Mph</h5>
						</div>
						<div className='col s6'>
							<h5>Humidity: {data.currently.humidity} </h5>
						</div>
					</div>
					<div className='row' style={{ padding: "5px" }}>
						{dailyF}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherContent;
