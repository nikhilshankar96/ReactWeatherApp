import React from "react";
import Weather from "./Weather";
import WeatherDaily from "./WeatherDaily";
import Hourly from "./Hourly";

const WeatherContent = props => {
	const { data, current } = props;
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
	// const logDay = e => console.log(e.target);
	let dailyF = daily.map((day, index) => (
		<WeatherDaily
			key={index}
			day={datevalues[6] + 1 + index}
			daily={day}
			index={index}
			dom={datevalues[2]}
		/>
	));

	return (
		<div className='row center-align container' style={{ width: "100%" }}>
			<div className='col s12'>
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
						<div className='col s6'>
							<h3>{data.currently.temperature}</h3>
						</div>
						<div className='col s6'>
							<h3>(Feels like {data.currently.apparentTemperature}F)</h3>
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
			<Hourly daily={data.daily.data[1]} current={current} />
		</div>
	);
};

export default WeatherContent;
