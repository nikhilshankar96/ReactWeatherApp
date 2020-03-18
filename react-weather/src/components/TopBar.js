import React, { useContext } from "react";

import Context from "../store/context";

const TopBar = () => {
	const { state, actions } = useContext(Context);
	const { location } = state;

	return (
		<nav>
			<div className='nav-wrapper white'>
				<form>
					<div className='input-field'>
						<input
							// className='center'
							id='search'
							type='search'
							style={{ color: "black", fontSize: "24px" }}
							required
							placeholder={
								location === "Boston" ? "Weather location?" : location
							}
							onKeyUp={e =>
								actions({
									type: "setState",
									payload: { ...state, location: e.target.value }
								})
							}
						/>
						<label className='label-icon' htmlFor='search'>
							<i className='material-icons' style={{ color: "black" }}>
								search
							</i>
						</label>
						{/* <i className='material-icons'>close</i> */}
					</div>
				</form>
			</div>
		</nav>
	);
};

export default TopBar;
