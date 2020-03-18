import React from "react";
import Skycons from "react-skycons";

const Weather = props => {
	const icon = props.icon.toUpperCase().replace("-", "_");
	console.log(icon);

	return (
		<div className='center-align'>
			<Skycons
				icon={icon}
				color='black'
				autoplay={true}
				style={{ maxHeight: "400px" }}
			>
				{icon}
			</Skycons>
		</div>
	);
};

export default Weather;
