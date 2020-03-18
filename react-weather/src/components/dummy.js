import React, { useContext } from "react";
import Context from "../store/context";

const Dummy = () => {
	const { state } = useContext(Context);
	let { location } = state;

	return (
		<div>
			<h1>{location}</h1>
		</div>
	);
};

export default Dummy;
