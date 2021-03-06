import React, { useContext } from "react";
import Weather from "./Weather";
import Context from "../store/context";

const WeatherDaily = props => {
	const { state, actions } = useContext(Context);
	const { daily, day, dom } = props;
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return (
		<div
			onClick={() =>
				actions({
					type: "setState",
					payload: {
						...state,
						current: daily.time,
						daily: daily
					}
				})
			}
		>
			<div className='card col s6 l3 ' style={{ height: "280px" }}>
				<div className='card-content'>
					<span className='card-title'>
						<strong>
							{days[day % 7]} {dom + day}
						</strong>
					</span>
					<ul>
						<li>
							<Weather icon={daily.icon} size={"80px"} />
						</li>
						<li>
							<h6>
								<strong>{daily.summary}</strong>
							</h6>
						</li>
						<li>
							<h6>
								Hi: {daily.temperatureHigh}°F <strong>/</strong> Lo:{" "}
								{daily.temperatureLow}°F
							</h6>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default WeatherDaily;
