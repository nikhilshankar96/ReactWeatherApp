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
			className='row col s12 m6  l4 container valign-wrapper card card-content'
			style={{
				border: " solid 1px",
				height: "100px"
			}}
		>
			<div style={{ width: "15%", display: " inline-block", padding: "3px" }}>
				<Weather icon={props.hour.icon} size={"45px"} />
			</div>
			<div
				style={{
					width: "15%",
					display: " block",
					padding: "3px"
				}}
			>
				<p style={{ fontSize: "18px" }}>
					{(datevalues[3] < 10 ? "0" : "") + datevalues[3] + ":00"}
				</p>
			</div>
			<div
				style={{
					width: "45%",
					display: " inline-block",
					padding: "3px"
				}}
			>
				<p style={{ fontSize: "20px" }}>{props.hour.summary}</p>
			</div>
			<div
				style={{
					width: "23%",
					display: " inline-block",
					padding: "3px"
				}}
			>
				<p style={{ fontSize: "18px" }}>
					{props.hour.temperature.toFixed(1)}°F
				</p>
			</div>
		</div>
	);
};

export default TodayHourly;
