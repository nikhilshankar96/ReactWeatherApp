import React from "react";

const HourlyComponent = props => {
	const { main, weather, wind, dt_txt, index, dt } = props.hourly;
	const kToF = k => ((k - 273.15) * (9 / 5) + 32).toFixed(1);

	return (
		<div className='card-content'>
			<h5>
				<img
					src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
					alt={weather[0].description}
				/>{" "}
				{weather[0].main}
			</h5>
			<h5>
				{kToF(main.temp)}°F (feels like {kToF(main.feels_like)}°F)
			</h5>
			<h6>
				Hi: {kToF(main.temp_max)}°F <strong>/</strong> Lo: {kToF(main.temp_min)}
				°F
			</h6>
			<h6>
				Humidity: {main.humidity} <strong>/</strong> Wind: {wind.speed} m/s
			</h6>
			<h5>{dt_txt.substr(11, 5)}</h5>
		</div>
	);
};

export default HourlyComponent;
