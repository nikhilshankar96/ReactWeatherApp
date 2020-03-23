import React from "react";
import Weather from "./Weather";

const TodayHourly = props => {
	let date = new Date(props.hour.time * 1000);
	let datevalues = [
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getDay()
	];
	return (
		<div
			className='row col s3 container valign-wrapper'
			style={{ border: " solid 1px", padding: "2px", height: "100px" }}
		>
			<div
				style={{ width: "20%", display: " inline-block", border: " solid 1px" }}
			>
				<Weather icon={props.hour.icon} size={"40px"} />
			</div>
			<div
				style={{ width: "25%", display: " inline-block", border: " solid 1px" }}
			>
				<p style={{ fontSize: "20px" }}>{datevalues[3] + ":00"}</p>
			</div>
			<div
				style={{ width: "30%", display: " inline-block", border: " solid 1px" }}
			>
				<p style={{ fontSize: "20px" }}>{props.hour.summary}</p>
			</div>
			<div
				style={{ width: "25%", display: " inline-block", border: " solid 1px" }}
			>
				<p style={{ fontSize: "20px" }}>{props.hour.temperature} </p>
			</div>
		</div>
	);
};

export default TodayHourly;

/*
time: 1584982800
summary: "Overcast"
icon: "cloudy"
precipIntensity: 0.0006
precipProbability: 0.05
precipType: "rain"
temperature: 38.31
apparentTemperature: 31.5
dewPoint: 25.76
humidity: 0.6
pressure: 1034
windSpeed: 10.09
windGust: 17.24
windBearing: 128
cloudCover: 0.92
uvIndex: 3
visibility: 10
ozone: 357.1
 */
