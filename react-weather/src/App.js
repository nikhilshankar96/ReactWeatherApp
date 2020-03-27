import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//global state
import Context from "./store/context";
import Footer from "./components/Footer";

//materialize
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

//components
import Home from "./Home";

const App = () => {
	const { state } = useContext(Context);

	useEffect(() => {}, [state.location]);

	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					<Home location={"Nagpur"} flag={false} />
				</Route>
				<Route
					path='/:url'
					render={props => <Home {...props} flag={true} />}
				></Route>
			</Switch>
			<div className='footer z-depth-3 cyan darken-2 white-text'>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
