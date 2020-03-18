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
		<div className='row center-align' style={{ width: "100%" }}>
			<div className='col s12'>
				<div
					className='card-panel z-depth-2 black-border'
					style={{ border: ".08rem", borderStyle: " solid" }}
				>
					{data.currently.humidity} <br />
					{data.currently.windSpeed} <br />
					<hr />
					<hr />
					<div class='row'>
						<div class='col s4'>
							<p>
								{datevalues[3]}:
								{datevalues[4] < 10 ? "0" + datevalues[4] : datevalues[4]}
							</p>
						</div>
						<div class='col s4'>
							<h3>{data.currently.summary}</h3>
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
							<h3>{data.currently.temperature} F</h3>
						</div>
						<div class='col s6'>
							<p>Feels like {data.currently.apparentTemperature} F</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherContent;
