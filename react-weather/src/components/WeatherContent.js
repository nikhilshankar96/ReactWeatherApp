import React, { useContext } from "react";
import Context from "../store/context";

const WeatherContent = () => {
	const { state } = useContext(Context);
	const { currently } = state;

	return (
		<div className='row center-align' style={{ width: "100%" }}>
			{console.log(currently)}
			<div className='col s12'>
				<div
					className='card-panel z-depth-2 black-border'
					style={{ border: ".08rem", borderStyle: " solid" }}
				>
					{state.location}
					{state.currently}
				</div>
			</div>
		</div>
	);
};

export default WeatherContent;
