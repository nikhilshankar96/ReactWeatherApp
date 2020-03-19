import React from "react";
import Skycons from "react-skycons";

const Weather = props => {
	// const icon = props.icon.toUpperCase().replace("-", "_");
	const icon = props.icon
		.toUpperCase()
		.split("-")
		.join("_")
		.split(" ")
		.join("_");
	// if (props.size) {
	const { size } = props;
	// }
	console.log(icon);

	return (
		<div className='center-align'>
			<Skycons
				icon={icon}
				color='black'
				autoplay={true}
				style={{ maxHeight: "400px" }}
				height={size}
				width={size}
			>
				{icon}
			</Skycons>
		</div>
	);
};

export default Weather;
