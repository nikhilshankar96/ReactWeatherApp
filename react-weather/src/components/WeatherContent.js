import React from "react";
import Weather from "./Weather";

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
	console.table(datevalues);

	return (
		<div
			className='row center-align container valign-wrapper '
			style={{ width: "100%" }}
		>
			<div className='col s12'>
				<div
					className='card-panel z-depth-3 black-border'
					style={{ border: ".08rem", borderStyle: " solid" }}
				>
					<div class='row'>
						<div class='col s4'>
							<p>
								{datevalues[3]}:
								{datevalues[4] < 10 ? "0" + datevalues[4] : datevalues[4]}
							</p>
						</div>
						<div class='col s4'>
							<h2>{data.currently.summary}</h2>
						</div>
						<div class='col s4'>
							<p>
								{datevalues[1]}/{datevalues[3]}/{datevalues[0]}
							</p>
						</div>
						<div class='col s12'>
							<Weather icon={data.currently.icon} />
						</div>
					</div>
					<div class='row'>
						<div class='col s6'>
							<h1>{data.currently.temperature} F</h1>
						</div>
						<div class='col s6'>
							<h3>(Feels like {data.currently.apparentTemperature}F)</h3>
						</div>
					</div>
					<div class='row'>
						<div class='col s6'>
							<h5> Wind Speed: {data.currently.windSpeed} Mph</h5>
						</div>
						<div class='col s6'>
							<h5>Humidity: {data.currently.humidity} </h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherContent;
