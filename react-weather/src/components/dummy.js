import React from "react";
// import Context from "../store/context";

const Dummy = props => {
	// const { hide } = props;
	let status = "11";
	function geoFindMe() {
		function success(position) {
			status = "";
		}

		function error() {
			status = "Unable to retrieve your location";
			// console.log("Unable to retrieve location");
			// window.location.reload(true);
		}

		if (!navigator.geolocation) {
			status = "Geolocation is not supported by your browser";
		} else {
			status = "Locating…";
			navigator.geolocation.getCurrentPosition(success, error);
		}
	}

	return (
		// !hide && (
		<div className='container center-align'>
			{status !== "" && <h1>Locating...</h1>}
			<a
				className='red waves-effect waves-light btn-large pulse'
				onClick={geoFindMe}
			>
				<i className='material-icons right'>gps_fixed</i>Get Location
			</a>
		</div>
		// )
	);
};

export default Dummy;
