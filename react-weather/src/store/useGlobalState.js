import { useState } from "react";

const useGlobalState = () => {
	const [state, setState] = useState({
		location: "",
		lat: 0,
		long: 0,
		loaded: false,
		data: null,
		current: null,
		daily: null,
		oWeather: null,
		oWeatherLoaded: false
	});

	const actions = action => {
		const { type, payload } = action;

		switch (type) {
			case "setState":
				return setState(payload);

			default:
				return state;
		}
	};

	return { state, actions };
};

export default useGlobalState;
