import React from "react";
import Weather from "./Weather";

const WeatherDaily = props => {
	const { daily, day } = props;
	return (
		<div>
			<div className='card col s6 l3' style={{ height: "280px" }}>
				<div className='card-content'>
					<span className='card-title'>
						<strong>{day}</strong>
					</span>
					<ul>
						<l1>
							<Weather icon={daily.icon} size={"80px"} />
						</l1>
						<l1>
							<h6>
								<strong>{daily.summary}</strong>
							</h6>
						</l1>
						<l1>
							<h6>
								Hi: {daily.temperatureHigh} <strong>/</strong> Lo:{" "}
								{daily.temperatureLow}
							</h6>
						</l1>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default WeatherDaily;
